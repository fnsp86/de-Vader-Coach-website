import type { BlogPostMeta } from './blog-posts';
import type { Course } from './courses';

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
  return [...specific.slice(0, 4), ...GENERAL_HASHTAGS].join(' ');
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
