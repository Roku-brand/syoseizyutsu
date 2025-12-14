import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function SpiralScene({ cards }) {
  const nav = useNavigate();
  const group = useRef();

  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ x: 0, y: 0, ry: 0, offsetY: 0 });
  const [rotY, setRotY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const positions = useMemo(() => {
    // 3D螺旋：カード数に応じて配置
    const out = [];
    const turn = Math.PI * 2;
    const radius = 2.2;
    const stepY = 0.75;
    for (let i = 0; i < cards.length; i++) {
      const a = i * 0.65; // 角度増分
      const y = (i - (cards.length - 1) / 2) * stepY;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      out.push({ x, y, z, a });
    }
    return out;
  }, [cards]);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = rotY;
    group.current.position.y = offsetY;
  });

  const onPointerDown = (e) => {
    setDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY, ry: rotY, offsetY };
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    const nextRot = dragRef.current.ry + dx * 0.006;
    const nextOff = clamp(dragRef.current.offsetY - dy * 0.01, -4.5, 4.5);
    setRotY(nextRot);
    setOffsetY(nextOff);
  };
  const onPointerUp = () => setDragging(false);

  const onWheel = (e) => {
    const next = clamp(offsetY + e.deltaY * 0.0025, -4.5, 4.5);
    setOffsetY(next);
  };

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
    >
      {/* 静かな宇宙感：最小限の光 */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={0.8} />

      {cards.map((card, idx) => {
        const p = positions[idx];
        return (
          <group key={card.id} position={[p.x, p.y, p.z]} rotation={[0, p.a + Math.PI / 2, 0]}>
            <mesh>
              <planeGeometry args={[1.6, 0.95]} />
              <meshStandardMaterial color="#0F162E" metalness={0.15} roughness={0.65} />
            </mesh>
            <Html
              transform
              distanceFactor={1.3}
              position={[0, 0, 0.02]}
              style={{
                width: "220px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,.12)",
                background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                boxShadow: "0 18px 40px rgba(0,0,0,.45)",
                padding: "12px 12px 10px",
                cursor: "pointer",
                userSelect: "none",
                backdropFilter: "blur(10px)"
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                nav(`/card/${encodeURIComponent(card.id)}`);
              }}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,.60)" }}>{card.id}</span>
                <span style={{ fontSize: "13px", fontWeight: 740, color: "rgba(255,255,255,.92)" }}>
                  {card.title}
                </span>
              </div>
              <div style={{ marginTop: "6px", fontSize: "12px", lineHeight: 1.45, color: "rgba(255,255,255,.70)" }}>
                {card.summary}
              </div>
              <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(card.tags || []).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "rgba(255,255,255,.62)"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function LifeSpiral3D({ cards }) {
  return (
    <Canvas camera={{ position: [0, 0.8, 6.2], fov: 52 }}>
      {/* 背景はCanvas外CSSで宇宙風、ここは演出最小限 */}
      <SpiralScene cards={cards} />
    </Canvas>
  );
}
