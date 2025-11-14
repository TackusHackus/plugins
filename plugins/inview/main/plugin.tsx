import { definePlugin } from "@revenge/plugin";
import React, { useState } from "react";

export default definePlugin({
  name: "InView",
  description: "Open WebView instead of classic browser",

  onStart() {
    const originalOpen = window.open;
    window.open = (url: string, name?: string) => {
      showWebView(url, name || url);
    };
  },

  onStop() {
    window.open = originalOpen;
  },
});

function showWebView(url: string, title: string) {
  // React
  const modal = document.createElement("div");
  document.body.appendChild(modal);

  const WebViewModal = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "#111",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#222",
          color: "#fff",
          padding: "8px"
        }}>
          <span>{title} - {url}</span>
          <div>
            <button onClick={() => window.open(url, "_blank")} style={{marginRight: "8px"}}>🌐</button>
            <button onClick={() => setVisible(false)}>✕</button>
          </div>
        </div>
        <iframe src={url} style={{flex: 1, border: "none"}} />
      </div>
    );
  };

  React.render(<WebViewModal />, modal);
}
