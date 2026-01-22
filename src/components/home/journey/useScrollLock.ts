import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollLockOptions {
  totalSteps: number;
  scrollSensitivity?: number;
  stepThreshold?: number;
}

export const useScrollLock = ({
  totalSteps,
  scrollSensitivity = 0.8,
  stepThreshold = 100,
}: UseScrollLockOptions) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const accumulatedScroll = useRef(0);
  const lastScrollTime = useRef(0);
  const isTransitioning = useRef(false);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isLocked || isTransitioning.current) return;

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      lastScrollTime.current = now;

      // Reset accumulator if there's a pause in scrolling
      if (timeDelta > 200) {
        accumulatedScroll.current = 0;
      }

      // Accumulate scroll with sensitivity adjustment
      accumulatedScroll.current += e.deltaY * scrollSensitivity;

      // Check if we've scrolled enough to trigger a step change
      if (Math.abs(accumulatedScroll.current) >= stepThreshold) {
        isTransitioning.current = true;
        const direction = accumulatedScroll.current > 0 ? 1 : -1;
        accumulatedScroll.current = 0;

        setCurrentStep((prev) => {
          const next = prev + direction;

          // If scrolling past the last step, unlock and complete
          if (next >= totalSteps) {
            setIsLocked(false);
            setIsComplete(true);
            return prev;
          }

          // If scrolling before first step, unlock backwards
          if (next < 0) {
            setIsLocked(false);
            return 0;
          }

          return next;
        });

        // Prevent rapid step changes
        setTimeout(() => {
          isTransitioning.current = false;
        }, 800);
      }
    },
    [isLocked, totalSteps, scrollSensitivity, stepThreshold]
  );

  // Touch handling for mobile
  const touchStartY = useRef(0);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isLocked) return;
    touchStartY.current = e.touches[0].clientY;
  }, [isLocked]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isLocked || isTransitioning.current) return;

      e.preventDefault();
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;

      accumulatedScroll.current += deltaY * scrollSensitivity * 2;

      if (Math.abs(accumulatedScroll.current) >= stepThreshold) {
        isTransitioning.current = true;
        const direction = accumulatedScroll.current > 0 ? 1 : -1;
        accumulatedScroll.current = 0;

        setCurrentStep((prev) => {
          const next = prev + direction;

          if (next >= totalSteps) {
            setIsLocked(false);
            setIsComplete(true);
            return prev;
          }

          if (next < 0) {
            setIsLocked(false);
            return 0;
          }

          return next;
        });

        setTimeout(() => {
          isTransitioning.current = false;
        }, 800);
      }
    },
    [isLocked, totalSteps, scrollSensitivity, stepThreshold]
  );

  // Intersection Observer to lock scroll when section enters view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (!isComplete) {
              setIsLocked(true);
              setCurrentStep(0);
            }
          }
        });
      },
      {
        threshold: [0.5],
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isComplete]);

  // Add/remove wheel event listener
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (isLocked) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = "";
    };
  }, [isLocked, handleWheel, handleTouchStart, handleTouchMove]);

  // Reset when scrolling back to section
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || isLocked) return;

      const rect = section.getBoundingClientRect();
      const isAboveSection = rect.top > window.innerHeight;

      if (isAboveSection && isComplete) {
        setIsComplete(false);
        setCurrentStep(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked, isComplete]);

  return {
    sectionRef,
    currentStep,
    isLocked,
    isComplete,
  };
};
