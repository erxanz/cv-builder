import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getPaperSizeById } from "../data/cv";

function createColorResolver(doc) {
  const canvas = doc.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  const tempElement = doc.createElement("div");
  tempElement.style.position = "fixed";
  tempElement.style.left = "-9999px";
  tempElement.style.top = "0";
  tempElement.style.width = "1px";
  tempElement.style.height = "1px";
  doc.body.appendChild(tempElement);

  const cache = new Map();
  const unsupportedColorPattern = /(?:oklch|oklab|color-mix)\(/i;
  const oklchPattern = /oklch\([^()]*\)/gi;
  const oklabPattern = /oklab\([^()]*\)/gi;

  const toAlphaString = (alphaValue) => {
    const normalizedAlpha = Math.max(0, Math.min(1, alphaValue));
    return normalizedAlpha.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  };

  const convertColorToken = (token) => {
    if (!context) {
      return token;
    }

    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(0, 0, 1, 1);

    try {
      context.fillStyle = token;
    } catch {
      return token;
    }

    context.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;

    if (a === 255) {
      return `rgb(${r}, ${g}, ${b})`;
    }

    return `rgba(${r}, ${g}, ${b}, ${toAlphaString(a / 255)})`;
  };

  const resolveWithComputedStyle = (property, value) => {
    if (!property || !tempElement || !doc.defaultView) {
      return value;
    }

    try {
      tempElement.style.setProperty(property, value);
      const resolved = doc.defaultView.getComputedStyle(tempElement).getPropertyValue(property);
      tempElement.style.removeProperty(property);

      if (resolved && !unsupportedColorPattern.test(resolved)) {
        return resolved;
      }
    } catch {
      tempElement.style.removeProperty(property);
    }

    return value;
  };

  return {
    resolve(value, property) {
      if (!value || !unsupportedColorPattern.test(value)) {
        return value;
      }

      oklchPattern.lastIndex = 0;
      oklabPattern.lastIndex = 0;

      const cacheKey = `${property || ""}::${value}`;
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }

      let resolved = resolveWithComputedStyle(property, value);

      if (unsupportedColorPattern.test(resolved)) {
        resolved = resolved
          .replace(oklchPattern, (match) => convertColorToken(match))
          .replace(oklabPattern, (match) => convertColorToken(match));
      }

      oklchPattern.lastIndex = 0;
      oklabPattern.lastIndex = 0;

      if (unsupportedColorPattern.test(resolved)) {
        resolved = "";
      }

      cache.set(cacheKey, resolved);
      return resolved;
    },
    cleanup() {
      tempElement.remove();
      canvas.remove();
    },
  };
}

function getFallbackForUnsupportedColorProperty(property) {
  if (!property) {
    return "";
  }

  if (property === "box-shadow" || property === "text-shadow") {
    return "none";
  }

  if (property.includes("color") || property.startsWith("background") || property.startsWith("border")) {
    return "transparent";
  }

  return "";
}

function sanitizeUnsupportedColors(rootElement, doc) {
  if (!rootElement || !doc?.defaultView) {
    return;
  }

  const colorResolver = createColorResolver(doc);
  const nodes = [rootElement, ...Array.from(rootElement.querySelectorAll("*"))];

  try {
    nodes.forEach((node) => {
      const computedStyle = doc.defaultView.getComputedStyle(node);

      for (let index = 0; index < computedStyle.length; index += 1) {
        const property = computedStyle.item(index);

        if (!property || property.startsWith("--")) {
          continue;
        }

        const value = computedStyle.getPropertyValue(property);

        if (!value || !/(?:oklch|oklab|color-mix)\(/i.test(value)) {
          continue;
        }

        const resolvedValue = colorResolver.resolve(value, property);
        const safeValue = resolvedValue || getFallbackForUnsupportedColorProperty(property);

        if (safeValue) {
          node.style.setProperty(property, safeValue, computedStyle.getPropertyPriority(property));
        }
      }
    });
  } finally {
    colorResolver.cleanup();
  }
}

export const exportPDF = async (
  elementId,
  filename = "Curriculum_Vitae.pdf",
  paperSize = "a4",
  options = {},
) => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Elemen dengan ID '${elementId}' tidak ditemukan.`);
    return;
  }

  const paper = getPaperSizeById(paperSize);
  const { fitToSinglePage = true } = options;

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready.catch(() => undefined);
    }

    await new Promise((res) => setTimeout(res, 200));

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: false,
      scale: 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);

        if (!clonedElement) {
          return;
        }

        clonedElement.style.margin = "0";
        clonedElement.style.border = "none";
        clonedElement.style.borderRadius = "0";
        clonedElement.style.boxShadow = "none";
        clonedElement.style.width = `${paper.width}mm`;
        clonedElement.style.minHeight = `${paper.height}mm`;
        clonedElement.style.background = "#ffffff";
        sanitizeUnsupportedColors(clonedElement, clonedDoc);
      },
    });

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Tidak bisa menyiapkan kanvas PDF.");
    }

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [paper.width, paper.height],
      compress: true,
    });

    const pixelsPerMm = canvas.width / paper.width;
    const contentHeightMm = canvas.height / pixelsPerMm;

    if (fitToSinglePage) {
      const scale = Math.min(1, paper.height / contentHeightMm);
      const drawWidth = paper.width * scale;
      const drawHeight = contentHeightMm * scale;
      const offsetX = (paper.width - drawWidth) / 2;
      const imageDataUrl = canvas.toDataURL("image/png");

      pdf.addImage(imageDataUrl, "PNG", offsetX, 0, drawWidth, drawHeight);
    } else {
      const sliceHeightPx = Math.max(1, Math.floor(paper.height * pixelsPerMm));
      let remainingHeight = canvas.height;
      let offsetY = 0;
      let firstPage = true;

      while (remainingHeight > 0) {
        const currentSliceHeight = Math.min(sliceHeightPx, remainingHeight);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = currentSliceHeight;

        const sliceContext = sliceCanvas.getContext("2d");

        if (!sliceContext) {
          throw new Error("Tidak bisa memotong halaman PDF.");
        }

        sliceContext.fillStyle = "#ffffff";
        sliceContext.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceContext.drawImage(
          canvas,
          0,
          offsetY,
          canvas.width,
          currentSliceHeight,
          0,
          0,
          canvas.width,
          currentSliceHeight,
        );

        const sliceDataUrl = sliceCanvas.toDataURL("image/png");
        const sliceHeightMm = currentSliceHeight / pixelsPerMm;

        if (!firstPage) {
          pdf.addPage([paper.width, paper.height], "p");
        }

        pdf.addImage(sliceDataUrl, "PNG", 0, 0, paper.width, sliceHeightMm);

        firstPage = false;
        offsetY += currentSliceHeight;
        remainingHeight -= currentSliceHeight;
      }
    }

    pdf.save(filename);
  } catch (err) {
    console.error("Gagal membuat PDF:", err);
    // rethrow so callers can display or handle the error
    throw err;
  }
};
