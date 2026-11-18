"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Global error:", error); }, [error]);

  return (
    <html>
      <body style={{ margin: 0, background: "#0b1418", color: "#e6f2f4", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ maxWidth: "30rem", textAlign: "center", padding: "2.5rem", background: "#112226", border: "1px solid #1d3a40", borderRadius: "1.75rem" }}>
            <div style={{ margin: "0 auto 1.5rem", width: "4rem", height: "4rem", borderRadius: "1.25rem", background: "#17434a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>✦</div>
            <h1 style={{ fontSize: "1.75rem", margin: "0 0 .75rem" }}>We hit a snag</h1>
            <p style={{ color: "#9db7bc", lineHeight: 1.7, marginBottom: "2rem" }}>The hostel is still open — please refresh and try again.</p>
            <button onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85rem 1.75rem", background: "#5199a8", color: "white", border: 0, borderRadius: "999px", fontWeight: 600, cursor: "pointer" }}>
              <RefreshCw size={18} /> Refresh page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
