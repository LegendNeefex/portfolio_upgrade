"use client"

import Link from "next/link";

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body style={{ background: "#1a1a1a", margin: 0 }}>
                <div style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "24px",
                    fontFamily: "sans-serif"
                }}>
                    <h1 style={{ color: "#1ABC9C", fontSize: "32px", margin: 0 }}>
                        Neefex .
                    </h1>
                    <p style={{ color: "white", fontSize: "18px", textAlign: "center" }}>
                        Something went wrong. Please check your connection.
                    </p>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button
                            onClick={reset}
                            style={{
                                padding: "12px 32px",
                                background: "#1ABC9C",
                                border: "none",
                                borderRadius: "999px",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}