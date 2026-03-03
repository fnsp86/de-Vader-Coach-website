#!/usr/bin/env node
/**
 * Convert a course markdown file to a styled HTML file for PDF generation.
 * Usage: node scripts/md-to-html.mjs <input.md> <output.html> <accentColor> <courseTitle> <categoryName>
 */

import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';

const [,, inputPath, outputPath, accentColor, courseTitle, categoryName] = process.argv;

if (!inputPath || !outputPath || !accentColor || !courseTitle || !categoryName) {
  console.error('Usage: node scripts/md-to-html.mjs <input.md> <output.html> <accentColor> <courseTitle> <categoryName>');
  process.exit(1);
}

const md = readFileSync(inputPath, 'utf-8');

// Pre-process: convert styled code blocks to styled boxes
let processed = md;

// Convert ``` blocks with ╔═╗ borders to styled-box divs (KERNGEDACHTE, GRENSFORMULE, etc.)
processed = processed.replace(
  /```\n╔[═]+╗\n([\s\S]*?)╚[═]+╝\n```/g,
  (_, innerContent) => {
    const lines = innerContent
      .split('\n')
      .map(l => l.replace(/^[║╠]\s?/, '').replace(/\s*[║╣]$/, ''))
      .filter(l => l.trim().length > 0 && !/^[═]+$/.test(l.trim()));
    const title = lines[0]?.trim() || '';
    const bodyLines = lines.slice(1);
    const hasBoxChars = bodyLines.some(l => /[│┌┘└├┤┬┴┼]/.test(l));
    let bodyHtml;
    if (hasBoxChars) {
      bodyHtml = `<pre class="ascii-art">${bodyLines.join('\n')}</pre>`;
    } else {
      bodyHtml = bodyLines.map(l => l.trim()).join('<br>');
    }
    return `<div class="styled-box" data-title="${title}">\n<div class="styled-box-title">${title}</div>\n<div class="styled-box-body">\n${bodyHtml}\n</div>\n</div>`;
  }
);

// Convert remaining code blocks that look like boxed content (NOODKAART etc.)
processed = processed.replace(
  /```\n(┌[─]+┐\n([\s\S]*?)└[─]+┘)\n```/g,
  (_, _full, bodyContent) => {
    const lines = bodyContent.split('\n')
      .map(l => l.replace(/^│\s?/, '').replace(/\s*│$/, ''))
      .filter(l => l.trim().length > 0);
    const title = lines[0]?.trim() || '';
    const bodyLines = lines.slice(1);
    const hasBoxChars = bodyLines.some(l => /[│┌┘└├┤┬┴┼]/.test(l));
    let bodyHtml;
    if (hasBoxChars) {
      bodyHtml = `<pre class="ascii-art">${bodyLines.join('\n')}</pre>`;
    } else {
      bodyHtml = bodyLines.map(l => l.trim()).join('<br>');
    }
    return `<div class="styled-box" data-title="${title}">\n<div class="styled-box-title">${title}</div>\n<div class="styled-box-body">\n${bodyHtml}\n</div>\n</div>`;
  }
);

// Convert code blocks with +---+ borders to styled-box divs
processed = processed.replace(
  /```\n(\+[-]+\+\n([\s\S]*?)\+[-]+\+)\n```/g,
  (_, _full, bodyContent) => {
    const lines = bodyContent.split('\n')
      .map(l => l.replace(/^\|\s?/, '').replace(/\s*\|$/, ''))
      .filter(l => l.trim().length > 0 && !/^\+[-]+\+$/.test(l.trim()));
    const title = lines[0]?.trim() || '';
    const bodyLines = lines.slice(1);
    const bodyHtml = bodyLines.map(l => l.trim()).join('<br>');
    return `<div class="styled-box" data-title="${title}">\n<div class="styled-box-title">${title}</div>\n<div class="styled-box-body">\n${bodyHtml}\n</div>\n</div>`;
  }
);

// Convert other code blocks (like email templates) to pre blocks
processed = processed.replace(
  /```\n((?!╔|┌|\+[-])[\s\S]*?)```/g,
  (_, content) => `<pre><code>${content.trim()}</code></pre>`
);

// Convert ✅ emoji to styled accent checkmarks
processed = processed.replace(/✅/g, '<span class="check-accent">✓</span>');

// Convert checkbox markers
processed = processed.replace(/☐/g, '<span class="checkbox"></span>');

// Convert fill lines (sequences of dots)
processed = processed.replace(
  /^(\.{20,})$/gm,
  '<p class="fill-line-p"><span class="fill-line"></span></p>'
);

// Also handle fill lines within table cells
processed = processed.replace(
  /\| \.{10,} \|/g,
  '| <span class="fill-line"></span> |'
);

// Configure marked
marked.setOptions({
  breaks: false,
  gfm: true,
});

// Convert markdown to HTML
let html = marked.parse(processed);

// Post-process: hide everything before "Over deze cursus" (title, subtitle, tagline, hrs)
// These are shown on the cover page instead
html = html.replace(
  /^([\s\S]*?)(<h2>Over deze cursus<\/h2>)/,
  '<div class="cover-content" style="display:none;">$1</div>\n$2'
);

// Post-process: add chapter-heading class to h1 elements that start with "Hoofdstuk"
html = html.replace(
  /<h1>(Hoofdstuk \d+:.*?)<\/h1>/g,
  '<h1 class="chapter-heading">$1</h1>'
);

// Post-process: remove HR elements immediately before chapter headings (prevents empty gap pages)
html = html.replace(
  /<hr\s*\/?>\s*\n\s*<h1 class="chapter-heading">/g,
  '<h1 class="chapter-heading">'
);

// Post-process: add exercise-heading class to h3 elements that start with "Oefening"
html = html.replace(
  /<h3>(Oefening \d+\.\d+[\s:–\-].*?)<\/h3>/g,
  '<h3 class="exercise-heading">$1</h3>'
);

// Post-process: add werkblad-heading class to h2 elements starting with "Werkblad"
html = html.replace(
  /<h2>(Werkblad \d+[\s:–\-].*?)<\/h2>/g,
  '<h2 class="werkblad-heading">$1</h2>'
);

// Post-process: add bronnen-heading class to h2 "Wetenschappelijke bronnen" sections
html = html.replace(
  /<h2>(Wetenschappelijke [Bb]ronnen.*?)<\/h2>/g,
  '<h2 class="bronnen-heading">$1</h2>'
);

// Post-process: also handle "Nederlandse organisaties" as a bronnen section
html = html.replace(
  /<h2>(Nederlandse organisaties.*?)<\/h2>/g,
  '<h2 class="bronnen-heading">$1</h2>'
);

// Post-process: wrap TOC section
html = html.replace(
  /<h2>Inhoudsopgave<\/h2>/,
  '<div class="toc-section"><h2>Inhoudsopgave</h2>'
);
// Remove HR immediately before toc-section (prevents empty gap page)
html = html.replace(
  /<hr\s*\/?>\s*\n\s*<div class="toc-section">/g,
  '<div class="toc-section">'
);
// Close TOC section after the </ol>
html = html.replace(
  /(<div class="toc-section">[\s\S]*?<\/ol>)/,
  '$1</div>'
);

// Post-process: add styled-quote class to blockquotes
html = html.replace(/<blockquote>/g, '<blockquote class="styled-quote">');

// Post-process: make remaining fill lines work (in case they survived as paragraph text)
html = html.replace(
  /\.{20,}/g,
  '<span class="fill-line"></span>'
);

// Post-process: wrap exercise blocks in divs for page break control
{
  const lines = html.split('\n');
  const result = [];
  let inExercise = false;

  for (const line of lines) {
    const isExerciseHeading = line.includes('<h3 class="exercise-heading">');
    const isSectionBreak = !isExerciseHeading && (
      /<h[123][^>]*>/.test(line) ||
      /<hr/.test(line) ||
      line.includes('<div class="toc-section">')
    );

    // Close exercise block if we hit a section break or a new exercise
    if (inExercise && (isSectionBreak || isExerciseHeading)) {
      result.push('</div>');
      inExercise = false;
    }

    // Open exercise block
    if (isExerciseHeading) {
      result.push('<div class="exercise-block">');
      inExercise = true;
    }

    result.push(line);
  }

  if (inExercise) {
    result.push('</div>');
  }

  html = result.join('\n');
}

// Build accent color variants
const accentRgb = hexToRgb(accentColor);
const accentBg = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.08)`;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

const fullHtml = `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${courseTitle} - De Vader Coach</title>
    <style>

    @page {
        size: A4;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 12pt;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #333;
        line-height: 1.65;
        counter-reset: page-counter;
    }

    .cover-page {
        display: none !important;
    }

    .content-wrapper {
        padding-top: 0;
    }

    .page-break {
        page-break-after: always;
        break-after: page;
    }

    /* ============================
       TYPOGRAPHY
       ============================ */

    h1.doc-title {
        display: none !important;
    }

    h1.chapter-heading {
        font-size: 22pt;
        font-weight: 700;
        color: ${accentColor};
        margin-top: 0;
        margin-bottom: 8px;
        padding-bottom: 10px;
        border-bottom: 3px solid ${accentColor};
        page-break-before: always;
        break-before: page;
        line-height: 1.3;
    }

    h2 {
        font-size: 15pt;
        font-weight: 700;
        color: #000;
        margin-top: 28px;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid #e0e0e0;
        line-height: 1.35;
    }

    h3 {
        font-size: 12pt;
        font-weight: 700;
        color: ${accentColor};
        margin-top: 22px;
        margin-bottom: 6px;
        line-height: 1.4;
    }

    h3.exercise-heading {
        color: ${accentColor};
        font-size: 12pt;
        font-weight: 700;
        margin-top: 26px;
        margin-bottom: 10px;
        padding: 6px 0;
        border-bottom: 1px dashed ${accentColor};
    }

    p {
        margin-bottom: 8px;
        orphans: 3;
        widows: 3;
    }

    strong {
        color: #000;
        font-weight: 700;
    }

    em {
        font-style: italic;
    }

    a {
        color: ${accentColor};
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    /* ============================
       HORIZONTAL RULES
       ============================ */
    hr {
        border: none;
        border-top: 1px solid #e0e0e0;
        margin: 16px 0;
    }

    /* ============================
       LISTS
       ============================ */
    ul, ol {
        margin-left: 22px;
        margin-bottom: 10px;
    }

    li {
        margin-bottom: 4px;
    }

    li > ul, li > ol {
        margin-top: 4px;
    }

    /* ============================
       TABLES
       ============================ */
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 9.5pt;
        page-break-inside: avoid;
        table-layout: fixed;
    }

    thead th, tbody td {
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    thead th {
        background: ${accentColor};
        color: #fff;
        font-weight: 600;
        padding: 10px 12px;
        text-align: left;
        font-size: 9pt;
    }

    thead th:first-child {
        border-radius: 4px 0 0 0;
    }

    thead th:last-child {
        border-radius: 0 4px 0 0;
    }

    tbody td {
        padding: 9px 12px;
        border-bottom: 1px solid #e8e8e8;
        vertical-align: top;
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9fc;
    }

    tbody tr:nth-child(odd) {
        background-color: #fff;
    }

    tbody tr:last-child td:first-child {
        border-radius: 0 0 0 4px;
    }

    tbody tr:last-child td:last-child {
        border-radius: 0 0 4px 0;
    }

    /* ============================
       BLOCKQUOTES
       ============================ */
    blockquote, blockquote.styled-quote {
        border-left: 3px solid ${accentColor};
        background: ${accentBg};
        padding: 14px 18px;
        margin: 16px 0;
        border-radius: 0 6px 6px 0;
        font-style: italic;
        color: #444;
        page-break-inside: avoid;
    }

    blockquote p {
        margin-bottom: 0;
    }

    .blockquote-attribution {
        font-style: normal;
        font-weight: 700;
        color: #555;
        display: inline;
    }

    /* ============================
       STYLED BOXES
       ============================ */
    .styled-box {
        background: ${accentBg};
        border: 1px solid rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.18);
        border-left: 4px solid ${accentColor};
        border-radius: 0 8px 8px 0;
        padding: 20px 24px;
        margin: 24px 0;
        page-break-inside: avoid;
    }

    .styled-box-title {
        font-weight: 700;
        color: ${accentColor};
        font-size: 10pt;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 2px solid rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.18);
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    .styled-box-body {
        color: #333;
        line-height: 1.65;
        font-size: 10.5pt;
        font-family: inherit;
    }

    .styled-box-body code {
        font-family: inherit;
        background: none;
        padding: 0;
    }

    .styled-box-body pre.ascii-art {
        background: none;
        border: none;
        border-left: none;
        padding: 0;
        margin: 4px 0;
        font-size: 8pt;
        line-height: 1.3;
        color: #444;
        box-shadow: none;
    }

    /* ============================
       ACCENT CHECKMARKS
       ============================ */
    .check-accent {
        color: ${accentColor};
        font-weight: 700;
        font-size: 11pt;
        margin-right: 2px;
    }

    /* ============================
       SECTION & EXERCISE BLOCKS
       ============================ */
    .exercise-block {
        margin-bottom: 8px;
    }

    /* HR after styled-box: replace line with spacing */
    .styled-box + hr {
        border: none;
        margin: 8px 0;
    }

    /* ============================
       WERKBLAD HEADINGS
       ============================ */
    h2.werkblad-heading {
        color: ${accentColor};
        border-bottom: 2px solid ${accentColor};
    }

    h2.bronnen-heading {
        color: ${accentColor};
        border-bottom: 2px solid ${accentColor};
    }

    /* ============================
       FILL-IN LINES
       ============================ */
    .fill-line {
        display: inline-block;
        min-width: 200px;
        border-bottom: 1px solid #999;
        margin: 0 2px;
        vertical-align: baseline;
        height: 1.2em;
    }

    p.fill-line-p {
        margin-bottom: 12px;
    }

    p.fill-line-p .fill-line {
        min-width: 95%;
        display: inline-block;
    }

    /* ============================
       CHECKBOXES
       ============================ */
    .checkbox {
        display: inline-block;
        width: 13px;
        height: 13px;
        border: 1.5px solid #888;
        border-radius: 2px;
        margin-right: 6px;
        vertical-align: middle;
        position: relative;
        top: -1px;
    }

    /* ============================
       DIALOGUE
       ============================ */
    p.dialogue {
        padding-left: 20px;
        margin-bottom: 4px;
    }

    p.dialogue-block {
        padding-left: 20px;
        margin-bottom: 10px;
        line-height: 1.8;
    }

    .speaker {
        color: #000;
        font-weight: 700;
    }

    /* ============================
       CODE BLOCKS
       ============================ */
    code {
        font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        font-size: 9pt;
        background: #f5f5f5;
        padding: 1px 4px;
        border-radius: 3px;
    }

    pre {
        background: ${accentBg};
        border: 1px solid rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15);
        border-left: 3px solid ${accentColor};
        padding: 16px 20px;
        border-radius: 0 6px 6px 0;
        overflow-x: auto;
        margin: 16px 0;
        font-size: 9pt;
        line-height: 1.5;
    }

    pre code {
        background: none;
        padding: 0;
    }

    /* ============================
       TOC SECTION
       ============================ */
    .toc-section {
        page-break-before: always;
        break-before: page;
    }

    .toc-section h2 {
        color: ${accentColor};
        font-size: 17pt;
        border-bottom: 3px solid ${accentColor};
        padding-bottom: 8px;
    }

    .toc-section ol {
        list-style: none;
        counter-reset: toc-counter;
        margin-left: 0;
        padding-left: 0;
    }

    .toc-section ol li {
        counter-increment: toc-counter;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 10.5pt;
        display: flex;
        align-items: baseline;
    }

    .toc-section ol li::before {
        content: counter(toc-counter) ".";
        color: ${accentColor};
        font-weight: 700;
        margin-right: 10px;
        min-width: 24px;
        flex-shrink: 0;
    }

    .toc-page-num {
        margin-left: auto;
        flex-shrink: 0;
        color: #999;
        font-size: 9.5pt;
        padding-left: 8px;
    }

    .running-header, .running-footer {
        display: none !important;
    }

    /* ============================
       PRINT SPECIFIC
       ============================ */
    @media print {
        body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }

        h1.chapter-heading {
            page-break-before: always;
            break-before: page;
        }

        h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
        }

        /* Keep headings with their following content */
        h2 + p, h2 + ul, h2 + ol, h2 + table, h2 + blockquote, h2 + .styled-box, h2 + pre,
        h3 + p, h3 + ul, h3 + ol, h3 + table, h3 + blockquote, h3 + .styled-box, h3 + pre {
            page-break-before: avoid;
            break-before: avoid;
        }

        table {
            page-break-inside: avoid;
        }

        .styled-box {
            page-break-inside: avoid;
        }

        blockquote {
            page-break-inside: avoid;
        }

        pre {
            page-break-inside: avoid;
        }

        /* Prevent single lines at bottom/top of pages */
        p {
            orphans: 4;
            widows: 4;
        }

        li {
            page-break-inside: avoid;
        }

        ul, ol {
            page-break-inside: avoid;
        }

        /* Exercise blocks: allow breaking across pages (heading-wrapping in PDF handles keeping heading with first content) */
        .exercise-block {
            /* no page-break-inside: avoid — large exercises caused empty pages */
        }

        h3.exercise-heading {
            page-break-after: avoid;
            break-after: avoid;
        }

        /* Werkblad headings: start on new page */
        h2.werkblad-heading {
            page-break-before: always;
            break-before: page;
        }

        /* Bronnen headings: start on new page */
        h2.bronnen-heading {
            page-break-before: always;
            break-before: page;
        }

        /* Keep fill-line blocks together */
        p.fill-line-p {
            page-break-inside: avoid;
        }

        /* Keep strong/bold paragraphs with following content (often labels) */
        p > strong:only-child {
            page-break-after: avoid;
            break-after: avoid;
        }

        /* Cover content is hidden */
        .cover-content {
            display: none !important;
        }
    }

    </style>
</head>
<body>
    <div class="running-header">
        <span class="header-left"><span class="header-dot">&#9679;</span> ${categoryName}</span>
        <span class="header-right">${courseTitle}</span>
    </div>
    <div class="running-footer">
        <span class="footer-left">devadercoach.nl</span>
    </div>
    <div class="content-wrapper">
${html}
    </div>
</body>
</html>`;

writeFileSync(outputPath, fullHtml, 'utf-8');
console.log(`Created ${outputPath} (${fullHtml.length} bytes)`);
