import { useState } from "react";

export default function LedgeLookupV2() {
  const [address, setAddress] = useState();
  const [txHash, setTxHash] = useState();
  const [transactionValue, setTransactionValue] = useState(); // ETH
  const [gasPrice, setGasPrice] = useState(); // Gwei
  const [ledge, setLedge] = useState(null);
  const [error, setError] = useState(null);

  // Hardcoded ledge score calculator
  const calculateLedgeScore = () => {
    if (!address || !txHash || !transactionValue || !gasPrice) {
      setError("Please fill all fields");
      return;
    }

    setError(null);

    // Validate address format
    if (!address.startsWith("0x") || address.length !== 42) {
      setError(
        "Invalid wallet address format. Should be 0x followed by 40 hex characters"
      );
      return;
    }

    // Validate tx hash format
    if (!txHash.startsWith("0x") || txHash.length !== 66) {
      setError(
        "Invalid transaction hash format. Should be 0x followed by 64 hex characters"
      );
      return;
    }

    // Parse values
    const txValueNum = parseFloat(transactionValue);
    const gasPriceNum = parseFloat(gasPrice);

    if (
      isNaN(txValueNum) ||
      isNaN(gasPriceNum) ||
      txValueNum < 0 ||
      gasPriceNum < 0
    ) {
      setError(
        "Transaction value and gas price must be valid positive numbers"
      );
      return;
    }

    // Hardcoded Ledge Score Calculation
    let ledgeScore = 10; // Base score

    // Points for transaction value (1 point per 0.1 ETH, max 30 points)
    const valuePoints = Math.min(txValueNum * 10, 30);
    ledgeScore += valuePoints;

    // Points for gas price (high gas = more commitment = more trust)
    // 20 Gwei = 5 points, 100+ Gwei = 15 points
    let gasPoints = 0;
    if (gasPriceNum >= 100) gasPoints = 15;
    else if (gasPriceNum >= 50) gasPoints = 10;
    else if (gasPriceNum >= 20) gasPoints = 5;
    else if (gasPriceNum > 0) gasPoints = 2;

    ledgeScore += gasPoints;

    // Bonus points for specific patterns
    let bonusPoints = 0;

    // Large transaction bonus
    if (txValueNum >= 1) bonusPoints += 10;
    else if (txValueNum >= 0.5) bonusPoints += 5;

    // High gas commitment bonus
    if (gasPriceNum >= 50) bonusPoints += 8;

    ledgeScore += bonusPoints;

    // Final ledge object
    const calculatedLedge = {
      address: address,
      score: Math.round(ledgeScore).toString(),
      eventsCount: "1",
      txHash: txHash,
      txValue: txValueNum.toFixed(6),
      gasPrice: gasPriceNum.toFixed(2),
      breakdown: {
        baseScore: 10,
        valuePoints: valuePoints.toFixed(1),
        gasPoints: gasPoints,
        bonusPoints: bonusPoints,
        totalScore: Math.round(ledgeScore),
      },
    };

    setLedge(calculatedLedge);
    console.log("Calculated Ledge:", calculatedLedge);
  };

  const resetForm = () => {
    setAddress("0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8");
    setTxHash(
      "0xabc123def456abc789def456abc789def456abc789def456abc789def456abc7"
    );
    setTransactionValue("0.5");
    setGasPrice("25");
    setLedge(null);
    setError(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            display: "block",
            marginBottom: 10,
            fontWeight: 600,
            color: "#333",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          📍 Wallet Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          type="text"
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            display: "block",
            marginBottom: 10,
            fontWeight: 600,
            color: "#333",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          🔗 Transaction Hash
        </label>
        <input
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="0x..."
          type="text"
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            display: "block",
            marginBottom: 10,
            fontWeight: 600,
            color: "#333",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          💰 Transaction Value (ETH)
        </label>
        <input
          value={transactionValue}
          onChange={(e) => setTransactionValue(e.target.value)}
          placeholder="0.5"
          type="number"
          step="0.1"
          min="0"
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <label
          style={{
            display: "block",
            marginBottom: 10,
            fontWeight: 600,
            color: "#333",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          ⛽ Gas Price (Gwei)
        </label>
        <input
          value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)}
          placeholder="25"
          type="number"
          step="1"
          min="0"
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <button
          onClick={calculateLedgeScore}
          className="btn-primary"
          style={{ flex: 1, padding: "14px 24px", fontSize: "1rem" }}
        >
          🧮 Calculate Score
        </button>
        <button
          onClick={resetForm}
          style={{
            flex: 1,
            padding: "14px 24px",
            fontSize: "1rem",
            background: "#f0f0f0",
            color: "#666",
            border: "none",
            borderRadius: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="error-message"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Ledge Score Display */}
      {ledge && (
        <div
          style={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            animation: "slideUp 0.4s ease-out",
            boxShadow: "0 8px 24px rgba(195, 207, 226, 0.3)",
          }}
        >
          <h3
            style={{
              marginBottom: 20,
              fontSize: "1.2rem",
              color: "#667eea",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ✅ Ledge Score Calculated
          </h3>

          {/* Main Score Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "20px",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.9,
                  marginBottom: 8,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Trust Score
              </p>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {ledge.score}
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                padding: "20px",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.9,
                  marginBottom: 8,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Transaction Value
              </p>
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {ledge.txValue} ETH
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              marginBottom: 16,
            }}
          >
            <h4
              style={{
                marginBottom: 16,
                color: "#667eea",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              📊 Score Breakdown
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div
                style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 12 }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Base Score
                </p>
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#667eea",
                  }}
                >
                  {ledge.breakdown.baseScore} pts
                </p>
              </div>

              <div
                style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 12 }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Transaction Value Points
                </p>
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#11998e",
                  }}
                >
                  {ledge.breakdown.valuePoints} pts
                </p>
              </div>

              <div
                style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 12 }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Gas Price Points
                </p>
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#764ba2",
                  }}
                >
                  {ledge.breakdown.gasPoints} pts
                </p>
              </div>

              <div
                style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 12 }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Bonus Points
                </p>
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#f093fb",
                  }}
                >
                  {ledge.breakdown.bonusPoints} pts
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: "2px solid #667eea",
                paddingTop: 16,
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#333" }}>
                Total Score
              </p>
              <p
                style={{ fontSize: "2rem", fontWeight: 800, color: "#667eea" }}
              >
                {ledge.breakdown.totalScore}
              </p>
            </div>
          </div>

          {/* Wallet & TX Info */}
          <div
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "#999",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Wallet Address
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#667eea",
                wordBreak: "break-all",
                fontFamily: "monospace",
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              {ledge.address}
            </p>

            <p
              style={{
                fontSize: "0.75rem",
                color: "#999",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Transaction Hash
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#667eea",
                wordBreak: "break-all",
                fontFamily: "monospace",
                fontWeight: 500,
              }}
            >
              {ledge.txHash}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
