import { RenderResult } from "mermaid";
import styles from "./DiagramRenderer.module.scss";

type DiagramRendererProps = {
  diagramRenderedResult: RenderResult & { id: string };
};

export default function DiagramRenderer({
  diagramRenderedResult,
}: DiagramRendererProps) {
  if (diagramRenderedResult.svg.length === 0) {
    return null;
  }

  return (
    <div className={styles["svg-wrapper"]}>
      <div
        id={diagramRenderedResult.id}
        dangerouslySetInnerHTML={{ __html: diagramRenderedResult.svg }}
      />
    </div>
  );
}
