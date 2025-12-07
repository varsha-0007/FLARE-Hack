import { useState } from "react";
import LedgeLookupV1 from "./LedgeLookupV1";
import LedgeLookupV2 from "./LedgeLookupV2";

export default function LedgeLookup() {
  const [version, setVersion] = useState("v2"); // Default to v2 (hardcoded)

  return (
    <div>
      {/* Version Switcher */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          gap: 12,
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: 16,
        }}
      >
        <button
          onClick={() => setVersion("v1")}
          disabled={version === "v2"}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background:
              version === "v1"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "#f0f0f0",
            color:
              version === "v1" ? "white" : version === "v2" ? "#ccc" : "#666",
            fontWeight: 600,
            cursor: version === "v2" ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            opacity: version === "v2" ? 0.5 : 1,
          }}
        >
          📡 Version 1 (API)
        </button>
        <button
          onClick={() => setVersion("v2")}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background:
              version === "v2"
                ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                : "#f0f0f0",
            color: version === "v2" ? "white" : "#666",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          ✏️ Version 2 (Hardcoded)
        </button>
      </div>

      {/* Version Info */}
      <div
        style={{
          marginBottom: 20,
          padding: 12,
          background:
            version === "v1"
              ? "rgba(102, 126, 234, 0.1)"
              : "rgba(17, 153, 142, 0.1)",
          borderRadius: 8,
          borderLeft: "4px solid " + (version === "v1" ? "#667eea" : "#11998e"),
          fontSize: "0.9rem",
          color: "#333",
        }}
      >
        {version === "v1" ? (
          <>
            <strong>Version 1 (API):</strong> Fetches real transaction data from
            blockchain and MetaMask
          </>
        ) : (
          <>
            <strong>Version 2 (Hardcoded):</strong> Manually enter wallet
            address and transaction details to calculate ledge score
          </>
        )}
      </div>

      {/* Render Selected Version */}
      {version === "v1" ? <LedgeLookupV1 /> : <LedgeLookupV2 />}
    </div>
  );
}
