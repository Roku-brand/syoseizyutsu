import React from "react";
import BottomNav from "./BottomNav.jsx";

export default function Layout({ children }) {
  return (
    <>
      <div className="container">{children}</div>
      <div className="bottomNav" style={{ display: "block" }}>
        <div className="bottomNavInner">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
