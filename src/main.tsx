import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ApplicationRoutes from "./routes/ApplicationRoutes";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  </StrictMode>
);
