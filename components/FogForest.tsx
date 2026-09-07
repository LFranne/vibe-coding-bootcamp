"use client";

import { useRef, type PointerEvent } from "react";

export default function FogForest() {
  const forestRef = useRef<HTMLElement>(null);

  function moveFog(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    forestRef.current?.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );
    forestRef.current?.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
    forestRef.current?.style.setProperty("--clear-radius", "190px");
  }

  function resetFog() {
    forestRef.current?.style.setProperty("--clear-radius", "0px");
  }

  return (
    <section
      ref={forestRef}
      onPointerMove={moveFog}
      onPointerLeave={resetFog}
      onPointerCancel={resetFog}
      className="forest"
    >
      <div className="shade" aria-hidden="true" />

      <div className="fog-mask" aria-hidden="true">
        <div className="fog fog-back" />
        <div className="fog fog-front" />
      </div>

      <div className="content">
        <div>
          <div className="accent" />

          <h1>Leben wo andere Urlaub machen!</h1>

          <p className="subtitle">
            Im wunderschönen Bad Wildbad im Nordschwarzwald
          </p>

          <p className="hint">Bewege den Cursor durch den Nebel</p>
        </div>
      </div>

      <style jsx>{`
        .forest {
          --mouse-x: 50%;
          --mouse-y: 50%;
          --clear-radius: 0px;

          position: relative;
          isolation: isolate;
          min-height: 100svh;
          overflow: hidden;
          background-color: #182820;
          background-image: url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85");
          background-position: center;
          background-size: cover;
        }

        .shade {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.24);
          pointer-events: none;
        }

        /*
         * Die Maske bleibt genau auf der Waldfläche.
         * Nur die Nebelschichten darin bewegen sich.
         */
        .fog-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;

          -webkit-mask-image: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 0, 0, 0.25) 0px,
            rgba(0, 0, 0, 0.6) calc(var(--clear-radius) * 0.45),
            black var(--clear-radius)
          );

          mask-image: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 0, 0, 0.25) 0px,
            rgba(0, 0, 0, 0.6) calc(var(--clear-radius) * 0.45),
            black var(--clear-radius)
          );
        }

        .fog {
          position: absolute;
          inset: -25%;
          pointer-events: none;
          will-change: transform;
        }

        .fog-back {
          background:
            radial-gradient(
              ellipse at 20% 35%,
              rgba(220, 234, 230, 0.42),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 75% 55%,
              rgba(230, 240, 235, 0.35),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 45% 85%,
              rgba(210, 225, 220, 0.28),
              transparent 40%
            );
          filter: blur(35px);
          animation: drift-back 55s ease-in-out infinite alternate;
          animation-delay: -18s;
        }

        .fog-front {
          background:
            radial-gradient(
              ellipse at 15% 70%,
              rgba(235, 242, 238, 0.4),
              transparent 30%
            ),
            radial-gradient(
              ellipse at 55% 45%,
              rgba(230, 240, 235, 0.24),
              transparent 27%
            ),
            radial-gradient(
              ellipse at 85% 75%,
              rgba(235, 242, 238, 0.34),
              transparent 32%
            );
          filter: blur(24px);
          animation: drift-front 35s ease-in-out infinite alternate;
          animation-delay: -12s;
        }

        .content {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: 100svh;
          align-items: center;
          justify-content: center;
          padding: 64px 24px;
          text-align: center;
          color: white;
        }

        .accent {
          width: 56px;
          height: 4px;
          margin: 0 auto 32px;
          background: #f97316;
        }

        h1 {
          max-width: 960px;
          margin: 0 auto;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.12;
          text-wrap: balance;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          margin-top: 32px;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255, 255, 255, 0.9);
        }

        .hint {
          margin-top: 48px;
          font-size: 0.75rem;
          line-height: 1.8;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        @keyframes drift-back {
          from {
            transform: translate3d(-5%, -2%, 0) scale(1.03);
          }
          to {
            transform: translate3d(5%, 3%, 0) scale(1.08);
          }
        }

        @keyframes drift-front {
          from {
            transform: translate3d(7%, 3%, 0) scale(1.06);
          }
          to {
            transform: translate3d(-7%, -3%, 0) scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fog {
            animation: none;
            will-change: auto;
          }
        }

        @media (hover: none) {
          .hint {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}