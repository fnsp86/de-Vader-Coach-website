import { SKILL_COLORS } from './courses';
import {
  Eye,
  Heart,
  Waves,
  Shield,
  Sprout,
  RefreshCw,
  Handshake,
  Brain,
  type LucideIcon,
} from 'lucide-react';

export interface BrandAsset {
  id: string;
  name: string;
  category: 'logo' | 'icon' | 'color';
  value: string; // SVG path, color hex, or emoji
}

// Brand colors (from SKILL_COLORS + amber)
export const BRAND_COLORS: Array<{ name: string; hex: string }> = [
  { name: 'Amber', hex: '#F59E0B' },
  ...Object.entries(SKILL_COLORS).map(([name, hex]) => ({ name, hex })),
  { name: 'Donker', hex: '#111318' },
  { name: 'Licht', hex: '#F0F2F8' },
];

// Skill icons - Lucide components (same as used on the website)
export const SKILL_ICONS: Record<string, { icon: LucideIcon; emoji: string }> = {
  Aanwezigheid: { icon: Eye, emoji: '👁️' },
  Emotiecoaching: { icon: Heart, emoji: '💛' },
  Zelfregulatie: { icon: Waves, emoji: '🧘' },
  Grenzen: { icon: Shield, emoji: '🛡️' },
  Autonomie: { icon: Sprout, emoji: '🦋' },
  Herstel: { icon: RefreshCw, emoji: '🤝' },
  Verbinding: { icon: Handshake, emoji: '🔗' },
  Reflectie: { icon: Brain, emoji: '🪞' },
};

// Template descriptions for the UI
export const TEMPLATE_INFO: Record<string, { name: string; description: string; icon: string }> = {
  quote: { name: 'Quote', description: 'Krachtige quote met vaardigheid-badge', icon: '💬' },
  tip: { name: 'Tip', description: 'Genummerde tip met VADERTIP label', icon: '💡' },
  teaser: { name: 'Blog', description: 'Blog titel met subtekst', icon: '📝' },
  stat: { name: 'Statistiek', description: 'Groot getal of percentage met ondertekst', icon: '📊' },
  list: { name: 'Lijst', description: 'Genummerde lijst met tips', icon: '📋' },
  cta: { name: 'CTA', description: 'Call-to-action met logo en link', icon: '🔔' },
  skills: { name: 'Skills', description: 'Alle 8 vaardigheden in een grid', icon: '🎯' },
  didyouknow: { name: 'Wist je dat', description: 'Educatief feit met vergrootglas', icon: '🔍' },
  challenge: { name: 'Uitdaging', description: 'Weekuitdaging met trofee', icon: '🏆' },
  comparison: { name: 'Vergelijk', description: 'Wel/Niet vergelijking', icon: '⚖️' },
};
