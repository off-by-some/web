import { SVGPathData } from 'svg-pathdata';

import type { jsPDF as JsPdf } from 'jspdf';
import type { SVGCommand } from 'svg-pathdata';

type PdfFontStyle = 'normal' | 'bold' | 'italic' | 'bolditalic';
type PdfTextMode = 'dom' | 'flow' | 'pre';

export interface HtmlPdfFont {
  data: string;
  family: string;
  fileName: string;
  style?: PdfFontStyle;
  weight?: number;
}

export interface HtmlPdfOptions {
  fonts?: readonly HtmlPdfFont[];
  pageSize?: 'letter' | 'a4';
}

interface PageSpace {
  element: HTMLElement;
  pageHeight: number;
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

interface PdfOutlineItem {
  children: PdfOutlineItem[];
  options: unknown;
  title: string;
}

interface CssColor {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

interface RegisteredPdfFont {
  family: string;
  normalizedFamily: string;
  style: PdfFontStyle;
  weight: number;
}

function assertPages(pages: HTMLElement[]) {
  if (pages.length === 0) {
    throw new Error('HTML PDF export requires at least one page element.');
  }

  return pages;
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
      return code === 9 || code === 10 || code === 13 || code >= 32;
    })
    .join('');
}

function normalizeCssText(value: string) {
  return normalizePdfText(value.replace(/\s+/g, ' '));
}

function writePdfTextLine(pdf: JsPdf, text: string, x: number, y: number) {
  pdf.text(text, x, y);
}

function transformCssText(text: string, style: CSSStyleDeclaration) {
  if (style.textTransform === 'uppercase') return text.toUpperCase();
  if (style.textTransform === 'lowercase') return text.toLowerCase();
  return text;
}

function toPdfX(space: PageSpace, x: number) {
  return (x - space.rect.left) * space.xScale;
}

function toPdfY(space: PageSpace, y: number) {
  return (y - space.rect.top) * space.yScale;
}

function toPdfWidth(space: PageSpace, width: number) {
  return width * space.xScale;
}

function toPdfHeight(space: PageSpace, height: number) {
  return height * space.yScale;
}

function parsePixelValue(value: string) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Unsupported PDF pixel value: ${value}`);
  }

  return parsed;
}

function parseLineHeight(style: CSSStyleDeclaration, fontSize: number, space: PageSpace) {
  if (style.lineHeight === 'normal') return fontSize * 1.4;

  const parsed = Number.parseFloat(style.lineHeight);
  if (!Number.isFinite(parsed)) return fontSize * 1.4;

  return style.lineHeight.trim().endsWith('px') ? parsed * space.yScale : parsed * fontSize;
}

function parseLength(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function closestPdfTextElement(element: HTMLElement) {
  return element.closest<HTMLElement>('[data-pdf-text]');
}

function pdfTextMode(element: HTMLElement): PdfTextMode {
  const pdfText = closestPdfTextElement(element)?.dataset.pdfText;

  if (pdfText === 'pre') return 'pre';
  return pdfText === 'flow' ? 'flow' : 'dom';
}

function pdfHeadingLevel(element: HTMLElement) {
  const level = Number.parseInt(element.dataset.pdfHeading ?? '', 10);
  return Number.isInteger(level) && level >= 1 && level <= 4 ? level : undefined;
}

function cssColorToHex(color: CssColor) {
  return `#${[color.red, color.green, color.blue]
    .map((channel) =>
      Math.max(0, Math.min(255, Math.round(channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

function mixCssColorOver(
  color: CssColor,
  background: CssColor = { alpha: 1, blue: 255, green: 255, red: 255 },
) {
  if (color.alpha >= 1) return color;

  return {
    alpha: 1,
    blue: color.blue * color.alpha + background.blue * (1 - color.alpha),
    green: color.green * color.alpha + background.green * (1 - color.alpha),
    red: color.red * color.alpha + background.red * (1 - color.alpha),
  };
}

function parseCssColor(value: string): CssColor | undefined {
  const trimmed = value.trim();
  if (!trimmed || trimmed === 'transparent') return undefined;

  if (/^#[\da-f]{3}$/i.test(trimmed)) {
    const [red, green, blue] = trimmed
      .slice(1)
      .split('')
      .map((character) => Number.parseInt(`${character}${character}`, 16));
    return { alpha: 1, blue, green, red };
  }

  if (/^#[\da-f]{6}$/i.test(trimmed)) {
    return {
      alpha: 1,
      blue: Number.parseInt(trimmed.slice(5, 7), 16),
      green: Number.parseInt(trimmed.slice(3, 5), 16),
      red: Number.parseInt(trimmed.slice(1, 3), 16),
    };
  }

  const srgb = /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i.exec(value);
  const rgbChannels =
    value.startsWith('rgb(') || value.startsWith('rgba(')
      ? value
          .slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
          .split(/[,\s/]+/)
          .filter(Boolean)
          .map((channel) =>
            channel.endsWith('%') ? (Number.parseFloat(channel) / 100) * 255 : Number(channel),
          )
      : undefined;
  const channels = srgb
    ? srgb.slice(1, 4).map((channel) => Number.parseFloat(channel) * 255)
    : rgbChannels;
  const alpha = srgb ? Number.parseFloat(srgb[4]) : (rgbChannels?.[3] ?? 1);

  if (!channels || channels.length < 3) {
    return undefined;
  }

  return {
    alpha: Number.isFinite(alpha) ? Math.max(0, Math.min(1, alpha)) : 1,
    blue: channels[2],
    green: channels[1],
    red: channels[0],
  };
}

function parseColor(value: string) {
  const color = parseCssColor(value);
  if (!color) {
    throw new Error(`Unsupported PDF color value: ${value}`);
  }

  return cssColorToHex(mixCssColorOver(color));
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

function cssFontWeight(style: CSSStyleDeclaration) {
  if (style.fontWeight === 'normal') return 400;
  if (style.fontWeight === 'bold') return 700;

  const weight = Number.parseInt(style.fontWeight, 10);
  return Number.isFinite(weight) ? weight : 400;
}

function cssFontFamilies(style: CSSStyleDeclaration) {
  return style.fontFamily
    .split(',')
    .map((family) =>
      family
        .trim()
        .replace(/^["']|["']$/g, '')
        .toLowerCase(),
    )
    .filter(Boolean);
}

function registerPdfFonts(pdf: JsPdf, fonts: readonly HtmlPdfFont[] = []) {
  return fonts.map((font): RegisteredPdfFont => {
    const style = font.style ?? 'normal';
    const weight = font.weight ?? (style === 'bold' || style === 'bolditalic' ? 700 : 400);

    pdf.addFileToVFS(font.fileName, font.data);
    pdf.addFont(font.fileName, font.family, style, weight, 'Identity-H');

    return {
      family: font.family,
      normalizedFamily: font.family.toLowerCase(),
      style,
      weight,
    };
  });
}

function fontMatchScore(
  font: RegisteredPdfFont,
  preferredStyle: PdfFontStyle,
  preferredWeight: number,
) {
  const stylePenalty = font.style === preferredStyle ? 0 : 1000;
  const weightPenalty = Math.abs(font.weight - preferredWeight);

  return stylePenalty + weightPenalty;
}

function pdfFontForStyle(style: CSSStyleDeclaration, fonts: RegisteredPdfFont[]) {
  const families = cssFontFamilies(style);
  const preferredStyle = pdfFontStyle(style);
  const preferredWeight = cssFontWeight(style);

  for (const family of families) {
    const matches = fonts
      .filter((font) => font.normalizedFamily === family)
      .sort(
        (a, b) =>
          fontMatchScore(a, preferredStyle, preferredWeight) -
          fontMatchScore(b, preferredStyle, preferredWeight),
      );

    if (matches.length > 0) return matches[0];
  }

  return undefined;
}

const BUILTIN_PDF_FAMILIES: Record<string, string> = {
  courier: 'courier',
  'courier new': 'courier',
  monospace: 'courier',
  times: 'times',
  'times new roman': 'times',
  serif: 'times',
};

function builtinPdfFamily(style: CSSStyleDeclaration) {
  for (const family of cssFontFamilies(style)) {
    const builtin = BUILTIN_PDF_FAMILIES[family];
    if (builtin) return builtin;
  }

  return 'helvetica';
}

function setPdfFontForStyle(pdf: JsPdf, style: CSSStyleDeclaration, fonts: RegisteredPdfFont[]) {
  const customFont = pdfFontForStyle(style, fonts);

  if (customFont) {
    pdf.setFont(customFont.family, customFont.style, customFont.weight);
    return;
  }

  pdf.setFont(builtinPdfFamily(style), pdfFontStyle(style));
}

function alignedPdfX(
  pdf: JsPdf,
  space: PageSpace,
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

function renderTextDecoration(
  pdf: JsPdf,
  style: CSSStyleDeclaration,
  textX: number,
  textY: number,
  textWidth: number,
  fontSize: number,
) {
  const line = style.textDecorationLine;
  if (!line.includes('line-through') && !line.includes('underline')) return;

  const color = parseColor(
    style.textDecorationColor === 'currentcolor' ? style.color : style.textDecorationColor,
  );
  const thickness = Math.max(0.45, fontSize * 0.065);

  pdf.setDrawColor(color);
  pdf.setLineWidth(thickness);

  if (line.includes('line-through')) {
    const y = textY - fontSize * 0.32;
    pdf.line(textX, y, textX + textWidth, y);
  }

  if (line.includes('underline')) {
    const y = textY + fontSize * 0.12;
    pdf.line(textX, y, textX + textWidth, y);
  }
}

function isVisibleElement(element: Element) {
  const style = getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function hasVisiblePaint(color: CssColor | undefined): color is CssColor {
  return Boolean(color && color.alpha > 0);
}

function withOpacity(color: CssColor, opacityValue: string) {
  const opacity = Number.parseFloat(opacityValue);
  if (!Number.isFinite(opacity)) return color;

  return {
    ...color,
    alpha: color.alpha * Math.max(0, Math.min(1, opacity)),
  };
}

function setPdfFillColor(pdf: JsPdf, color: CssColor) {
  pdf.setFillColor(cssColorToHex(mixCssColorOver(color)));
}

function setPdfDrawColor(pdf: JsPdf, color: CssColor) {
  pdf.setDrawColor(cssColorToHex(mixCssColorOver(color)));
}

function renderBackground(pdf: JsPdf, space: PageSpace, element: HTMLElement) {
  const style = getComputedStyle(element);
  const backgroundColor = parseCssColor(style.backgroundColor);
  const background = backgroundColor ? withOpacity(backgroundColor, style.opacity) : undefined;
  if (!hasVisiblePaint(background)) return;

  setPdfFillColor(pdf, background);

  for (const rect of Array.from(element.getClientRects())) {
    if (rect.width <= 0 || rect.height <= 0) continue;

    const x = toPdfX(space, rect.left);
    const y = toPdfY(space, rect.top);
    const width = toPdfWidth(space, rect.width);
    const height = toPdfHeight(space, rect.height);
    const radius = Math.min(
      width / 2,
      height / 2,
      Math.max(
        parseLength(style.borderTopLeftRadius),
        parseLength(style.borderTopRightRadius),
        parseLength(style.borderBottomRightRadius),
        parseLength(style.borderBottomLeftRadius),
      ) * Math.min(space.xScale, space.yScale),
    );

    if (radius > 0) {
      pdf.roundedRect(x, y, width, height, radius, radius, 'F');
    } else {
      pdf.rect(x, y, width, height, 'F');
    }
  }
}

function renderBorderLine(
  pdf: JsPdf,
  space: PageSpace,
  rect: DOMRect,
  colorValue: string,
  opacityValue: string,
  styleValue: string,
  widthValue: string,
  side: 'block-end' | 'block-start' | 'inline-end' | 'inline-start',
) {
  if (styleValue === 'none' || styleValue === 'hidden') return;

  const width = Number.parseFloat(widthValue);
  const rawColor = parseCssColor(colorValue);
  const color = rawColor ? withOpacity(rawColor, opacityValue) : undefined;
  if (!Number.isFinite(width) || width <= 0 || !hasVisiblePaint(color)) return;

  const lineWidth =
    side === 'inline-start' || side === 'inline-end'
      ? Math.max(0.5, toPdfWidth(space, width))
      : Math.max(0.5, toPdfHeight(space, width));

  setPdfDrawColor(pdf, color);
  pdf.setLineWidth(lineWidth);

  if (side === 'block-start') {
    const y = toPdfY(space, rect.top + width / 2);
    pdf.line(toPdfX(space, rect.left), y, toPdfX(space, rect.right), y);
  } else if (side === 'block-end') {
    const y = toPdfY(space, rect.bottom - width / 2);
    pdf.line(toPdfX(space, rect.left), y, toPdfX(space, rect.right), y);
  } else if (side === 'inline-start') {
    const x = toPdfX(space, rect.left + width / 2);
    pdf.line(x, toPdfY(space, rect.top), x, toPdfY(space, rect.bottom));
  } else {
    const x = toPdfX(space, rect.right - width / 2);
    pdf.line(x, toPdfY(space, rect.top), x, toPdfY(space, rect.bottom));
  }
}

function renderBorders(pdf: JsPdf, space: PageSpace, element: HTMLElement) {
  const style = getComputedStyle(element);

  for (const rect of Array.from(element.getClientRects())) {
    if (rect.width <= 0 || rect.height <= 0) continue;

    renderBorderLine(
      pdf,
      space,
      rect,
      style.borderTopColor,
      style.opacity,
      style.borderTopStyle,
      style.borderTopWidth,
      'block-start',
    );
    renderBorderLine(
      pdf,
      space,
      rect,
      style.borderRightColor,
      style.opacity,
      style.borderRightStyle,
      style.borderRightWidth,
      'inline-end',
    );
    renderBorderLine(
      pdf,
      space,
      rect,
      style.borderBottomColor,
      style.opacity,
      style.borderBottomStyle,
      style.borderBottomWidth,
      'block-end',
    );
    renderBorderLine(
      pdf,
      space,
      rect,
      style.borderLeftColor,
      style.opacity,
      style.borderLeftStyle,
      style.borderLeftWidth,
      'inline-start',
    );
  }
}

function renderElementBoxes(pdf: JsPdf, space: PageSpace) {
  const elements = Array.from(space.element.querySelectorAll<HTMLElement>('*')).filter(
    isVisibleElement,
  );

  for (const element of elements) {
    renderBackground(pdf, space, element);
    renderBorders(pdf, space, element);
  }
}

function textNodeFilter(node: Node) {
  if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;

  const element = node.parentElement;
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

function characterRect(range: Range) {
  const rects = Array.from(range.getClientRects()).filter(
    (rect) => rect.width > 0.01 && rect.height > 0.01,
  );

  if (rects.length === 0) return undefined;

  return rects.reduce((largest, rect) =>
    rect.width * rect.height > largest.width * largest.height ? rect : largest,
  );
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

    // A range can have more than one inline fragment at a line boundary.
    // Its bounding rectangle may span both lines, so use one glyph fragment.
    const rect = characterRect(range);
    if (!rect) {
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

function renderPreTextNode(
  pdf: JsPdf,
  space: PageSpace,
  node: Text,
  element: HTMLElement,
  style: CSSStyleDeclaration,
  flowElement: Element | null,
  fontSize: number,
  link: HTMLAnchorElement | null,
) {
  const rect = (flowElement ?? element).getBoundingClientRect();
  const text = normalizePdfText(node.data).replace(/\t/g, '  ');
  const containerStyle = flowElement ? getComputedStyle(flowElement) : style;
  const paddingInlineStart = parseLength(containerStyle.paddingLeft);
  const paddingInlineEnd = parseLength(containerStyle.paddingRight);
  const paddingBlockStart = parseLength(containerStyle.paddingTop);
  const contentLeft = rect.left + paddingInlineStart;
  const contentTop = rect.top + paddingBlockStart;
  const contentWidth = Math.max(1, rect.width - paddingInlineStart - paddingInlineEnd);
  const lineHeight = parseLineHeight(style, fontSize, space);
  const firstLineY = toPdfY(space, contentTop) + fontSize * 0.82;
  const lines = text
    .split('\n')
    .flatMap(
      (line): string[] =>
        pdf.splitTextToSize(line || ' ', toPdfWidth(space, contentWidth)) as string[],
    );

  lines.forEach((line, index) => {
    const x = toPdfX(space, contentLeft);
    const y = firstLineY + lineHeight * index;
    writePdfTextLine(pdf, line, x, y);
    renderTextDecoration(pdf, style, x, y, pdf.getTextWidth(line), fontSize);
    if (link) {
      pdf.link(x, y - fontSize, pdf.getTextWidth(line), lineHeight, { url: link.href });
    }
  });
}

function renderDefaultTextNode(
  pdf: JsPdf,
  space: PageSpace,
  node: Text,
  style: CSSStyleDeclaration,
  fontSize: number,
  link: HTMLAnchorElement | null,
) {
  for (const line of collectTextLines(node)) {
    const text = transformCssText(line.text.trim(), style);
    if (!text) continue;
    const x = alignedPdfX(pdf, space, line, text, style);
    const y = toPdfY(space, line.bottom) - fontSize * 0.18;
    const textWidth = pdf.getTextWidth(text);
    writePdfTextLine(pdf, text, x, y);
    renderTextDecoration(pdf, style, x, y, textWidth, fontSize);
    if (link) {
      pdf.link(x, toPdfY(space, line.top), textWidth, toPdfHeight(space, line.bottom - line.top), {
        url: link.href,
      });
    }
  }
}

function renderTextNode(pdf: JsPdf, space: PageSpace, node: Text, fonts: RegisteredPdfFont[]) {
  const element = node.parentElement;
  if (!element) return;

  const style = getComputedStyle(element);
  const fontSize = parsePixelValue(style.fontSize) * space.yScale;
  const link = element.closest<HTMLAnchorElement>('a[href]');
  const flowElement = closestPdfTextElement(element);

  setPdfFontForStyle(pdf, style, fonts);
  pdf.setFontSize(fontSize);
  pdf.setTextColor(parseColor(style.color));

  if (pdfTextMode(element) === 'pre') {
    renderPreTextNode(pdf, space, node, element, style, flowElement, fontSize, link);
    return;
  }

  renderDefaultTextNode(pdf, space, node, style, fontSize, link);
}

function renderHorizontalRules(pdf: JsPdf, space: PageSpace) {
  const rules = Array.from(space.element.querySelectorAll<HTMLElement>('[data-horizontal-rule]'));

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

function isVectorImageSource(src: string) {
  return src.startsWith('data:image/svg+xml') || /\.svg(?:[?#]|$)/i.test(src);
}

function imageDataUrl(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  const rect = image.getBoundingClientRect();
  const source = image.currentSrc || image.src;
  const scale = isVectorImageSource(source) ? 4 : 1;
  const width = Math.max(1, image.naturalWidth || Math.round(rect.width * scale));
  const height = Math.max(1, image.naturalHeight || Math.round(rect.height * scale));
  const exportWidth = Math.max(width, Math.round(rect.width * scale));
  const exportHeight = Math.max(height, Math.round(rect.height * scale));
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('HTML PDF export could not create an image canvas.');
  }

  canvas.width = exportWidth;
  canvas.height = exportHeight;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, exportWidth, exportHeight);

  return canvas.toDataURL('image/png');
}

function renderPdfImages(pdf: JsPdf, space: PageSpace) {
  const images = Array.from(space.element.querySelectorAll<HTMLImageElement>('img'));

  for (const image of images) {
    if (!isVisibleElement(image)) continue;

    const rect = image.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;

    pdf.addImage(
      imageDataUrl(image),
      'PNG',
      toPdfX(space, rect.left),
      toPdfY(space, rect.top),
      toPdfWidth(space, rect.width),
      toPdfHeight(space, rect.height),
    );
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
  return operation.c?.every(Number.isFinite) ?? false;
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

function svgCoordinateMapper(space: PageSpace, svg: SVGSVGElement) {
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

function renderSvgPath(pdf: JsPdf, space: PageSpace, svg: SVGSVGElement, path: SVGPathElement) {
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

function renderSvgLine(pdf: JsPdf, space: PageSpace, svg: SVGSVGElement, line: SVGLineElement) {
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
  space: PageSpace,
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

function renderPdfSvgs(pdf: JsPdf, space: PageSpace) {
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

function renderPdfText(pdf: JsPdf, space: PageSpace, fonts: RegisteredPdfFont[]) {
  const walker = document.createTreeWalker(space.element, NodeFilter.SHOW_TEXT, {
    acceptNode: textNodeFilter,
  });

  let node = walker.nextNode();
  while (node) {
    renderTextNode(pdf, space, node as Text, fonts);
    node = walker.nextNode();
  }
}

function renderPdfOutline(pdf: JsPdf, pages: HTMLElement[]) {
  const stack: { item: PdfOutlineItem | null; level: number }[] = [{ item: null, level: 0 }];

  pages.forEach((page, pageIndex) => {
    const headings = Array.from(page.querySelectorAll<HTMLElement>('[data-pdf-heading]'));

    for (const heading of headings) {
      if (!isVisibleElement(heading)) continue;

      const level = pdfHeadingLevel(heading);
      const title = normalizeCssText(heading.textContent).trim();
      if (!level || !title) continue;

      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      const parent = stack[stack.length - 1].item;
      const item = pdf.outline.add(parent, title, { pageNumber: pageIndex + 1 });
      stack.push({ item, level });
    }
  });
}

function pageSpace(pdf: JsPdf, element: HTMLElement): PageSpace {
  const rect = element.getBoundingClientRect();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  return {
    element,
    pageHeight,
    rect,
    xScale: pageWidth / rect.width,
    yScale: pageHeight / rect.height,
  };
}

export async function renderHtmlToPdf(pages: HTMLElement[], options: HtmlPdfOptions = {}) {
  const pdfPages = assertPages(pages);
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    format: options.pageSize ?? 'letter',
    orientation: 'portrait',
    unit: 'pt',
  });
  const fonts = registerPdfFonts(pdf, options.fonts);

  pdfPages.forEach((page, index) => {
    if (index > 0) pdf.addPage();

    const space = pageSpace(pdf, page);
    renderElementBoxes(pdf, space);
    renderHorizontalRules(pdf, space);
    renderPdfImages(pdf, space);
    renderPdfSvgs(pdf, space);
    renderPdfText(pdf, space, fonts);
  });

  renderPdfOutline(pdf, pdfPages);

  return pdf.output('blob');
}
