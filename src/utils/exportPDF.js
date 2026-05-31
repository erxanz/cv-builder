import html2pdf from "html2pdf.js";

export const exportPDF = (elementId, filename = "Curriculum_Vitae.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Elemen dengan ID '${elementId}' tidak ditemukan.`);
    return;
  }

  // Konfigurasi output PDF (ukuran A4, tanpa margin, kualitas tinggi)
  const opt = {
    margin: 0,
    filename: filename,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};
