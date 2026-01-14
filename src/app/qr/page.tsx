"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";
import QRCodeStyling from "qr-code-styling";
import CardBg from "./cardBg";

const baseUrl = "https://dev-male.zing-gym.coach/nysc";
const defaultParams = {
  ref: "campaign_victory",
  theme: "dark",
};

const logoSvg = `<svg width="50" height="33" viewBox="0 0 50 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2862 8.31913L0.197082 30.7374C-0.556516 32.0281 1.00909 33.4193 2.22668 32.5409L17.729 21.3569C18.1748 21.0353 18.7703 21.0038 19.2482 21.2766L28.4256 26.5161C31.0935 28.0393 34.505 27.1354 36.0453 24.4972L49.1345 2.07893C49.8881 0.788217 48.3225 -0.602958 47.1049 0.27546L31.6025 11.4595C31.1568 11.781 30.5612 11.8125 30.0834 11.5397L20.906 6.30019C18.238 4.77703 14.8265 5.68094 13.2862 8.31913Z" fill="white"/>
</svg>`;
const logoDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`;

export default function QRPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [ready, setReady] = useState(false);

  // Initialize QR code once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: "",
      dotsOptions: {
        color: "white",
        type: "rounded",
      },
      backgroundOptions: {
        color: "red",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "white",
      },
      cornersDotOptions: {
        type: "dot",
        color: "white",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
    });

    qrCodeRef.current = qrCode;
    qrCode.append(containerRef.current);
    setReady(true);
    // Generate an initial QR in English so something is visible immediately
    updateQR("en");

    return () => {
      qrCodeRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  const updateQR = (lang: "en" | "fr") => {
    if (!qrCodeRef.current) return;

    const params = new URLSearchParams({
      ...defaultParams,
      lang,
      timestamp: Date.now().toString(),
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    // Use the custom swoosh SVG via a data URL as the QR "image" for the logo
    qrCodeRef.current.update({
      data: finalUrl,
      image: logoDataUrl,
    });
  };

  const downloadQR = () => {
    if (!qrCodeRef.current) return;
    qrCodeRef.current.download({ name: "custom-qr", extension: "svg" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black bg-white">
      <div className="qr-card relative w-[300px] px-4 py-10 overflow-hidden text-center flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center z-10">
          <h1 className="qr-title mb-5 text-2xl font-semibold leading-tight">
            Check out the Zing app
          </h1>
          <div
            id="canvas-container"
            ref={containerRef}
            className="qr-canvas mx-auto"
          />
        </div>
      </div>

      <div className="qr-controls mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => updateQR("en")}
          disabled={!ready}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-50"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => updateQR("fr")}
          disabled={!ready}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-50"
        >
          French
        </button>
        <button
          type="button"
          onClick={downloadQR}
          disabled={!ready}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-50"
        >
          Download .SVG
        </button>
      </div>
    </main>
  );
}
