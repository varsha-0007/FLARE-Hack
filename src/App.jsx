import React from "react";
import LedgeLookup from "./pages/LedgeLookup";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-50px",
          right: "-50px",
          animation: "pulse 5s ease-in-out infinite 1s",
        }}
      />

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.05)",
          padding: "48px 40px",
          maxWidth: "520px",
          width: "100%",
          position: "relative",
          zIndex: 10,
          border: "1px solid rgba(255, 255, 255, 0.8)",
          animation: "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>⛓️</div>
          <h1
            style={{
              fontSize: "2.2rem",
              marginBottom: "8px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800,
            }}
          >
            Flare Karma
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Trust Ledge Manager on Flare
          </p>
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            marginBottom: "36px",
          }}
        />

        <LedgeLookup />
      </div>
    </div>
  );
}
