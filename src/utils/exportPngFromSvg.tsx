import html2canvas from "html2canvas";

export async function exportPngFromSvg(svgElement: HTMLElement) {
  const canvas = await html2canvas(svgElement);
  return canvas.toDataURL("image/png");
}
