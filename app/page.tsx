export default function Home() {
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
          fontSize: "clamp(1.8rem, 6vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#C9A84C",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
          lineHeight: 1.2,
        }}
      >
        Joe Berry Award
      </h1>
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.85rem, 3vw, 1rem)",
          color: "#F5F5F5",
          opacity: 0.7,
          letterSpacing: "0.05em",
          maxWidth: "320px",
          lineHeight: 1.6,
        }}
      >
        Please scan your invitation QR code to access this event.
      </p>
    </main>
  );
}
