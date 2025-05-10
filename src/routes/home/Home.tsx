import { useCallback, useEffect, useState } from "react";
import uniqueId from "lodash.uniqueid";
import CodeEditor from "../../components/code-editor/CodeEditor";
import DiagramRenderer from "../../components/diagram-renderer/DiagramRenderer";
import styles from "./Home.module.scss";
import mermaid, { RenderResult } from "mermaid";
import { exportPngFromSvg } from "../../utils/exportPngFromSvg";

function Home() {
  const [writtenCode, setWrittenCode] = useState("");

  const [diagramRenderedResult, setDiagramRenderedResult] = useState<
    RenderResult & { id: string }
  >({
    svg: "",
    diagramType: "",
    id: "",
  });

  const handleCodeChange = useCallback(
    async (val: string) => {
      const generatedUniqId = `mermaid-diagram-${uniqueId()}`;
      setWrittenCode(val);

      try {
        const renderedResult = await mermaid.render(generatedUniqId, val);

        setDiagramRenderedResult({
          svg: renderedResult.svg,
          diagramType: renderedResult.diagramType,
          id: generatedUniqId,
        });
      } catch (error) {
        const err = error as Error;

        setDiagramRenderedResult({
          svg: `<pre style="color:red;">${err.message || err}</pre>`,
          diagramType: "",
          id: "",
        });
      }
    },
    [setWrittenCode, setDiagramRenderedResult]
  );

  const handleExportPng = async () => {
    try {
      const svgElement = document.getElementById(diagramRenderedResult.id);

      if (!svgElement) {
        throw new Error("No svg element found");
      }

      const pngDataUrl = await exportPngFromSvg(svgElement);

      const a = document.createElement("a");
      a.href = pngDataUrl;
      // TODO: set uniq name or take form user
      a.download = "diagram.png";
      a.click();
    } catch (error) {
      console.error("Failed to export PNG:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await handleCodeChange(DEFAULT_CODE);
    })();
  }, [handleCodeChange]);

  return (
    <div className={styles["home-wrapper"]}>
      <div className={styles["editor-wrapper"]}>
        <CodeEditor
          writtenCode={writtenCode}
          handleCodeChange={handleCodeChange}
        />
      </div>

      <div className={styles["diagram-renderer-wrapper"]}>
        <DiagramRenderer diagramRenderedResult={diagramRenderedResult} />

        <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
          <button onClick={handleExportPng}>Export as PNG</button>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_CODE = `
flowchart TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Check the code]
`;

export default Home;
