import { getPaperSizeById, getTemplateById } from "../../../data/cv";
import { buildProfessionalCVModel, templatePalette } from "./professionalModel";
import { AcademicLayout } from "./AcademicLayout";
import { AtsLayout } from "./AtsLayout";
import { CompactLayout } from "./CompactLayout";
import { FullTextLayout } from "./FullTextLayout";
import { PhotoLayout } from "./PhotoLayout";

const layoutComponents = {
  compact: CompactLayout,
  classic: CompactLayout,
  photo: PhotoLayout,
  ats: AtsLayout,
  fulltext: FullTextLayout,
  academic: AcademicLayout,
};

export function ProfessionalCV({ data, templateId = "executive", paperSize = "a4" }) {
  const template = getTemplateById(templateId);
  const paper = getPaperSizeById(paperSize);
  const palette = templatePalette[template.accent] ?? templatePalette.slate;
  const model = buildProfessionalCVModel(data);
  const Layout = layoutComponents[template.layout] ?? CompactLayout;
  const articleClassName =
    "mx-auto overflow-hidden rounded-[34px] border border-slate-200 bg-white text-[#1E293B] shadow-[0_18px_60px_rgba(15,23,42,0.08)] " +
    ((template.layout === "fulltext" || template.layout === "ats") ? "p-6 sm:p-10" : "p-5 sm:p-8 lg:p-10");

  return (
    <article
      id="cv-render-area"
      aria-label={`Resume ${template.name} ${paper.label}`}
      style={{ width: `${paper.width}mm`, minHeight: `${paper.height}mm` }}
      className={articleClassName}>
      <Layout model={model} template={template} paper={paper} palette={palette} />
    </article>
  );
}