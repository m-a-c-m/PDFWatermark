import PDFWatermark from "@/components/PDFWatermark";
import { MdPictureAsPdf } from "react-icons/md";

const EMBED_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-watermark";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MdPictureAsPdf className="text-base" />
            Herramienta gratuita · Free tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            <span className="gradient-text">Marca de Agua PDF</span>
            <br />
            <span className="text-2xl font-medium text-text-muted sm:text-3xl">Añadir texto watermark a todas las páginas</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-muted">
            Añade una marca de agua de texto a todas las páginas de tu PDF.
            Personaliza el texto, posición, tamaño de fuente, opacidad y color.
            100% en el navegador — tu documento nunca sale de tu dispositivo.
          </p>
        </div>

        <div className="glass rounded-2xl border border-border/20 p-5 sm:p-8">
          <PDFWatermark />
        </div>

        <div className="mt-12 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            ¿Cómo añadir marca de agua a un PDF? / How to add a watermark?
          </h2>
          <ol className="space-y-5">
            {[
              {
                n: "1",
                t: "Carga tu PDF / Upload your PDF",
                d: "Arrastra el archivo PDF sobre la zona de carga o haz clic para seleccionarlo. Se mostrará el nombre y el número de páginas del documento. / Drag your PDF or click to select it. The filename and page count are shown.",
              },
              {
                n: "2",
                t: "Escribe el texto de la marca de agua / Enter the watermark text",
                d: "Escribe el texto que quieres usar como marca de agua. Puede ser 'CONFIDENCIAL', 'BORRADOR', 'COPIA', tu nombre o cualquier texto de hasta 80 caracteres. / Enter the watermark text: CONFIDENTIAL, DRAFT, your name, etc. Up to 80 characters.",
              },
              {
                n: "3",
                t: "Personaliza la apariencia / Customize the appearance",
                d: "Elige la posición (Diagonal, Centro, Arriba, Abajo), el tamaño de fuente (12–120pt), la opacidad (5–100%) y el color. La vista previa se actualiza en tiempo real. / Choose position, font size, opacity and color. The preview updates in real time.",
              },
              {
                n: "4",
                t: "Aplica y descarga / Apply and download",
                d: "Haz clic en 'Añadir marca de agua'. La marca se aplica a todas las páginas del PDF y el archivo se descarga automáticamente como 'nombre_watermarked.pdf'. / Click Add watermark. It is applied to all pages and downloads automatically.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Preguntas frecuentes / FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "¿La marca de agua se aplica a todas las páginas? / Is the watermark applied to all pages?",
                a: "Sí. La marca de agua se añade a todas y cada una de las páginas del PDF, independientemente del número de páginas que tenga el documento. / Yes. The watermark is added to every single page of the PDF.",
              },
              {
                q: "¿Qué posiciones tiene la marca de agua? / What positions are available?",
                a: "'Diagonal' centra el texto rotado 45° — la opción más usada para confidencialidad. 'Centro' coloca el texto centrado sin rotación. 'Arriba' lo coloca en la cabecera de cada página. 'Abajo' lo coloca en el pie de página. / Diagonal (rotated 45°), Center, Top or Bottom. Diagonal is most common for confidential documents.",
              },
              {
                q: "¿Puedo eliminar la marca de agua después? / Can I remove the watermark later?",
                a: "La marca de agua se incrusta directamente en el contenido del PDF como texto vectorial. No puede eliminarse con esta herramienta después de aplicarse. Guarda siempre una copia del PDF original antes de añadir la marca. / The watermark is embedded as vector text and cannot be removed. Keep a copy of the original.",
              },
              {
                q: "¿Los PDFs con contraseña funcionan? / Do password-protected PDFs work?",
                a: "No. Los PDFs cifrados no pueden procesarse. Deberás eliminar la protección antes de añadir la marca de agua. / No. Encrypted PDFs cannot be processed. Remove the protection first.",
              },
              {
                q: "¿Mi PDF se sube a algún servidor? / Is my PDF uploaded to any server?",
                a: "No. Todo el procesamiento ocurre en tu navegador usando la librería pdf-lib. El archivo nunca abandona tu dispositivo y no se envía nada a ningún servidor externo. / No. Everything runs locally using pdf-lib. Your file never leaves your device.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Incrusta en tu web / Embed on your website
          </h2>
          <p className="mb-4 text-sm text-text-muted">
            Integra esta herramienta de marca de agua en cualquier página web con un simple iframe:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-surface/80 p-4 text-xs text-text-muted">
            <code>{`<iframe
  src="${EMBED_URL}"
  width="100%"
  height="700"
  frameborder="0"
  loading="lazy"
  style="border-radius:12px"
  title="PDF Watermark — MACM"
></iframe>`}</code>
          </pre>
          <p className="mt-3 text-xs text-text-muted/60">
            Herramienta embebible gracias a <code className="text-primary/80">frame-ancestors *</code>.
            Sin cookies, sin tracking, 100% gratuita.
          </p>
        </div>

      </div>
    </main>
  );
}
