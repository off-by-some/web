import { RESUME_PDF_FILENAME } from './resume-model';
import { RESUME_PDF_NODE, RESUME_PDF_TEXT, resumePdfNodeSelector } from './resume-pdf-contract';

import { SVGPathData } from 'svg-pathdata';

import type { jsPDF as JsPdf } from 'jspdf';
import type { SVGCommand } from 'svg-pathdata';
import type { ResumePdfTextMode } from './resume-pdf-contract';

type PdfFontStyle = 'normal' | 'bold' | 'italic' | 'bolditalic';

interface PdfPageSpace {
  element: HTMLElement;
  rect: DOMRect;
  xScale: number;
  yScale: number;
}

interface TextLine {
  bottom: number;
  left: number;
  right: number;
  text: string;
  top: number;
}

interface SvgPathOperation {
  c?: number[];
  op: 'm' | 'l' | 'c' | 'h';
}

interface PdfFontState {
  id: string;
}

interface PdfTextWriter {
  getFont: () => PdfFontState;
  getFontSize: () => number;
  internal: {
    write: (value: string) => void;
  };
}

const PDF_PAGE = {
  height: 792,
  width: 612,
};

function assertResumeDocument() {
  const documentElement = document.querySelector<HTMLElement>(
    resumePdfNodeSelector(RESUME_PDF_NODE.document),
  );
  if (!documentElement) {
    throw new Error('Resume PDF export requires a resume PDF document node.');
  }

  return documentElement;
}

function assertResumePages(root: ParentNode) {
  const pages = Array.from(
    root.querySelectorAll<HTMLElement>(resumePdfNodeSelector(RESUME_PDF_NODE.page)),
  );
  if (pages.length === 0) {
    throw new Error('Resume PDF export requires at least one resume PDF page node.');
  }

  return pages;
}

function nextAnimationFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

async function createPdfSourcePages() {
  const source = assertResumeDocument();
  const host = document.createElement('div');
  const clone = source.cloneNode(true) as HTMLElement;

  host.setAttribute('data-resume-pdf-host', '');
  host.style.position = 'fixed';
  host.style.insetBlockStart = '0';
  host.style.insetInlineStart = '-10000px';
  host.style.inlineSize = '52rem';
  host.style.maxInlineSize = 'none';
  host.style.pointerEvents = 'none';
  host.style.zIndex = '-1';

  clone.style.inlineSize = '52rem';
  clone.style.maxInlineSize = 'none';

  host.append(clone);
  document.body.append(host);

  await nextAnimationFrame();

  return {
    cleanup: () => {
      host.remove();
    },
    pages: assertResumePages(clone),
  };
}

function normalizePdfText(value: string) {
  const normalized = value
    .replace(/\u00a0/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/→/g, '->')
    .replace(/…/g, '...');

  return Array.from(normalized)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126);
    })
    .join('');
}

function normalizeCssText(value: string) {
  return normalizePdfText(value.replace(/\s+/g, ' '));
}

function pdfNumber(value: number) {
  return Number(value.toFixed(4)).toString();
}

function pdfColorOperand(value: number) {
  return pdfNumber(value / 255);
}

function escapePdfString(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

function pdfFillColorCommand(color: string) {
  const value = color.replace('#', '');
  const channels = [0, 2, 4].map((start) => Number.parseInt(value.slice(start, start + 2), 16));

  if (!channels.every(Number.isFinite)) {
    throw new Error(`Unsupported PDF text color value: ${color}`);
  }

  return `${channels.map(pdfColorOperand).join(' ')} rg`;
}

function writePdfTextLine(pdf: JsPdf, text: string, x: number, y: number, color: string) {
  const writer = pdf as unknown as PdfTextWriter;
  const font = writer.getFont();
  const fontSize = writer.getFontSize();
  const baselineY = PDF_PAGE.height - y;

  writer.internal.write('BT');
  writer.internal.write(`/${font.id} ${pdfNumber(fontSize)} Tf`);
  writer.internal.write(pdfFillColorCommand(color));
  writer.internal.write(`1 0 0 1 ${pdfNumber(x)} ${pdfNumber(baselineY)} Tm`);
  writer.internal.write(`(${escapePdfString(text)}) Tj`);
  writer.internal.write('ET');
}

function transformCssText(text: string, style: CSSStyleDeclaration) {
  if (style.textTransform === 'uppercase') return text.toUpperCase();
  if (style.textTransform === 'lowercase') return text.toLowerCase();
  return text;
}

function toPdfX(space: PdfPageSpace, x: number) {
  return (x - space.rect.left) * space.xScale;
}

function toPdfY(space: PdfPageSpace, y: number) {
  return (y - space.rect.top) * space.yScale;
}

function toPdfWidth(space: PdfPageSpace, width: number) {
  return width * space.xScale;
}

function toPdfHeight(space: PdfPageSpace, height: number) {
  return height * space.yScale;
}

function parsePixelValue(value: string) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Unsupported PDF pixel value: ${value}`);
  }

  return parsed;
}

function parseLineHeight(style: CSSStyleDeclaration, fontSize: number, space: PdfPageSpace) {
  if (style.lineHeight === 'normal') return fontSize * 1.4;

  const parsed = Number.parseFloat(style.lineHeight);
  if (!Number.isFinite(parsed)) return fontSize * 1.4;

  return style.lineHeight.trim().endsWith('px') ? parsed * space.yScale : parsed * fontSize;
}

function pdfTextMode(element: HTMLElement): ResumePdfTextMode {
  return element.dataset.pdfText === RESUME_PDF_TEXT.flow
    ? RESUME_PDF_TEXT.flow
    : RESUME_PDF_TEXT.dom;
}

function parseColor(value: string) {
  const trimmed = value.trim();
  if (/^#[\da-f]{3}$/i.test(trimmed)) {
    return `#${trimmed
      .slice(1)
      .split('')
      .map((character) => `${character}${character}`)
      .join('')}`;
  }

  if (/^#[\da-f]{6}$/i.test(trimmed)) return trimmed;

  const srgb = /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)$/i.exec(value);
  const rgbChannels =
    value.startsWith('rgb(') || value.startsWith('rgba(')
      ? value
          .slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
          .split(/[,\s/]+/)
          .filter(Boolean)
          .slice(0, 3)
          .map(Number)
      : undefined;
  const channels = srgb
    ? srgb.slice(1, 4).map((channel) => Number.parseFloat(channel) * 255)
    : rgbChannels;

  if (!channels || channels.length < 3) {
    throw new Error(`Unsupported PDF color value: ${value}`);
  }

  return `#${channels
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

function pdfFontStyle(style: CSSStyleDeclaration): PdfFontStyle {
  const weight = Number.parseInt(style.fontWeight, 10);
  const isBold = Number.isFinite(weight) && weight >= 600;
  const isItalic = style.fontStyle === 'italic' || style.fontStyle === 'oblique';

  if (isBold && isItalic) return 'bolditalic';
  if (isBold) return 'bold';
  if (isItalic) return 'italic';
  return 'normal';
}

function alignedPdfX(
  pdf: JsPdf,
  space: PdfPageSpace,
  line: TextLine,
  text: string,
  style: CSSStyleDeclaration,
) {
  const lineLeft = toPdfX(space, line.left);
  const lineWidth = toPdfWidth(space, line.right - line.left);
  const textWidth = pdf.getTextWidth(text);

  if (style.textAlign === 'center') return lineLeft + (lineWidth - textWidth) / 2;
  if (style.textAlign === 'right' || style.textAlign === 'end')
    return lineLeft + lineWidth - textWidth;

  return lineLeft;
}

function isVisibleElement(element: Element) {
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function closestVisibleElement(node: Node) {
  const element = node.parentElement;
  if (!element) return undefined;
  return element;
}

function textNodeFilter(node: Node) {
  if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;

  const element = closestVisibleElement(node);
  if (!element || !isVisibleElement(element)) return NodeFilter.FILTER_REJECT;

  return NodeFilter.FILTER_ACCEPT;
}

function mergeLine(lines: TextLine[], line: TextLine) {
  const existing = lines.find((candidate) => Math.abs(candidate.top - line.top) < 1.5);

  if (!existing) {
    lines.push(line);
    return;
  }

  existing.bottom = Math.max(existing.bottom, line.bottom);
  existing.left = Math.min(existing.left, line.left);
  existing.right = Math.max(existing.right, line.right);
  existing.text = `${existing.text}${line.text}`;
}

function collectTextLines(node: Text) {
  const lines: TextLine[] = [];
  const range = document.createRange();
  let pendingSpace = '';

  for (let index = 0; index < node.length; index += 1) {
    const character = node.data[index];
    if (!character) continue;

    range.setStart(node, index);
    range.setEnd(node, index + 1);

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      if (/\s/.test(character)) pendingSpace = ' ';
      continue;
    }

    const text = normalizeCssText(`${pendingSpace}${character}`);
    pendingSpace = '';
    if (!text) continue;

    mergeLine(lines, {
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      text,
      top: rect.top,
    });
  }

  range.detach();
  return lines.sort((a, b) => a.top - b.top || a.left - b.left);
}

function renderTextNode(pdf: JsPdf, space: PdfPageSpace, node: Text) {
  const element = closestVisibleElement(node);
  if (!element) return;

  const style = getComputedStyle(element);
  const fontSize = parsePixelValue(style.fontSize) * space.yScale;
  const link = element.closest<HTMLAnchorElement>('a[href]');
  const color = parseColor(style.color);

  pdf.setFont('helvetica', pdfFontStyle(style));
  pdf.setFontSize(fontSize);
  pdf.setTextColor(color);

  if (pdfTextMode(element) === RESUME_PDF_TEXT.flow) {
    const rect = element.getBoundingClientRect();
    const text = transformCssText(normalizeCssText(node.data).trim(), style);
    const lineHeight = parseLineHeight(style, fontSize, space);
    const firstLineY = toPdfY(space, rect.top) + fontSize * 0.82;
    const lines = pdf.splitTextToSize(text, toPdfWidth(space, rect.width)) as string[];

    lines.forEach((line, index) => {
      writePdfTextLine(pdf, line, toPdfX(space, rect.left), firstLineY + lineHeight * index, color);
    });

    return;
  }

  for (const line of collectTextLines(node)) {
    const text = line.text.trim();
    if (!text) continue;
    const transformedText = transformCssText(text, style);

    const x = alignedPdfX(pdf, space, line, transformedText, style);
    const y = toPdfY(space, line.bottom) - fontSize * 0.18;
    const width = toPdfWidth(space, line.right - line.left);

    writePdfTextLine(pdf, transformedText, x, y, color);

    if (link) {
      pdf.link(x, toPdfY(space, line.top), width, toPdfHeight(space, line.bottom - line.top), {
        url: link.href,
      });
    }
  }
}

function renderPdfRules(pdf: JsPdf, space: PdfPageSpace) {
  const rules = Array.from(
    space.element.querySelectorAll<HTMLElement>(resumePdfNodeSelector(RESUME_PDF_NODE.rule)),
  );

  for (const rule of rules) {
    const rect = rule.getBoundingClientRect();
    const style = getComputedStyle(rule);
    const blockSize = Math.max(0.6, toPdfHeight(space, rect.height));
    const y = toPdfY(space, rect.top + rect.height / 2);

    pdf.setDrawColor(parseColor(style.backgroundColor));
    pdf.setLineWidth(blockSize);
    pdf.line(toPdfX(space, rect.left), y, toPdfX(space, rect.right), y);
  }
}

function parseSvgPath(pathData: string): SvgPathOperation[] {
  return new SVGPathData(pathData)
    .toAbs()
    .normalizeST()
    .qtToC()
    .aToC()
    .normalizeHVZ(false)
    .sanitize()
    .commands.map(svgCommandToPdfOperation)
    .filter(isSvgPathOperation);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function svgCommandToPdfOperation(command: SVGCommand): SvgPathOperation | undefined {
  if (command.type === SVGPathData.CLOSE_PATH) return { c: [], op: 'h' };

  if (
    command.type === SVGPathData.MOVE_TO &&
    isFiniteNumber(command.x) &&
    isFiniteNumber(command.y)
  ) {
    return { c: [command.x, command.y], op: 'm' };
  }

  if (
    command.type === SVGPathData.LINE_TO &&
    isFiniteNumber(command.x) &&
    isFiniteNumber(command.y)
  ) {
    return { c: [command.x, command.y], op: 'l' };
  }

  if (
    command.type === SVGPathData.CURVE_TO &&
    isFiniteNumber(command.x1) &&
    isFiniteNumber(command.y1) &&
    isFiniteNumber(command.x2) &&
    isFiniteNumber(command.y2) &&
    isFiniteNumber(command.x) &&
    isFiniteNumber(command.y)
  ) {
    return {
      c: [command.x1, command.y1, command.x2, command.y2, command.x, command.y],
      op: 'c',
    };
  }

  return undefined;
}

function isSvgPathOperation(
  operation: SvgPathOperation | undefined,
): operation is SvgPathOperation {
  return Boolean(operation?.c?.every(Number.isFinite));
}

function isValidSvgOperation(operation: SvgPathOperation) {
  return operation.c?.every(Number.isFinite) ?? true;
}

function svgViewBox(svg: SVGSVGElement) {
  const viewBox = svg.getAttribute('viewBox')?.trim();
  if (viewBox) {
    const [minX, minY, width, height] = viewBox.split(/[\s,]+/).map(Number);
    if ([minX, minY, width, height].every(Number.isFinite) && width > 0 && height > 0) {
      return { height, minX, minY, width };
    }
  }

  const rect = svg.getBoundingClientRect();
  return { height: Math.max(rect.height, 1), minX: 0, minY: 0, width: Math.max(rect.width, 1) };
}

function svgCoordinateMapper(space: PdfPageSpace, svg: SVGSVGElement) {
  const rect = svg.getBoundingClientRect();
  const viewBox = svgViewBox(svg);
  const xRatio = rect.width / viewBox.width;
  const yRatio = rect.height / viewBox.height;

  return (operation: SvgPathOperation): SvgPathOperation => ({
    op: operation.op,
    c: operation.c?.map((value, index) => {
      const isX = index % 2 === 0;
      const cssValue = isX
        ? rect.left + (value - viewBox.minX) * xRatio
        : rect.top + (value - viewBox.minY) * yRatio;

      return isX ? toPdfX(space, cssValue) : toPdfY(space, cssValue);
    }),
  });
}

function inheritedSvgAttribute(element: SVGElement, name: string) {
  let current: Element | null = element;

  while (current && current instanceof SVGElement) {
    const value = current.getAttribute(name);
    if (value) return value;
    current = current.parentElement;
  }

  return undefined;
}

function resolveSvgPaint(element: SVGElement, name: 'fill' | 'stroke') {
  const attribute = inheritedSvgAttribute(element, name);
  const computed = getComputedStyle(element);
  const rawValue = attribute ?? (name === 'fill' ? computed.fill : computed.stroke);
  const value = rawValue.trim();

  if (!value || value === 'none' || value.startsWith('url(')) return undefined;
  if (value === 'currentColor') return parseColor(computed.color);

  return parseColor(value);
}

function renderSvgPath(pdf: JsPdf, space: PdfPageSpace, svg: SVGSVGElement, path: SVGPathElement) {
  if (!isVisibleElement(path)) return;

  const pathData = path.getAttribute('d');
  if (!pathData) return;

  const mapOperation = svgCoordinateMapper(space, svg);
  const operations = parseSvgPath(pathData).map(mapOperation).filter(isValidSvgOperation);
  if (operations.length === 0) return;

  const fill = resolveSvgPaint(path, 'fill');
  const stroke = resolveSvgPaint(path, 'stroke');

  pdf.saveGraphicsState();
  pdf.path(operations);

  if (fill) pdf.setFillColor(fill);
  if (stroke) pdf.setDrawColor(stroke);

  if (fill && stroke) pdf.fillStroke();
  else if (fill) pdf.fill();
  else if (stroke) pdf.stroke();

  pdf.restoreGraphicsState();
}

function renderSvgLine(pdf: JsPdf, space: PdfPageSpace, svg: SVGSVGElement, line: SVGLineElement) {
  const stroke = resolveSvgPaint(line, 'stroke');
  if (!stroke || !isVisibleElement(line)) return;

  const viewBox = svgViewBox(svg);
  const rect = svg.getBoundingClientRect();
  const xRatio = rect.width / viewBox.width;
  const yRatio = rect.height / viewBox.height;
  const x = (value: string | null) =>
    toPdfX(space, rect.left + (Number(value ?? 0) - viewBox.minX) * xRatio);
  const y = (value: string | null) =>
    toPdfY(space, rect.top + (Number(value ?? 0) - viewBox.minY) * yRatio);

  pdf.setDrawColor(stroke);
  pdf.line(
    x(line.getAttribute('x1')),
    y(line.getAttribute('y1')),
    x(line.getAttribute('x2')),
    y(line.getAttribute('y2')),
  );
}

function renderSvgPolyline(
  pdf: JsPdf,
  space: PdfPageSpace,
  svg: SVGSVGElement,
  polyline: SVGPolylineElement,
) {
  const stroke = resolveSvgPaint(polyline, 'stroke');
  if (!stroke || !isVisibleElement(polyline)) return;

  const points = (polyline.getAttribute('points') ?? '')
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (points.length < 4) return;

  const viewBox = svgViewBox(svg);
  const rect = svg.getBoundingClientRect();
  const xRatio = rect.width / viewBox.width;
  const yRatio = rect.height / viewBox.height;
  const toPoint = (x: number, y: number) => [
    toPdfX(space, rect.left + (x - viewBox.minX) * xRatio),
    toPdfY(space, rect.top + (y - viewBox.minY) * yRatio),
  ];

  pdf.setDrawColor(stroke);

  for (let index = 2; index < points.length; index += 2) {
    const [x1, y1] = toPoint(points[index - 2], points[index - 1]);
    const [x2, y2] = toPoint(points[index], points[index + 1]);
    pdf.line(x1, y1, x2, y2);
  }
}

function renderPdfSvgs(pdf: JsPdf, space: PdfPageSpace) {
  const svgs = Array.from(space.element.querySelectorAll<SVGSVGElement>('svg'));

  for (const svg of svgs) {
    if (!isVisibleElement(svg)) continue;

    for (const path of Array.from(svg.querySelectorAll<SVGPathElement>('path'))) {
      renderSvgPath(pdf, space, svg, path);
    }

    for (const line of Array.from(svg.querySelectorAll<SVGLineElement>('line'))) {
      renderSvgLine(pdf, space, svg, line);
    }

    for (const polyline of Array.from(svg.querySelectorAll<SVGPolylineElement>('polyline'))) {
      renderSvgPolyline(pdf, space, svg, polyline);
    }
  }
}

function renderPdfText(pdf: JsPdf, space: PdfPageSpace) {
  const walker = document.createTreeWalker(space.element, NodeFilter.SHOW_TEXT, {
    acceptNode: textNodeFilter,
  });

  let node = walker.nextNode();
  while (node) {
    renderTextNode(pdf, space, node as Text);
    node = walker.nextNode();
  }
}

function pageSpace(element: HTMLElement): PdfPageSpace {
  const rect = element.getBoundingClientRect();

  return {
    element,
    rect,
    xScale: PDF_PAGE.width / rect.width,
    yScale: PDF_PAGE.height / rect.height,
  };
}

export async function downloadResumePdf() {
  await document.fonts.ready;

  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ format: 'letter', orientation: 'portrait', unit: 'pt' });
  const { cleanup, pages } = await createPdfSourcePages();

  try {
    pages.forEach((page, index) => {
      if (index > 0) pdf.addPage();

      const space = pageSpace(page);
      renderPdfRules(pdf, space);
      renderPdfSvgs(pdf, space);
      renderPdfText(pdf, space);
    });
  } finally {
    cleanup();
  }

  pdf.save(RESUME_PDF_FILENAME);
}
