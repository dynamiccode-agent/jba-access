"use client";
import { useEffect, useState } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"] });

export default function EnterPage() {
  const [phase, setPhase] = useState<"scanning" | "flash" | "granted" | "details">("scanning");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flash"), 2200);
    const t2 = setTimeout(() => setPhase("granted"), 2400);
    const t3 = setTimeout(() => setPhase("details"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: phase === "flash" ? "#ffffff" : "#0D0812",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", textAlign: "center",
      transition: "background 0.1s", position: "relative", overflow: "hidden"
    }}>
      <Particles />

      {phase === "scanning" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <p className={cormorant.className} style={{
            color: "#C9A84C", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", opacity: 0.8
          }}>Joe Berry Award</p>
          <p className={inter.className} style={{
            color: "#C9A84C", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginTop: "-1.5rem"
          }}>40th Anniversary</p>
          <div style={{ position: "relative", width: "160px", height: "200px", border: "1px solid #C9A84C33", borderRadius: "4px" }}>
            <ScanLine />
            <div style={{ position: "absolute", top: -1, left: -1, width: "20px", height: "20px", borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }} />
            <div style={{ position: "absolute", top: -1, right: -1, width: "20px", height: "20px", borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }} />
            <div style={{ position: "absolute", bottom: -1, left: -1, width: "20px", height: "20px", borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }} />
            <div style={{ position: "absolute", bottom: -1, right: -1, width: "20px", height: "20px", borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }} />
          </div>
          <p className={inter.className} style={{
            color: "#C9A84C", fontSize: "0.65rem", letterSpacing: "0.35em",
            textTransform: "uppercase", animation: "pulse 1.5s ease-in-out infinite"
          }}>Verifying Access...</p>
        </div>
      )}

      {(phase === "granted" || phase === "details") && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", animation: "fadeIn 0.6s ease-out" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            border: "2px solid #C9A84C", display: "flex", alignItems: "center",
            justifyContent: "center", animation: "glow 2s ease-in-out infinite"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className={inter.className} style={{
            color: "#C9A84C", fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase"
          }}>Access Granted</p>

          <div style={{ margin: "0.5rem 0" }}>
            <p className={inter.className} style={{
              color: "#555", fontSize: "0.6rem", letterSpacing: "0.3em",
              textTransform: "uppercase", marginBottom: "0.75rem"
            }}>Tonight&apos;s Password</p>
            <p className={cormorant.className} style={{
              color: "#C9A84C", fontSize: "clamp(4rem, 18vw, 7rem)", fontWeight: 700,
              letterSpacing: "0.15em", lineHeight: 1,
              textShadow: "0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)"
            }}>
              QUIGG
            </p>
          </div>

          <p className={inter.className} style={{
            color: "#666", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase"
          }}>Present this word at the door</p>

          {phase === "details" && (
            <div style={{
              marginTop: "1.5rem", paddingTop: "1.5rem",
              borderTop: "1px solid #1E0F2E", width: "100%", maxWidth: "300px",
              animation: "fadeIn 0.8s ease-out", display: "flex",
              flexDirection: "column", gap: "0.4rem"
            }}>
              <p className={cormorant.className} style={{ color: "#F5F5F5", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                JOE BERRY AWARD
              </p>
              <p className={inter.className} style={{ color: "#888", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Young Executive Award · Future Industry Leaders · 40th Anniversary
              </p>
              <p className={inter.className} style={{ color: "#666", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.5rem" }}>
                Wednesday 11 June 2026
              </p>
              <p className={inter.className} style={{ color: "#666", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Noble Dining Room · Sydney Cricket Ground
              </p>
              <p className={inter.className} style={{ color: "#C9A84C", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>
                Black Tie
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 10px rgba(201,168,76,0.2)} 50%{box-shadow:0 0 30px rgba(201,168,76,0.5)} }
        @keyframes scanMove { 0%{top:0} 100%{top:calc(100% - 2px)} }
      `}</style>
    </main>
  );
}

function ScanLine() {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, height: "2px",
      background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
      animation: "scanMove 1.5s ease-in-out infinite alternate",
      boxShadow: "0 0 8px #C9A84C"
    }} />
  );
}

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: (i * 17 + 5) % 100, y: (i * 23 + 10) % 100,
    size: (i % 3) + 1, opacity: 0.05 + (i % 5) * 0.04,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: "50%", background: "#9B6FD4", opacity: p.opacity
        }} />
      ))}
    </div>
  );
}
