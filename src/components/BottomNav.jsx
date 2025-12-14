import React from "react";
import { NavLink } from "react-router-dom";

function cls(isActive) {
  return `navItem ${isActive ? "active" : ""}`;
}

export default function BottomNav() {
  return (
    <>
      <NavLink to="/" className={({ isActive }) => cls(isActive)}>
        Home
      </NavLink>
      <NavLink to="/life" className={({ isActive }) => cls(isActive)}>
        人生OS
      </NavLink>
      <NavLink to="/os/internal" className={({ isActive }) => cls(isActive)}>
        辞書
      </NavLink>
      <NavLink to="/me" className={({ isActive }) => cls(isActive)}>
        マイページβ
      </NavLink>
    </>
  );
}
