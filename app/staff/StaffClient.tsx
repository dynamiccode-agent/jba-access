"use client";

import { useState, useEffect, useCallback } from "react";

const STAFF_PIN = "2026";

interface Props {
  codes: string[];
}

export default function StaffClient({ codes }: Props) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const handleUnlock = useCallback(() => {
    if (pin === STAFF_PIN) {
      setUnlocked(true);
      setPinError(false);
      setLastRefresh(new Date());
    } else {
      setPinError(true);
      setPin("");
    }
  }, [pin]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!unlocked) return;
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [unlocked]);

  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const searchUpper = search.toUpperCase().trim();
  const filteredCodes = searchUpper
    ? codes.filter((c) => c.includes(searchUpper))
    : codes;

  const isValidCode = searchUpper.length > 0 && codes.includes(searchUpper);
  const isInvalidCode =
    searchUpper.length > 0 && !codes.some((c) => c === searchUpper);

  // === PIN GATE ===
  if (!unlocked) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.4rem, 5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Joe Berry Award
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "#F5F5F5",
            opacity: 0.5,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          Staff Access
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setPinError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            maxLength={6}
            style={{
              background: "#111",
              border: pinError
                ? "1px solid #CC3333"
                : "1px solid rgba(201,168,76,0.3)",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              color: "#F5F5F5",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "0.3em",
              textAlign: "center",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            autoFocus
          />

          {pinError && (
            <p
              style={{
                color: "#CC3333",
                fontSize: "0.75rem",
                margin: "-0.5rem 0 0",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              Incorrect PIN. Try again.
            </p>
          )}

          <button
            onClick={handleUnlock}
            style={{
              background: "#C9A84C",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Unlock
          </button>
        </div>
      </main>
    );
  }

  // === STAFF VIEW ===
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        padding: "1.5rem 1rem 3rem",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          paddingBottom: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#C9A84C",
            textTransform: "uppercase",
            margin: "0 0 0.2rem",
          }}
        >
          Joe Berry Award
        </h1>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#F5F5F5",
            opacity: 0.5,
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          Staff · Door Check
        </p>
      </div>

      {/* Date + count */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#F5F5F5",
              opacity: 0.85,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {today}
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: "#C9A84C",
              opacity: 0.7,
              margin: "0.15rem 0 0",
            }}
          >
            {lastRefresh
              ? `Last refresh: ${lastRefresh.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}`
              : ""}
          </p>
        </div>
        <div
          style={{
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "20px",
            padding: "0.3rem 0.75rem",
            fontSize: "0.72rem",
            color: "#C9A84C",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {codes.length} valid codes tonight
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1rem", position: "relative" }}>
        <input
          type="text"
          placeholder="Search or verify a code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "6px",
            padding: "0.75rem 1rem",
            color: "#F5F5F5",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* Verification result */}
        {searchUpper.length > 2 && (
          <div
            style={{
              marginTop: "0.5rem",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              background: isValidCode
                ? "rgba(74,200,120,0.1)"
                : isInvalidCode
                  ? "rgba(204,51,51,0.1)"
                  : "transparent",
              border: isValidCode
                ? "1px solid rgba(74,200,120,0.3)"
                : isInvalidCode
                  ? "1px solid rgba(204,51,51,0.3)"
                  : "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: isValidCode ? "#4AC878" : isInvalidCode ? "#CC3333" : "#F5F5F5",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            {isValidCode && <span>✅ VALID — {searchUpper}</span>}
            {isInvalidCode && <span>❌ INVALID — Code not found</span>}
          </div>
        )}
      </div>

      {/* Code grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {filteredCodes.map((code) => {
          const isMatch = searchUpper && code.includes(searchUpper);
          const isExact = code === searchUpper;
          return (
            <div
              key={code}
              style={{
                background: isExact
                  ? "rgba(74,200,120,0.15)"
                  : isMatch
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(255,255,255,0.04)",
                border: isExact
                  ? "1px solid rgba(74,200,120,0.4)"
                  : isMatch
                    ? "1px solid rgba(201,168,76,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                padding: "0.35rem 0.65rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.07em",
                color: isExact ? "#4AC878" : isMatch ? "#C9A84C" : "#F5F5F5",
                opacity: searchUpper && !isMatch ? 0.3 : 1,
                fontFamily: "var(--font-inter), sans-serif",
                transition: "opacity 0.15s, background 0.15s",
              }}
            >
              {code}
            </div>
          );
        })}
      </div>

      {filteredCodes.length === 0 && (
        <p
          style={{
            color: "#F5F5F5",
            opacity: 0.4,
            fontSize: "0.85rem",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          No codes match your search.
        </p>
      )}
    </main>
  );
}
