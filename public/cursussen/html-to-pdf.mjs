#!/usr/bin/env node
/**
 * Generate a PDF from a course HTML file using Puppeteer.
 * Generates a cover page first, then the content pages, then merges them.
 * Uses a two-pass approach to inject chapter page numbers into the TOC.
 *
 * Usage: node html-to-pdf.mjs <input.html> <output.pdf> <accentColor> <categoryName> <courseTitle> <iconSvg>
 *
 * iconSvg should be "shield" or "heart" etc.
 */

import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { writeFileSync, readFileSync, unlinkSync, statSync } from 'fs';
import { PDFDocument, PDFName } from 'pdf-lib';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const [,, inputPath, outputPath, accentColor, categoryName, courseTitle, iconName] = process.argv;

if (!inputPath || !outputPath || !accentColor || !categoryName || !courseTitle) {
  console.error('Usage: node html-to-pdf.mjs <input.html> <output.pdf> <accentColor> <categoryName> <courseTitle> [iconName]');
  process.exit(1);
}

const fileUrl = `file://${resolve(inputPath)}`;

// Lucide icon SVG paths (cover size: 80px)
function makeIcon(paths, size = 80) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

const ICON_PATHS = {
  shield: `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`,
  heart: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  eye: `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>`,
  waves: `<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>`,
  sprout: `<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>`,
  refreshcw: `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>`,
  brain: `<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>`,
};

const resolvedIconName = iconName?.toLowerCase() || 'shield';
const iconPaths = ICON_PATHS[resolvedIconName] || ICON_PATHS.shield;
const iconSvg = makeIcon(iconPaths, 80);
const headerIconSvg = makeIcon(iconPaths, 11);

// Subtitle from markdown h3 (the line after the title)
const htmlContent = readFileSync(resolve(inputPath), 'utf-8');
const subtitleMatch = htmlContent.match(/<h3>(.*?)<\/h3>/);
const subtitle = subtitleMatch ? subtitleMatch[1] : '';

// ── Cover page HTML ──────────────────────────────────────────────────────────
const coverHtml = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html {
    background: #0f172a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    background: #0f172a;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #fff;
    position: relative;
    overflow: hidden;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
  .category {
    font-size: 11pt;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 50px;
  }
  .title {
    font-size: 32pt;
    font-weight: 800;
    text-align: center;
    line-height: 1.2;
    max-width: 500px;
    margin-bottom: 16px;
  }
  .subtitle {
    font-size: 12pt;
    color: #94a3b8;
    text-align: center;
    max-width: 420px;
    line-height: 1.5;
  }
  .footer {
    position: absolute;
    bottom: 60px;
    text-align: center;
  }
  .footer-brand {
    font-size: 11pt;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 4px;
  }
  .footer-url {
    font-size: 9pt;
    color: #475569;
  }
</style>
</head>
<body>
  <div class="icon-wrapper">${iconSvg}</div>
  <div class="category">${categoryName}</div>
  <div class="title">${courseTitle}</div>
  <div class="subtitle">${subtitle}</div>
  <div class="footer">
    <div class="footer-brand">De Vader Coach</div>
    <div class="footer-url">devadercoach.nl</div>
  </div>
</body>
</html>`;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Header / Footer templates ────────────────────────────────────────────────
// Padding left/right must match content margins (80px) so header aligns with text
const headerIconSvgInline = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px;">${iconPaths}</svg>`;

const headerTemplate = `
<div style="width:100%;font-size:7.5pt;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:8px 80px 0 80px;display:flex;justify-content:space-between;color:#999;margin:0;">
  <span style="font-weight:600;">${headerIconSvgInline} ${categoryName}</span>
  <span style="color:#666;">${courseTitle}</span>
</div>`;

const footerTemplate = `
<div style="width:100%;font-size:7.5pt;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:0 80px 10px 80px;display:flex;justify-content:space-between;color:#bbb;margin:0;">
  <span>devadercoach.nl</span>
  <span><span class="pageNumber"></span></span>
</div>`;

// ── Find chapter page numbers using pdftotext ────────────────────────────────
function findChapterPages(pdfPath) {
  const tmpTextPath = join(tmpdir(), `course-text-${Date.now()}.txt`);
  try {
    // Extract text with page layout from each page
    const totalPagesStr = execSync(`pdftotext -layout "${pdfPath}" - | grep -c "^\\f" || echo "0"`, { encoding: 'utf-8' }).trim();

    // Get total page count from pdf-lib (more reliable)
    // Instead, extract text per page by using pdftotext page-by-page
    const pdfBytes = readFileSync(pdfPath);

    // Use pdftotext to extract all text, pages separated by form feeds
    execSync(`pdftotext -layout "${pdfPath}" "${tmpTextPath}"`, { encoding: 'utf-8' });
    const fullText = readFileSync(tmpTextPath, 'utf-8');

    // Split by form feed character (page separator)
    const pages = fullText.split('\f');

    const chapterPages = {};
    pages.forEach((pageText, idx) => {
      const pageNum = idx + 1; // 1-indexed
      // Look for "Hoofdstuk N:" at the start of a line
      const match = pageText.match(/Hoofdstuk\s+(\d+):/);
      if (match) {
        const chapterNum = parseInt(match[1]);
        // Only record the first page where this chapter appears
        if (!chapterPages[chapterNum]) {
          chapterPages[chapterNum] = pageNum;
        }
      }
    });

    return { chapterPages, totalContentPages: pages.length };
  } finally {
    try { unlinkSync(tmpTextPath); } catch {}
  }
}

// ── Heading wrapping logic (runs in page.evaluate) ──────────────────────────
async function applyHeadingWrapping(page) {
  await page.evaluate(() => {
    // Budget: ~60% of usable page height (943px with A4 margins)
    const MAX_WRAPPER = 550;

    // Check if an element is a "sub-heading" that should start its own group
    function isSubHeading(el) {
      if (!el || el.tagName !== 'P') return false;
      const strong = el.querySelector('strong');
      if (!strong) return false;
      const text = el.textContent.trim();
      const strongText = strong.textContent.trim();
      return text === strongText && strongText.length < 100;
    }

    // Check if an element is a question or label that starts a new section
    function isQuestionOrLabel(el) {
      if (!el || el.tagName !== 'P') return false;
      const text = el.textContent.trim();
      if (text.endsWith('?') && text.length < 150) return true;
      if (text.endsWith(':') && text.length < 100) return true;
      return false;
    }

    function keepWithNext(el) {
      const next = el.nextElementSibling;
      if (!next) return;
      if (next.matches('h1.chapter-heading')) return;

      el.style.pageBreakAfter = 'avoid';
      el.style.breakAfter = 'avoid';
      next.style.pageBreakBefore = 'avoid';
      next.style.breakBefore = 'avoid';

      const exerciseBlock = el.closest('.exercise-block');
      if (exerciseBlock && !exerciseBlock.contains(next)) return;
      if (next.matches('h1, h2, h3, h4, hr')) return;

      const elHeight = el.offsetHeight || 0;
      const nextHeight = next.offsetHeight || 0;
      const combined = elHeight + nextHeight;

      if (combined < MAX_WRAPPER) {
        const wrapper = document.createElement('div');
        wrapper.style.pageBreakInside = 'avoid';
        wrapper.style.breakInside = 'avoid';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.appendChild(next);

        let total = combined;
        let extra = wrapper.nextElementSibling;
        while (extra && total < MAX_WRAPPER) {
          if (extra.matches('h1, h2, h3, h4, hr')) break;
          if (extra.classList.contains('exercise-block')) break;
          if (exerciseBlock && !exerciseBlock.contains(extra)) break;
          // Don't absorb sub-headings or questions — they start new groups
          if (isSubHeading(extra)) break;
          if (isQuestionOrLabel(extra)) break;
          const h = extra.offsetHeight || 0;
          if (total + h > MAX_WRAPPER) break;
          const nextExtra = extra.nextElementSibling;
          wrapper.appendChild(extra);
          total += h;
          extra = nextExtra;
        }
      }
    }

    // 1. All h2/h3 headings (except TOC, chapter, werkblad, bronnen)
    document.querySelectorAll('h2, h3').forEach(h => {
      if (h.closest('.toc-section')) return;
      if (h.classList.contains('chapter-heading')) return;
      if (h.classList.contains('werkblad-heading') || h.classList.contains('bronnen-heading')) return;
      if (h.parentElement && h.parentElement.style.pageBreakInside === 'avoid') return;
      keepWithNext(h);
    });

    // 2. Bold-only paragraphs (sub-headings)
    document.querySelectorAll('p').forEach(p => {
      if (p.parentElement && p.parentElement.style.pageBreakInside === 'avoid') return;
      if (p.closest('.toc-section') || p.closest('.styled-box')) return;
      if (!isSubHeading(p)) return;
      keepWithNext(p);
    });

    // 3. Question/prompt paragraphs followed by fill-in lines or tables
    document.querySelectorAll('p').forEach(p => {
      if (p.parentElement && p.parentElement.style.pageBreakInside === 'avoid') return;
      if (p.closest('.toc-section') || p.closest('.styled-box')) return;
      if (!isQuestionOrLabel(p)) return;
      const next = p.nextElementSibling;
      if (!next) return;
      const isFillNext = next.classList.contains('fill-line-p');
      if (isFillNext || next.tagName === 'TABLE') {
        keepWithNext(p);
      }
    });

    // 4. Keep tables together with trailing fill-line paragraphs (e.g. "Totaal: ...")
    document.querySelectorAll('table').forEach(table => {
      if (table.parentElement && table.parentElement.style.pageBreakInside === 'avoid') return;
      let next = table.nextElementSibling;
      if (!next) return;
      const isTrailing = next.classList.contains('fill-line-p') ||
        (next.tagName === 'P' && next.textContent.trim().length < 80 &&
         (next.textContent.includes('Totaal') || next.textContent.includes('totaal')));
      if (isTrailing) {
        const tableH = table.offsetHeight || 0;
        const nextH = next.offsetHeight || 0;
        if (tableH + nextH < MAX_WRAPPER) {
          const wrapper = document.createElement('div');
          wrapper.style.pageBreakInside = 'avoid';
          wrapper.style.breakInside = 'avoid';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
          wrapper.appendChild(next);
        }
      }
    });

    // 5. Exercise blocks: keep small ones together
    document.querySelectorAll('.exercise-block').forEach(block => {
      const h = block.offsetHeight || 0;
      if (h < 700) {
        block.style.pageBreakInside = 'avoid';
        block.style.breakInside = 'avoid';
      }
    });
  });
}

// ── Generate content PDF ─────────────────────────────────────────────────────
async function generateContentPdf(browser, url) {
  const contentPage = await browser.newPage();
  await contentPage.goto(url, { waitUntil: 'networkidle0' });

  // Apply heading wrapping so page numbers match the final output
  await applyHeadingWrapping(contentPage);

  const contentPdfBytes = await contentPage.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin: {
      top: '100px',
      bottom: '80px',
      left: '80px',
      right: '80px',
    },
  });
  await contentPage.close();
  return contentPdfBytes;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function generatePDF() {
  console.log(`Generating PDF from ${inputPath}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Generate cover page PDF
  console.log('  Generating cover page...');
  const coverPage = await browser.newPage();
  await coverPage.setContent(coverHtml, { waitUntil: 'networkidle0' });
  const coverPdfBytes = await coverPage.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
  });
  await coverPage.close();

  // 2. First pass: generate content PDF to determine chapter page numbers
  console.log('  Pass 1: generating content PDF for page number detection...');
  const firstPassBytes = await generateContentPdf(browser, fileUrl);

  // Save temporary PDF for text extraction
  const tmpPdfPath = join(tmpdir(), `course-pass1-${Date.now()}.pdf`);
  writeFileSync(tmpPdfPath, firstPassBytes);

  // Find chapter start pages
  const { chapterPages, totalContentPages } = findChapterPages(tmpPdfPath);
  console.log('  Chapter pages found:', chapterPages);

  // Calculate page ranges (chapter N starts at page X, ends at page before chapter N+1)
  const chapterNums = Object.keys(chapterPages).map(Number).sort((a, b) => a - b);
  const chapterRanges = {};
  for (let i = 0; i < chapterNums.length; i++) {
    const num = chapterNums[i];
    const startPage = chapterPages[num];
    const endPage = i < chapterNums.length - 1
      ? chapterPages[chapterNums[i + 1]] - 1
      : totalContentPages;
    chapterRanges[num] = { start: startPage, end: endPage };
  }
  console.log('  Chapter ranges:', chapterRanges);

  // Clean up temp file
  try { unlinkSync(tmpPdfPath); } catch {}

  // 3. Second pass: inject page numbers into TOC and regenerate
  console.log('  Pass 2: injecting TOC page numbers and regenerating...');
  const contentPage = await browser.newPage();
  await contentPage.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Inject page numbers into TOC list items
  await contentPage.evaluate((ranges) => {
    const tocSection = document.querySelector('.toc-section');
    if (!tocSection) return;

    const listItems = tocSection.querySelectorAll('ol li');
    listItems.forEach((li, idx) => {
      const chapterNum = idx + 1;
      const range = ranges[chapterNum];
      if (range) {
        // Add page number span
        const pageSpan = document.createElement('span');
        pageSpan.className = 'toc-page-num';
        pageSpan.textContent = range.start === range.end
          ? `${range.start}`
          : `${range.start}`;
        li.appendChild(pageSpan);
      }
    });
  }, chapterRanges);

  // Apply heading wrapping (same logic as pass 1 for consistent page numbers)
  await applyHeadingWrapping(contentPage);

  const contentPdfBytes = await contentPage.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin: {
      top: '100px',
      bottom: '80px',
      left: '80px',
      right: '80px',
    },
  });
  await contentPage.close();
  await browser.close();

  // 4. Merge cover + content using pdf-lib
  console.log('  Merging cover + content...');
  const coverDoc = await PDFDocument.load(coverPdfBytes);
  const contentDoc = await PDFDocument.load(contentPdfBytes);
  const mergedDoc = await PDFDocument.create();

  // Copy cover page
  const [coverPg] = await mergedDoc.copyPages(coverDoc, [0]);
  mergedDoc.addPage(coverPg);

  // Copy all content pages
  const contentPageIndices = contentDoc.getPageIndices();
  for (const idx of contentPageIndices) {
    const [pg] = await mergedDoc.copyPages(contentDoc, [idx]);
    mergedDoc.addPage(pg);
  }

  // Set page labels so PDF viewer page numbers match footer numbers
  // Cover page (index 0) gets no number, content pages start at 1
  const ctx = mergedDoc.context;
  const numsArray = ctx.obj([]);
  // Cover: index 0, empty label (no page number shown in viewer)
  numsArray.push(ctx.obj(0));
  const coverLabel = ctx.obj({});
  coverLabel.set(PDFName.of('P'), ctx.obj(' '));
  numsArray.push(coverLabel);
  // Content: index 1+, decimal numbering starting at 1
  numsArray.push(ctx.obj(1));
  const contentLabel = ctx.obj({});
  contentLabel.set(PDFName.of('S'), PDFName.of('D'));
  contentLabel.set(PDFName.of('St'), ctx.obj(1));
  numsArray.push(contentLabel);
  const pageLabelsDict = ctx.obj({});
  pageLabelsDict.set(PDFName.of('Nums'), numsArray);
  mergedDoc.catalog.set(PDFName.of('PageLabels'), pageLabelsDict);

  // Remove trailing blank page: check with pdftotext if last page is empty
  const totalPages = mergedDoc.getPageCount();
  try {
    const tmpPath = join(tmpdir(), `check-${Date.now()}.pdf`);
    const tmpBytes = await mergedDoc.save();
    writeFileSync(tmpPath, tmpBytes);
    const lastPageText = execSync(
      `pdftotext -f ${totalPages} -l ${totalPages} -layout "${tmpPath}" - 2>/dev/null`,
      { encoding: 'utf-8', timeout: 5000 }
    ).trim().replace(/\f/g, '');
    // Remove header/footer artifacts (page numbers, site name, category)
    const cleanText = lastPageText.split('\n')
      .map(l => l.trim())
      .filter(l => l && !/^\d+$/.test(l) && l !== 'devadercoach.nl' && l.length > 5)
      .join('');
    if (cleanText.length === 0) {
      mergedDoc.removePage(totalPages - 1);
    }
    unlinkSync(tmpPath);
  } catch (e) {
    // If pdftotext fails, keep the page
  }

  const mergedBytes = await mergedDoc.save();
  writeFileSync(resolve(outputPath), mergedBytes);

  const finalPages = mergedDoc.getPageCount();
  const size = statSync(resolve(outputPath)).size;
  console.log(`Created ${outputPath} (${(size / 1024).toFixed(0)} KB, ${finalPages} pages)`);
}

generatePDF().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
