"use client";

import { useEffect, useState } from "react";

type ConfettiPiece = {
  id: number;
  left: number;
  color: string;
  delay: number;
  rotation: number;
};

const colors = ["#E8503E", "#F6C445", "#2A9D8F", "#1A1A2E", "#F97066"];

function createConfetti() {
  return Array.from({ length: 28 }, (_, index): ConfettiPiece => ({
    id: Date.now() + index,
    left: Math.random() * 100,
    color: colors[index % colors.length],
    delay: Math.random() * 0.35,
    rotation: Math.random() * 360,
  }));
}

export default function ConfettiCelebration() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const celebrate = () => setPieces(createConfetti());
    const interval = window.setInterval(celebrate, 5000);

    celebrate();
    window.addEventListener("click", celebrate);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("click", celebrate);
    };
  }, []);

  return (
    <div className="celebration" aria-live="polite" aria-label="Konfetti-Feuerwerk">
      {pieces.map((piece) => (
        <span
          className="confetti-piece"
          key={piece.id}
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
