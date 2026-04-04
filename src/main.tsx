import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// 1. استيراد المكون ديال التحليلات
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* 2. إضافة المكون باش يبدا يحسب الزوار */}
    <Analytics />
  </StrictMode>
);