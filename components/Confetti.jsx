"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Confetti() {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ["#C7A451", "#D4B975", "#E6D8B4", "#FAF8F5"];
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);

    const timer = setTimeout(() => {
      setConfetti([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -10,
            opacity: 1,
            rotate: piece.rotation,
          }}
          animate={{
            y: "100vh",
            opacity: 0,
            rotate: piece.rotation + 360,
          }}
          transition={{
            duration: 1,
            delay: piece.delay,
            ease: "easeOut",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}

