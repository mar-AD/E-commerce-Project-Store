import React, { useState, useEffect } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import "./backtothetop.css";
export default function backtothetop() {
  const [tothetop, settothetop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        settothetop(true);
      } else {
        settothetop(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scrollup">
      {tothetop && (
        <button
          className="back-to-top"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#f9e9c8",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
            bottom: "20px",
            right: "20px",
            height: "50px",
            width: "50px",
            fontSize: " 50px",
            zIndex: 1000000000,
          }}
          onClick={scrollUp}
        >
          <ExpandLessRoundedIcon
            style={{ fontSize: "0.8em", color: "#590404" }}
          />
        </button>
      )}
    </div>
  );
}
