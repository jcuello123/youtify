import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_API || "http://localhost:3001";

export default function LandingPage() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      window.location.assign(`${SERVER_URL}/login`);
    }
  });

  return (
    <div className="main">
      <div className="header">
        <span>
          <h1>YouT</h1>
          <h1 className="green">ify</h1>
        </span>
      </div>

      <Button
        style={{
          background: "#1db954",
          color: "white",
          margin: "10px",
          fontWeight: "550",
        }}
        onClick={() => setClicked(true)}
        variant="contained"
      >
        Login
      </Button>

      <div className="footer">
        <p>Copyright ©2020 All rights reserved</p>
      </div>
    </div>
  );
}
