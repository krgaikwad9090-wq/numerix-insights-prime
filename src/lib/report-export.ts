// Client-only export helpers for the numerology report.

async function renderCanvas(node: HTMLElement) {
  const { default: html2canvas } = await import("html2canvas-pro");
  return html2canvas(node, {
    backgroundColor: "#020617",
    scale: 2,
    useCORS: true,
    logging: false,
    windowWidth: node.scrollWidth,
  });
}

function download(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function safeFileName(name: string) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "numerology"
  );
}

export async function exportJpg(node: HTMLElement, fileBase: string) {
  const canvas = await renderCanvas(node);
  download(canvas.toDataURL("image/jpeg", 0.95), `${fileBase}-numerology-report.jpg`);
}

export async function exportPdf(node: HTMLElement, fileBase: string) {
  const canvas = await renderCanvas(node);
  const { jsPDF } = await import("jspdf");

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  // Slice the tall canvas into page-sized chunks so the whole report is included.
  const scale = pageW / canvas.width;
  const sliceHeightPx = Math.floor(pageH / scale);
  let offset = 0;
  let page = 0;

  while (offset < canvas.height) {
    const height = Math.min(sliceHeightPx, canvas.height - offset);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = height;
    const ctx = slice.getContext("2d");
    if (!ctx) break;
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(canvas, 0, offset, canvas.width, height, 0, 0, canvas.width, height);

    if (page > 0) pdf.addPage();
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.95),
      "JPEG",
      0,
      0,
      pageW,
      height * scale,
      undefined,
      "FAST",
    );
    offset += height;
    page += 1;
  }

  pdf.save(`${fileBase}-numerology-report.pdf`);
}
