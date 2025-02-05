import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="loader-container">
      <div className="film-reel">
        <div className="reel"></div>
        <div className="reel"></div>
      </div>
      <p className="loading-text">Loading your movie...</p>
    </div>
  ) : (
    <App />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);

reportWebVitals();
