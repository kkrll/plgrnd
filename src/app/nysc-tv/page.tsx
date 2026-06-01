"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Assets (Figma node 60198:25264) ───────────────────────────────────────
const IMG_DARK_BG   = "https://www.figma.com/api/mcp/asset/37ec5a55-13a9-4a9b-8370-d385bf09b2dd";
const IMG_QR        = "https://www.figma.com/api/mcp/asset/cee8b3b9-532a-4ccb-9579-78c6e70a35d8";
const IMG_PIN       = "https://www.figma.com/api/mcp/asset/9197ed54-3535-41fb-8a94-f752a9b34780";
const IMG_ZING      = "https://www.figma.com/api/mcp/asset/ef9a06da-987f-4a75-977a-f911b4339844";
const IMG_CARD_PINK = "https://www.figma.com/api/mcp/asset/e433fd67-15c4-45e2-a5f7-da010e680edd";
const IMG_CARD_DARK = "https://www.figma.com/api/mcp/asset/449f2f1c-efe0-4394-873f-a7aa9ae9e838";
const IMG_NV        = "https://www.figma.com/api/mcp/asset/fb6731a4-edfc-49fb-b899-f9359102d121";
const IMG_NV1       = "https://www.figma.com/api/mcp/asset/01b1dc23-97c4-4bbe-881d-a5b3729eb8fb";
const IMG_NV2       = "https://www.figma.com/api/mcp/asset/0bba27ea-1076-4199-bd5c-8328411bcc21";
const IMG_NV3       = "https://www.figma.com/api/mcp/asset/3bf3b5a1-df18-473e-95b5-bd9ac1e032db";
const IMG_NV4       = "https://www.figma.com/api/mcp/asset/e6bb13a0-8113-4390-a0fb-fa2fc964ff76";
const IMG_NWORD     = "https://www.figma.com/api/mcp/asset/27bb90d4-a1e1-4d0a-b77a-1b897426b193";

// ─── Constants ──────────────────────────────────────────────────────────────
const ACCENT      = "#D4FF00";
const INTERVAL    = 10_000;
const COLS        = 3;
const TAB_LABELS  = ["Challenge", "Live", "Prizes"];

// ─── Shared style helpers ────────────────────────────────────────────────────
const HEADING: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  fontWeight: 900,
  fontStyle: "italic",
  textTransform: "uppercase",
  lineHeight: 0.88,
  letterSpacing: "-0.01em",
};

const colWrapper = (active: boolean): React.CSSProperties => ({
  flexGrow: active ? 3 : 1,
  flexShrink: 1,
  flexBasis: 0,
  minWidth: 0,
  overflow: "hidden",
  transition: "flex-grow 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
  containerType: "inline-size",
});

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChallengeCol({ active }: { active: boolean }) {
  return (
    <div style={{ ...colWrapper(active), display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Challenge header card */}
      <div style={{
        position: "relative",
        height: 288,
        borderRadius: 40,
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 32px",
      }}>
        <img src={IMG_DARK_BG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/nysc-tv/logo.svg" alt="NYSC TV" style={{ height: 72, width: 120, objectFit: "contain" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ ...HEADING, color: "white", fontSize: "min(16cqi, 82px)" }}>Myco</span>
          <span style={{ ...HEADING, color: "white", fontSize: "min(11cqi, 56px)" }}>Challenge</span>
        </div>
      </div>

      {/* Location card */}
      <div style={{
        flex: 1,
        background: "white",
        borderRadius: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        overflow: "hidden",
        padding: "0 28px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
          <span style={{ ...HEADING, color: "black", fontSize: "min(14cqi, 100px)", whiteSpace: "nowrap" }}>
            The Fittest in
          </span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.1)",
            borderRadius: 32,
            padding: "6px 18px 6px 14px",
            marginTop: 4,
          }}>
            <img src={IMG_PIN} alt="" style={{ height: "0.8em", width: "auto", flexShrink: 0 }} />
            <span style={{ ...HEADING, color: "black", fontSize: "min(15.5cqi, 112px)", whiteSpace: "nowrap" }}>
              Glendale
            </span>
          </div>
        </div>
        <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "min(4cqi, 28px)", fontWeight: 300 }}>
          Ends in 2 days
        </p>
      </div>
    </div>
  );
}

function LiveCol({ active }: { active: boolean }) {
  return (
    <div style={{
      ...colWrapper(active),
      borderRadius: 40,
      background: "#111",
      position: "relative",
    }}>
      <video
        src="/nysc-tv/Fiona_Squats_780x872.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function PrizesCol({ active }: { active: boolean }) {
  return (
    <div style={{ ...colWrapper(active), display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Prizes card */}
      <div style={{
        flex: 1,
        borderRadius: 40,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 28,
        background: "linear-gradient(135deg, #dee2eb 15%, #dde7ff 88%)",
      }}>
        <p style={{
          position: "relative",
          zIndex: 1,
          ...HEADING,
          textAlign: "center",
          fontSize: "min(24cqi, 64px)",
          background: "linear-gradient(134deg, #7985a7 11%, #0e309a 89%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Compete<br />for the<br />rewards
        </p>
        <img src="/nysc-tv/rewards.png" alt="Prizes" style={{ width: "100%", minWidth: 270, maxWidth: 420, objectFit: "contain", position: "absolute", bottom: 0, right: 0 }} />
      </div>

      {/* Scan to join card */}
      <div style={{
        position: "relative",
        height: 200,
        borderRadius: 40,
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
      }}>
        <img src={IMG_DARK_BG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <p style={{ ...HEADING, position: "relative", zIndex: 1, color: "white", fontSize: "min(12cqi, 64px)", flexShrink: 0 }}>
          Scan<br />to Join
        </p>
        <div style={{ position: "relative", zIndex: 1, background: "white", borderRadius: 18, padding: 8, flexShrink: 0 }}>
          <img src="/nysc-tv/qr.png" alt="QR code" style={{ display: "block", width: "min(13cqi, 156px)", height: "auto", borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NyscTvPage() {
  const [active, setActive] = useState(0);
  const rotateRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = useCallback(() => {
    if (rotateRef.current) clearInterval(rotateRef.current);
    rotateRef.current = setInterval(() => setActive(p => (p + 1) % COLS), INTERVAL);
  }, []);

  useEffect(() => {
    startRotation();
    return () => { if (rotateRef.current) clearInterval(rotateRef.current); };
  }, [startRotation]);

  const switchTo = (i: number) => {
    setActive(i);
    startRotation();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,900&display=swap');
        @keyframes dot-pulse { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes tab-sweep { from{transform:scaleX(0)} to{transform:scaleX(1)} }
      `}</style>

      <div style={{
        width: "100dvw",
        height: "100dvh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        userSelect: "none",
      }}>
        {/* ── Main grid ── */}
        <div style={{ flex: 1, display: "flex", gap: 16, padding: 16, minHeight: 0 }}>
          <ChallengeCol active={active === 0} />
          <LiveCol      active={active === 1} />
          <PrizesCol    active={active === 2} />
        </div>

        {/* ── Tab switcher ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "8px 24px 14px" }}>
          {TAB_LABELS.map((label, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => switchTo(i)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 99,
                  padding: "9px 26px",
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? ACCENT : "rgba(255,255,255,0.1)",
                  color: isActive ? "#000" : "rgba(255,255,255,0.4)",
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontSize: 15,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "background 0.4s ease, color 0.4s ease",
                  minWidth: 120,
                }}
              >
                {label}
                {isActive && (
                  <span
                    key={active}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.14)",
                      transformOrigin: "left center",
                      animation: `tab-sweep ${INTERVAL}ms linear forwards`,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
