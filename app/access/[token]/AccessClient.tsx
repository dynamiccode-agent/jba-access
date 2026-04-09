"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  word: string;
  digits: string;
}

type Phase = "scanning" | "flash" | "granted" | "details";

// Deterministic particles seeded by word
function generateParticles(word: string) {
  const seed = word.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const particles = [];
  for (let i = 0; i < 24; i++) {
    const pseudo = ((seed * (i + 1) * 1234567) % 10000) / 10000;
    const pseudo2 = ((seed * (i + 7) * 7654321) % 10000) / 10000;
    const pseudo3 = ((seed * (i + 13) * 9876543) % 10000) / 10000;
    const pseudo4 = ((seed * (i + 3) * 3456789) % 10000) / 10000;
    particles.push({
      id: i,
      left: pseudo * 100,
      top: 20 + pseudo2 * 60,
      size: 1.5 + pseudo3 * 2,
      duration: 3 + pseudo4 * 4,
      delay: pseudo * 3,
    });
  }
  return particles;
}

export default function AccessClient({ word, digits }: Props) {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [showDetails, setShowDetails] = useState(false);
  const particles = generateParticles(word);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Phase 1: scanning for 2 seconds
    const t1 = setTimeout(() => {
      setPhase("flash");
    }, 2000);

    // Flash lasts 120ms
    const t2 = setTimeout(() => {
      setPhase("granted");
    }, 2120);

    // Details fade in after code reveal
    const t3 = setTimeout(() => {
      setShowDetails(true);
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "#C9A84C",
            opacity: phase === "scanning" ? 0.4 : 0.15,
            animation: `particleFloat ${p.duration}s ${p.delay}s linear infinite`,
            transition: "opacity 1s ease",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Flash overlay */}
      {phase === "flash" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "white",
            zIndex: 100,
            animation: "flashWhite 0.25s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* === SCANNING PHASE === */}
      {phase === "scanning" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
            maxWidth: "360px",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: "0.5rem" }}>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#C9A84C",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Joe Berry Award
            </h1>
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                marginTop: "0.75rem",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Scan box */}
          <div
            style={{
              position: "relative",
              width: "220px",
              height: "220px",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            {/* Corner brackets */}
            {[
              { top: -1, left: -1, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" },
              { top: -1, right: -1, borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" },
              { bottom: -1, left: -1, borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" },
              { bottom: -1, right: -1, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  ...style,
                }}
              />
            ))}

            {/* Scanning line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                boxShadow: "0 0 8px rgba(201,168,76,0.8)",
                animation: "scanLine 1.5s linear infinite",
              }}
            />

            {/* Center icon */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.3}>
                <rect x="4" y="4" width="16" height="16" rx="1" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <rect x="28" y="4" width="16" height="16" rx="1" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <rect x="4" y="28" width="16" height="16" rx="1" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <rect x="10" y="10" width="4" height="4" fill="#C9A84C" />
                <rect x="34" y="10" width="4" height="4" fill="#C9A84C" />
                <rect x="10" y="34" width="4" height="4" fill="#C9A84C" />
                <rect x="28" y="28" width="4" height="4" fill="#C9A84C" />
                <rect x="34" y="34" width="4" height="4" fill="#C9A84C" />
                <rect x="34" y="28" width="4" height="4" fill="#C9A84C" />
                <rect x="28" y="34" width="4" height="4" fill="#C9A84C" />
              </svg>
            </div>
          </div>

          {/* Verifying text */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "#C9A84C",
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.85,
            }}
          >
            Verifying Access...
          </p>
        </div>
      )}

      {/* === ACCESS GRANTED PHASE === */}
      {(phase === "granted" || phase === "details") && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            gap: "0",
          }}
        >
          {/* ACCESS GRANTED header */}
          <div
            style={{
              marginBottom: "1.5rem",
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            {/* Checkmark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(74,200,120,0.5))",
                }}
              >
                <circle cx="26" cy="26" r="24" stroke="#4AC878" strokeWidth="1.5" />
                <path
                  d="M15 26L22 33L37 18"
                  stroke="#4AC878"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 0,
                    animation: "checkDraw 0.6s ease-out 0.2s both",
                  }}
                />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(1.4rem, 5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#C9A84C",
                textTransform: "uppercase",
                margin: 0,
                animation: "glowPulse 2.5s ease-in-out 0.3s infinite",
              }}
            >
              Access Granted
            </h2>
          </div>

          {/* Access code — the hero element */}
          <div
            style={{
              marginBottom: "1.25rem",
              animation: "codeReveal 0.5s ease-out 0.15s both",
              width: "100%",
            }}
          >
            <div
              style={{
                padding: "1.5rem 1rem",
                border: "1px solid rgba(201,168,76,0.3)",
                background: "rgba(201,168,76,0.04)",
                position: "relative",
              }}
            >
              {/* Corner accents */}
              {[
                { top: -1, left: -1, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" },
                { top: -1, right: -1, borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" },
                { bottom: -1, left: -1, borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" },
                { bottom: -1, right: -1, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "14px", height: "14px", ...s }} />
              ))}

              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2.2rem, 9vw, 3.8rem)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#C9A84C",
                  lineHeight: 1,
                  textShadow: "0 0 30px rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.2em",
                  flexWrap: "wrap",
                }}
              >
                <span>{word}</span>
                <span style={{ opacity: 0.6, fontWeight: 400 }}>—</span>
                <span>{digits}</span>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#F5F5F5",
                opacity: 0.5,
                textTransform: "uppercase",
                marginTop: "0.75rem",
                margin: "0.75rem 0 0",
              }}
            >
              Present this code at the door
            </p>
          </div>

          {/* Separator + Event details */}
          <div
            style={{
              width: "100%",
              marginTop: "1.5rem",
              opacity: showDetails ? 1 : 0,
              transform: showDetails ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
                marginBottom: "1.5rem",
              }}
            />

            {/* Event info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Joe Berry Award
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.72rem, 2.5vw, 0.82rem)",
                  color: "#F5F5F5",
                  opacity: 0.6,
                  letterSpacing: "0.04em",
                  margin: 0,
                }}
              >
                Young Executive Award · Future Industry Leaders
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.78rem, 2.8vw, 0.9rem)",
                  color: "#F5F5F5",
                  opacity: 0.8,
                  letterSpacing: "0.06em",
                  margin: "0.25rem 0 0",
                }}
              >
                Wednesday 11 June 2026
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.72rem, 2.5vw, 0.82rem)",
                  color: "#F5F5F5",
                  opacity: 0.6,
                  letterSpacing: "0.04em",
                  margin: 0,
                }}
              >
                Noble Dining Room · Sydney Cricket Ground
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.68rem, 2.3vw, 0.78rem)",
                  color: "#C9A84C",
                  opacity: 0.7,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0.25rem 0 0",
                }}
              >
                Black Tie
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
