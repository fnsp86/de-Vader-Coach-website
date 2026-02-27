import { POSTS_LIST, getBlogPost, type BlogPostMeta } from './blog-posts';
import { getAllCourses, type Course } from './courses';
import { EXPERIENCE_DAYS } from './experience';

const HASHTAG_SETS: Record<string, string[]> = {
  Aanwezigheid: ['#aanwezigheid', '#kwaliteitstijd', '#telefoonweg', '#ervoorjekindzijn'],
  Emotiecoaching: ['#emotiecoaching', '#driftbui', '#boosheid', '#gevoelens', '#emoties'],
  Zelfregulatie: ['#zelfregulatie', '#kalmte', '#ademhalen', '#geduld'],
  Grenzen: ['#grenzen', '#grenzenstellen', '#structuur', '#consequent'],
  Autonomie: ['#autonomie', '#loslaten', '#zelfstandigheid', '#vertrouwen'],
  Herstel: ['#herstel', '#sorry', '#foutenmaken', '#vergeven'],
  Verbinding: ['#verbinding', '#tiener', '#puber', '#band'],
  Reflectie: ['#reflectie', '#zelfreflectie', '#bewustzijn', '#patronen'],
};

const GENERAL_HASHTAGS = [
  '#vaderschap',
  '#opvoeden',
  '#vader',
  '#papa',
  '#opvoedtips',
  '#bewustopvoeden',
  '#devadercoach',
];

function getHashtags(category: string): string {
  const specific = HASHTAG_SETS[category] ?? [];
  // Instagram best practice: max 5 hashtags
  const picked = [...specific.slice(0, 3), ...GENERAL_HASHTAGS.slice(0, 2)];
  return picked.slice(0, 5).join(' ');
}

export function extractQuote(content: string): string {
  const lines = content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('*') && l !== '---' && l.length > 20);

  // Prefer short punchy lines
  const punchy = lines.filter((l) => l.length < 120 && l.length > 30);
  return punchy[0] ?? lines[0] ?? '';
}

export function generateBlogCaption(post: BlogPostMeta & { content?: string }): string {
  const hook = post.description;
  const lines = [
    hook,
    '',
    'Lees het hele verhaal via de link in bio.',
    '',
    getHashtags(post.category),
  ];
  return lines.join('\n');
}

export function generateCourseCaption(course: Course): string {
  const points = course.learnPoints
    .slice(0, 3)
    .map((p) => `\u2022 ${p}`)
    .join('\n');
  const lines = [
    course.description,
    '',
    'Wat je leert:',
    points,
    '',
    `${course.pages} pagina\u2019s | ${course.features[1] ?? ''}`,
    '',
    'Meer info via de link in bio.',
    '',
    getHashtags(course.category),
  ];
  return lines.join('\n');
}

export function generateExperienceCaption(day: {
  dag: number;
  title: string;
  subtitle: string;
  skill: string;
  reflection: string;
}): string {
  const lines = [
    `Dag ${day.dag}: ${day.title}`,
    '',
    day.subtitle,
    '',
    `Reflectie: ${day.reflection}`,
    '',
    'Start jouw 22-daagse reis via de link in bio.',
    '',
    getHashtags(day.skill),
  ];
  return lines.join('\n');
}

/* ── Random content generator ── */

export type Template = 'quote' | 'tip' | 'teaser' | 'stat' | 'list' | 'cta' | 'skills';

export interface SlideConfig {
  template: Template;
  text: string;
  color: string;
  skill: string;
  subtitle: string;
  number: string;
  items?: string[]; // for list template
}

export interface RandomContent {
  type: 'blog' | 'cursussen' | 'experience';
  title: string;
  category: string;
  caption: string;
  slides: SlideConfig[];
}

export function generateRandomContent(slideCount: number = 1): RandomContent {
  const sources = [
    ...POSTS_LIST.map((p) => ({ type: 'blog' as const, data: p })),
    ...getAllCourses().map((c) => ({ type: 'cursussen' as const, data: c })),
    ...EXPERIENCE_DAYS.map((d) => ({ type: 'experience' as const, data: d })),
  ];

  const pick = sources[Math.floor(Math.random() * sources.length)];
  const { SKILL_COLORS } = require('./courses');

  if (pick.type === 'blog') {
    const meta = pick.data as BlogPostMeta;
    const full = getBlogPost(meta.slug);
    const quote = full ? extractQuote(full.content) : meta.description;
    const color = SKILL_COLORS[meta.category] ?? '#F59E0B';
    const caption = generateBlogCaption({ ...meta, content: full?.content });

    const slides = buildSlides(slideCount, {
      quote,
      tips: extractTips(full?.content ?? ''),
      title: meta.title,
      subtitle: meta.description,
      skill: meta.category,
      color,
    });

    return { type: 'blog', title: meta.title, category: meta.category, caption, slides };
  }

  if (pick.type === 'cursussen') {
    const course = pick.data as Course;
    const color = SKILL_COLORS[course.category] ?? '#F59E0B';
    const caption = generateCourseCaption(course);

    const slides = buildSlides(slideCount, {
      quote: course.description,
      tips: course.learnPoints,
      title: course.title,
      subtitle: course.longDescription.slice(0, 120) + '...',
      skill: course.category,
      color,
    });

    return { type: 'cursussen', title: course.title, category: course.category, caption, slides };
  }

  // experience
  const day = pick.data as { dag: number; title: string; subtitle: string; skill: string; reflection: string; content: string };
  const color = SKILL_COLORS[day.skill] ?? '#F59E0B';
  const caption = generateExperienceCaption(day);

  const slides = buildSlides(slideCount, {
    quote: day.subtitle,
    tips: extractTips(day.content),
    title: `Dag ${day.dag}: ${day.title}`,
    subtitle: day.reflection,
    skill: day.skill,
    color,
  });

  return { type: 'experience', title: `Dag ${day.dag}: ${day.title}`, category: day.skill, caption, slides };
}

function extractTips(content: string): string[] {
  if (!content) return [];
  const lines = content.split('\n').map((l) => l.trim());
  const tips: string[] = [];
  for (const line of lines) {
    if ((line.startsWith('- ') || line.startsWith('• ')) && line.length > 15 && line.length < 120) {
      tips.push(line.replace(/^[-•]\s*/, ''));
    }
  }
  // If no bullet points, extract short sentences
  if (tips.length === 0) {
    const sentences = content.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 20 && s.length < 100);
    return sentences.slice(0, 5);
  }
  return tips.slice(0, 5);
}

interface SlideInput {
  quote: string;
  tips: string[];
  title: string;
  subtitle: string;
  skill: string;
  color: string;
}

function buildSlides(count: number, input: SlideInput): SlideConfig[] {
  const { quote, tips, title, subtitle, skill, color } = input;

  if (count === 1) {
    return [{
      template: 'quote',
      text: quote,
      color,
      skill,
      subtitle: '',
      number: '',
    }];
  }

  const slides: SlideConfig[] = [];

  // Slide 1: Hook (quote or teaser)
  slides.push({
    template: 'teaser',
    text: title,
    color,
    skill,
    subtitle: subtitle.slice(0, 120),
    number: '',
  });

  // Middle slides: tips
  const middleCount = Math.min(count - 2, tips.length);
  for (let i = 0; i < middleCount; i++) {
    slides.push({
      template: 'tip',
      text: tips[i],
      color,
      skill,
      subtitle: '',
      number: String(i + 1),
    });
  }

  // Fill remaining with quotes if needed
  if (slides.length < count - 1) {
    slides.push({
      template: 'quote',
      text: quote,
      color,
      skill,
      subtitle: '',
      number: '',
    });
  }

  // Last slide: CTA
  slides.push({
    template: 'cta',
    text: 'Meer tips en inzichten?',
    color,
    skill,
    subtitle: 'devadercoach.nl',
    number: '',
  });

  return slides.slice(0, count);
}
