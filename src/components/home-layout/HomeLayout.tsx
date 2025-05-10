import mermaid from "mermaid";
import { Outlet } from "react-router";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  logLevel: 5,
  suppressErrorRendering: true,
  flowchart: {
    htmlLabels: false,
  },
});

function HomeLayout() {
  return (
    <div>
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default HomeLayout;
