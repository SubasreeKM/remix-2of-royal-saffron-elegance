-- Create reviews table for storing customer reviews
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  product_id UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  location TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view approved reviews (public testimonials)
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews
FOR SELECT
USING (is_approved = true);

-- Allow anyone to submit a review (guests and logged-in users)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
ON public.reviews
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;