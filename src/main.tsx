import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// استيراد مكون التحليلات من Vercel
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* إضافة مكون Analytics باش يتابع الزوار */}
    <Analytics />
  </StrictMode>
);