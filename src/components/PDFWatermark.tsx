"use client";

import { useState, useRef, useCallback } from "react";
import { FiUpload, FiDownload, FiX } from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md";

interface Props {
  locale?: string;
}

type Position = "center" | "diagonal" | "top" | "bottom";

export default function PDFWatermark({ locale = "es" }: Props) {
  const isEs = locale === "es";

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState(isEs ? "CONFIDENCIAL" : "CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.15);
  const [color, setColor] = useState("#000000");
  const [position, setPosition] = useState<Position>("diagonal");
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPdf = useCallback(async (file: File) => {
    setError(null);
    setPdfFile(null);
    setPageCount(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
      setPdfFile(file);
    } catch {
      setError(isEs ? "No se pudo leer el PDF. Puede estar protegido o dañado." : "Could not read the PDF. It may be protected or corrupted.");
    }
  }, [isEs]);

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  };

  const apply = useCallback(async () => {
    if (!pdfFile || !text.trim()) return;
    setApplying(true);
    setError(null);

    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
      const bytes = await pdfFile.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const [r, g, b] = hexToRgb(color);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = font.heightAtSize(fontSize);

        let x = 0, y = 0, rotation = 0;

        if (position === "diagonal") {
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
          rotation = 45;
        } else if (position === "center") {
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
        } else if (position === "top") {
          x = (width - textWidth) / 2;
          y = height - textHeight - 30;
        } else {
          x = (width - textWidth) / 2;
          y = 30;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(rotation),
        });
      }

      const outBytes = await doc.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name.replace(/\.pdf$/i, "") + "_watermarked.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(isEs ? "Error al añadir la marca de agua." : "Error adding the watermark.");
    } finally {
      setApplying(false);
    }
  }, [pdfFile, text, fontSize, opacity, color, position, isEs]);

  return (
    <div className="flex flex-col gap-4">
      {!pdfFile ? (
        <div
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") loadPdf(f); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/40 bg-surface/20 p-10 transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <MdPictureAsPdf className="text-4xl text-text-muted/60" />
          <div className="text-center">
            <p className="text-sm font-medium text-text-muted">
              {isEs ? "Arrastra tu PDF aquí o haz clic para seleccionarlo" : "Drag your PDF here or click to select it"}
            </p>
            <p className="mt-1 text-xs text-text-muted/50">PDF</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-border/30 bg-surface/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <MdPictureAsPdf className="text-2xl text-primary" />
            <div>
              <p className="text-sm font-medium text-text">{pdfFile.name}</p>
              <p className="text-xs text-text-muted/60">
                {pageCount} {isEs ? "páginas" : "pages"} · {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => { setPdfFile(null); setPageCount(0); setError(null); }}
            className="rounded-lg border border-border/40 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <FiX className="inline text-xs" /> {isEs ? "Cambiar" : "Change"}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) loadPdf(f); e.target.value = ""; }}
      />

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {pdfFile && pageCount > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted">{isEs ? "Texto de la marca de agua:" : "Watermark text:"}</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={80}
                placeholder={isEs ? "Ej: CONFIDENCIAL" : "E.g.: CONFIDENTIAL"}
                className="rounded-xl border border-border/30 bg-surface/60 px-4 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted">{isEs ? "Posición:" : "Position:"}</label>
              <div className="flex items-center rounded-lg border border-border/40 overflow-hidden text-xs">
                {([
                  { id: "diagonal", labelEs: "Diagonal", labelEn: "Diagonal" },
                  { id: "center", labelEs: "Centro", labelEn: "Center" },
                  { id: "top", labelEs: "Arriba", labelEn: "Top" },
                  { id: "bottom", labelEs: "Abajo", labelEn: "Bottom" },
                ] as { id: Position; labelEs: string; labelEn: string }[]).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPosition(p.id)}
                    className={`flex-1 px-2 py-1.5 transition-colors ${
                      position === p.id ? "bg-primary/20 text-primary" : "bg-surface/60 text-text-muted hover:text-text"
                    }`}
                  >
                    {isEs ? p.labelEs : p.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted">
                {isEs ? `Tamaño de fuente: ${fontSize}pt` : `Font size: ${fontSize}pt`}
              </label>
              <input
                type="range"
                min={12}
                max={120}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="accent-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted">
                {isEs ? `Opacidad: ${Math.round(opacity * 100)}%` : `Opacity: ${Math.round(opacity * 100)}%`}
              </label>
              <input
                type="range"
                min={5}
                max={100}
                value={Math.round(opacity * 100)}
                onChange={(e) => setOpacity(parseInt(e.target.value, 10) / 100)}
                className="accent-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-muted">{isEs ? "Color:" : "Color:"}</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-9 w-16 cursor-pointer rounded-lg border border-border/30 bg-transparent p-0.5"
                />
                <span className="text-sm text-text-muted/70 font-mono">{color.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-xl border border-border/20 bg-surface/20 py-6">
            <span
              className="select-none font-bold uppercase tracking-wider"
              style={{
                color,
                opacity,
                fontSize: Math.min(fontSize * 0.4, 32),
                transform: position === "diagonal" ? "rotate(-45deg)" : "none",
              }}
            >
              {text || (isEs ? "Vista previa" : "Preview")}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={apply}
              disabled={applying || !text.trim()}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <FiDownload />
              {applying ? (isEs ? "Aplicando…" : "Applying…") : (isEs ? "Añadir marca de agua" : "Add watermark")}
            </button>
          </div>
        </>
      )}

      {!pdfFile && !error && (
        <p className="text-center text-sm text-text-muted/40">
          {isEs
            ? "Sube un PDF y configura el texto, posición, tamaño, opacidad y color de la marca de agua."
            : "Upload a PDF and configure the text, position, size, opacity and color of the watermark."}
        </p>
      )}
    </div>
  );
}
