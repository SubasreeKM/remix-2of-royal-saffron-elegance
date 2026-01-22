import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingSaffronDustProps {
  count?: number;
}

const FloatingSaffronDust = ({ count = 30 }: FloatingSaffronDustProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.06 + 0.02,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsla(43, 74%, 49%, ${particle.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsla(43, 74%, 49%, ${particle.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            opacity: [0, particle.opacity, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSaffronDust;
