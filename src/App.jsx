import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import OSList from "./pages/OSList.jsx";
import CardDetail from "./pages/CardDetail.jsx";
import MyPage from "./pages/MyPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/life" element={<OSList osKey="life" mode="spiral" />} />
        <Route path="/os/:osKey" element={<OSList />} />
        <Route path="/card/:id" element={<CardDetail />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
