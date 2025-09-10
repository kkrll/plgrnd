"use client";

import React, { useState } from "react";

const ButtonPreview = () => {
  return (
    <>
      <style jsx>{`
        .animated-button {
          background: linear-gradient(
            75deg,
            #f5f5f5 0%,
            #f5f5f5 33%,
            #ebe1f6 40%,
            #ebe1f6 66%,
            #f5f5f5 75%,
            #f5f5f5 100%
          );
          background-size: 400% 100%;
          background-position: 100% 0%;
          transition: background-position 3s ease-in-out;
        }

        .animated-button:hover {
          background-position: 0% 0%;
        }
      `}</style>

      <body
        style={{ background: "white" }}
        className="w-full h-[100vh] flex items-center justify-center"
      >
        <button
          className="animated-button"
          style={{
            color: "black",
            padding: "10px 20px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {`[X] Open in WhatsApp`}
        </button>
      </body>
    </>
  );
};

export default ButtonPreview;
