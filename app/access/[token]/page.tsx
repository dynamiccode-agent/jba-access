import tokens from "@/app/data/tokens.json";
import AccessClient from "./AccessClient";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function AccessPage({ params }: PageProps) {
  const { token } = await params;
  const tokenKey = token.toUpperCase();
  const tokenData = (tokens as Record<string, { code: string; label: string }>)[tokenKey];

  if (!tokenData) {
    return <AccessDenied />;
  }

  // Split code into word and digits
  const [word, digits] = tokenData.code.split("-");

  return <AccessClient word={word} digits={digits} />;
}

function AccessDenied() {
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
      <div
        style={{
          marginBottom: "1.5rem",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "2px solid #CC3333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M6 6L22 22M22 6L6 22"
            stroke="#CC3333"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(2rem, 8vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#CC3333",
          textTransform: "uppercase",
          marginBottom: "1rem",
          lineHeight: 1.1,
        }}
      >
        Access Denied
      </h1>
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.85rem, 3vw, 1rem)",
          color: "#F5F5F5",
          opacity: 0.6,
          maxWidth: "300px",
          lineHeight: 1.7,
          letterSpacing: "0.02em",
        }}
      >
        This invitation could not be verified. Please see the event coordinator.
      </p>
    </main>
  );
}
