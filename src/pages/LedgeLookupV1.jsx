import { useState, useEffect } from "react";
import axios from "axios";

const API = (path) => `http://localhost:4000${path}`;

export default function LedgeLookupV1() {
  const [address, setAddress] = useState(
    "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"
  );
  const [txHash, setTxHash] = useState(
    "0xc19c41e3a0805f1c82dfd07f2a54ca1ddff469e9e2a10194750f7dce9bfbd5ec"
  );
  const [ledge, setLedge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [connecting, setConnecting] = useState(false);

  // Connect to MetaMask on mount - Check if already connected
  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  // Check if already connected to MetaMask
  const checkMetaMaskConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          setConnectedAddress(account);
          setAddress(account);
          setWalletConnected(true);
          console.log("✓ MetaMask already connected:", account);
        }
      }
    } catch (e) {
      console.log("MetaMask check:", e.message);
    }
  };

  // Connect to MetaMask with debouncing
  const connectMetaMask = async () => {
    if (connecting) {
      console.log("Connection already in progress...");
      return;
    }

    try {
      setConnecting(true);
      setError(null);

      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          setConnectedAddress(account);
          setAddress(account);
          setWalletConnected(true);
          console.log("✓ MetaMask connected:", account);
        }
      } else {
        setError("MetaMask not installed. Please install MetaMask extension.");
      }
    } catch (e) {
      if (e.code === -32002) {
        setError(
          "MetaMask request already pending. Please check your MetaMask popup."
        );
      } else if (e.code === 4001) {
        setError("You rejected the MetaMask connection request.");
      } else {
        console.error("MetaMask connection error:", e);
        setError("Failed to connect MetaMask");
      }
    } finally {
      setConnecting(false);
    }
  };

  const fetchLedge = async () => {
    if (!address) {
      setError("Please enter a wallet address");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching ledge for:", address);
      const r = await axios.get(API(`/ledge/${encodeURIComponent(address)}`), {
        timeout: 5000,
      });
      console.log("Ledge data:", r.data);
      setLedge(r.data);
    } catch (e) {
      let errorMsg = "Failed to fetch ledge data";

      if (e.code === "ECONNABORTED") {
        errorMsg = "Request timeout - Backend not responding";
      } else if (e.code === "ERR_NETWORK") {
        errorMsg =
          "Network error - Make sure backend is running on http://localhost:4000";
      } else if (e.response?.status === 500) {
        errorMsg =
          "Server error - Contract may not be loaded. Make sure you ran: npm run deploy";
      } else if (e.response?.data?.error) {
        errorMsg = e.response.data.error;
      } else if (e.message) {
        errorMsg = e.message;
      }

      console.error("Error fetching ledge:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const simulateEvent = async () => {
    if (!address || !txHash) {
      setError("Please enter both wallet address and transaction hash");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log("Recording event for:", address);
      const r = await axios.post(
        API("/simulate-event"),
        {
          address,
          txHash,
          eventType: "transaction",
          delta: 5,
        },
        {
          timeout: 5000,
        }
      );
      console.log("Event recorded:", r.data);
      setError(null);
      // Fetch updated ledge after recording event
      await fetchLedge();
    } catch (e) {
      let errorMsg = "Failed to record event";

      if (e.code === "ECONNABORTED") {
        errorMsg = "Request timeout - Backend not responding";
      } else if (e.code === "ERR_NETWORK") {
        errorMsg = "Network error - Make sure backend is running";
      } else if (e.response?.data?.error) {
        errorMsg = e.response.data.error;
      } else {
        errorMsg = e.message || errorMsg;
      }

      console.error("Error recording event:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* MetaMask Connection Status */}
      <div
        style={{
          marginBottom: 24,
          padding: 14,
          borderRadius: 12,
          background: walletConnected
            ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
            : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          color: walletConnected ? "white" : "#666",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        {walletConnected ? (
          <>
            ✅ Wallet Connected: {connectedAddress?.slice(0, 10)}...
            {connectedAddress?.slice(-8)}
          </>
        ) : (
          <>⚠️ MetaMask Not Connected</>
        )}
      </div>

      {/* MetaMask Connect Button */}
      {!walletConnected && (
        <button
          onClick={connectMetaMask}
          style={{
            width: "100%",
            padding: "12px 24px",
            marginBottom: 24,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
        >
          🦊 Connect MetaMask
        </button>
      )}

      {/* Wallet Address Input */}
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
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          type="text"
        />
      </div>

      {/* Transaction Hash Input */}
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
          🔗 Transaction Hash
        </label>
        <input
          value={txHash || ""}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="0x..."
          type="text"
        />
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <button
          onClick={fetchLedge}
          disabled={loading}
          className="btn-primary"
          style={{ flex: 1, padding: "14px 24px", fontSize: "1rem" }}
        >
          {loading ? "⏳ Checking..." : "🔍 Lookup Ledge"}
        </button>
        <button
          onClick={simulateEvent}
          disabled={loading}
          className="btn-success"
          style={{ flex: 1, padding: "14px 24px", fontSize: "1rem" }}
        >
          {loading ? "⚙️ Processing..." : "⚡ Record Event"}
        </button>
      </div>

      {error && (
        <div
          className="error-message"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

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
            ✅ Trust Score Details
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
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
                  fontSize: "2rem",
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
                Events
              </p>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {ledge.eventsCount}
              </p>
            </div>
          </div>

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
                fontSize: "0.85rem",
                color: "#667eea",
                wordBreak: "break-all",
                fontFamily: "monospace",
                fontWeight: 500,
              }}
            >
              {ledge.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
