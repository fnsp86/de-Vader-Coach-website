import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';

// No edge runtime - Instagram can't fetch from edge functions

const FONT_BOLD_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf';
const FONT_MEDIUM_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf';

// Lucide SVG paths for the 8 skill icons (viewBox 0 0 24 24, stroke-based)
const SKILL_ICON_PATHS: Record<string, string[]> = {
  Aanwezigheid: [
    'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
    'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
  ],
  Emotiecoaching: [
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  ],
  Zelfregulatie: [
    'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
    'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
    'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  ],
  Grenzen: [
    'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  ],
  Autonomie: [
    'M7 20h10',
    'M10 20c5.5-2.5.8-6.4 3-10',
    'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z',
    'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z',
  ],
  Herstel: [
    'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
    'M21 3v5h-5',
    'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
    'M8 16H3v5',
  ],
  Verbinding: [
    'M11 17l2 2a1 1 0 1 0 3-3',
    'M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
    'M21 3l1 11h-2',
    'M3 3l-1 11 6.5 6.5a1 1 0 1 0 3-3',
    'M3 4h8',
  ],
  Reflectie: [
    'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z',
    'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z',
    'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4',
    'M17.599 6.5a3 3 0 0 0 .399-1.375',
    'M6.003 5.125A3 3 0 0 0 6.401 6.5',
    'M3.477 10.896a4 4 0 0 1 .585-.396',
    'M19.938 10.5a4 4 0 0 1 .585.396',
    'M6 18a4 4 0 0 1-1.967-.516',
    'M19.967 17.484A4 4 0 0 1 18 18',
  ],
};

// Skill colors (duplicated here since edge runtime can't import from lib)
const SKILL_COLORS: Record<string, string> = {
  Aanwezigheid: '#667eea',
  Emotiecoaching: '#EF4444',
  Zelfregulatie: '#34D399',
  Grenzen: '#FBBF24',
  Autonomie: '#A78BFA',
  Herstel: '#FB923C',
  Verbinding: '#60A5FA',
  Reflectie: '#C084FC',
};

const SKILL_ORDER = ['Aanwezigheid', 'Emotiecoaching', 'Zelfregulatie', 'Grenzen', 'Autonomie', 'Herstel', 'Verbinding', 'Reflectie'];

function SkillIcon({ skill, color, size = 28 }: { skill: string; color: string; size?: number }) {
  const paths = SKILL_ICON_PATHS[skill];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'flex' }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function SkillBadge({ skill, color }: { skill: string; color: string }) {
  if (!skill) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: color + '25',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}
      >
        <SkillIcon skill={skill} color={color} size={24} />
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color, letterSpacing: 2 }}>
        {skill.toUpperCase()}
      </span>
    </div>
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const template = searchParams.get('template') ?? 'quote';
    const text = searchParams.get('text') ?? '';
    const color = searchParams.get('color') ?? '#F59E0B';
    const skill = searchParams.get('skill') ?? '';
    const subtitle = searchParams.get('subtitle') ?? '';
    const number = searchParams.get('number') ?? '';
    const items = searchParams.get('items') ?? '';
    const format = searchParams.get('format') ?? 'feed'; // 'feed' (1080x1080) or 'story' (1080x1920)

    const [interBold, interMedium] = await Promise.all([
      fetch(FONT_BOLD_URL).then((r) => r.arrayBuffer()),
      fetch(FONT_MEDIUM_URL).then((r) => r.arrayBuffer()),
    ]);

    let content;
    if (template === 'tip') {
      content = <TipTemplate text={text} color={color} number={number} skill={skill} />;
    } else if (template === 'teaser') {
      content = <TeaserTemplate text={text} color={color} subtitle={subtitle} skill={skill} />;
    } else if (template === 'stat') {
      content = <StatTemplate text={text} color={color} subtitle={subtitle} skill={skill} />;
    } else if (template === 'list') {
      const listItems = items ? items.split('||') : [];
      content = <ListTemplate text={text} color={color} items={listItems} skill={skill} />;
    } else if (template === 'cta') {
      content = <CTATemplate text={text} color={color} subtitle={subtitle} />;
    } else if (template === 'skills') {
      content = <SkillsTemplate text={text} color={color} subtitle={subtitle} />;
    } else if (template === 'didyouknow') {
      content = <DidYouKnowTemplate text={text} color={color} skill={skill} />;
    } else if (template === 'challenge') {
      content = <ChallengeTemplate text={text} color={color} subtitle={subtitle} skill={skill} />;
    } else if (template === 'comparison') {
      content = <ComparisonTemplate text={text} color={color} subtitle={subtitle} skill={skill} />;
    } else {
      content = <QuoteTemplate text={text} color={color} skill={skill} />;
    }

    const isStory = format === 'story';
    const imgWidth = 1080;
    const imgHeight = isStory ? 1920 : 1080;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAF8F5',
            fontFamily: 'Inter',
          }}
        >
          {isStory ? (
            <div style={{ width: 1080, height: 1920, display: 'flex', flexDirection: 'column', paddingTop: 160, paddingBottom: 160 }}>
              {content}
            </div>
          ) : content}
        </div>
      ),
      {
        width: imgWidth,
        height: imgHeight,
        fonts: [
          { name: 'Inter', data: interBold, weight: 700 as const },
          { name: 'Inter', data: interMedium, weight: 500 as const },
        ],
      },
    );
  } catch (e) {
    return NextResponse.json(
      { error: `Image generation failed: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }
}

function QuoteTemplate({ text, color, skill }: { text: string; color: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <SkillBadge skill={skill} color={color} />

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: text.length > 160 ? 38 : text.length > 100 ? 46 : 54,
            fontWeight: 700,
            color: '#1A1612',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {text}
        </span>
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function TipTemplate({ text, color, number, skill }: { text: string; color: string; number: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, marginTop: 40 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: color + '20',
            border: `4px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {number ? (
            <span style={{ fontSize: 56, fontWeight: 700, color }}>
              {number}
            </span>
          ) : (
            <SkillIcon skill={skill} color={color} size={48} />
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color, letterSpacing: 3 }}>
          VADERTIP
        </span>
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: text.length > 140 ? 36 : 44,
            fontWeight: 700,
            color: '#1A1612',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: 880,
          }}
        >
          {text}
        </span>
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function TeaserTemplate({
  text,
  color,
  subtitle,
  skill,
}: {
  text: string;
  color: string;
  subtitle: string;
  skill: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <div style={{ display: 'flex', marginBottom: 40, marginTop: 20 }}>
        <div
          style={{
            backgroundColor: color + '25',
            borderRadius: 12,
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SkillIcon skill={skill} color={color} size={22} />
          <span style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: 1, marginLeft: 10 }}>
            {skill}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: text.length > 60 ? 48 : 56,
            fontWeight: 700,
            color: '#1A1612',
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          {text}
        </span>
        {subtitle && (
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#7D7568',
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function StatTemplate({ text, color, subtitle, skill }: { text: string; color: string; subtitle: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px', alignItems: 'center', justifyContent: 'center' }}>
      {skill && SKILL_ICON_PATHS[skill] && (
        <div style={{ display: 'flex', marginBottom: 30 }}>
          <SkillIcon skill={skill} color={color} size={48} />
        </div>
      )}
      <span style={{ fontSize: 140, fontWeight: 700, color, lineHeight: 1 }}>
        {text}
      </span>
      <span style={{ fontSize: 36, fontWeight: 500, color: '#7D7568', marginTop: 30, textAlign: 'center', maxWidth: 800 }}>
        {subtitle}
      </span>
      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <BottomBar color={color} />
      </div>
    </div>
  );
}

function ListTemplate({ text, color, items, skill }: { text: string; color: string; items: string[]; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <SkillBadge skill={skill} color={color} />
      <span style={{ fontSize: 40, fontWeight: 700, color: '#1A1612', marginBottom: 40 }}>
        {text}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 20, flexShrink: 0 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color }}>{i + 1}</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 500, color: '#1A1612', lineHeight: 1.4 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
      <BottomBar color={color} />
    </div>
  );
}

function CTATemplate({ text, color, subtitle }: { text: string; color: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 80, marginBottom: 40, color }}>♥</span>
      <span style={{ fontSize: 52, fontWeight: 700, color: '#1A1612', textAlign: 'center', marginBottom: 24, maxWidth: 800 }}>
        {text}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, borderRadius: 20, padding: '20px 60px', marginTop: 20 }}>
        <span style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF' }}>
          {subtitle || 'devadercoach.nl'}
        </span>
      </div>
    </div>
  );
}

function SkillsTemplate({ text, color, subtitle }: { text: string; color: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '70px' }}>
      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 50 }}>
        <span
          style={{
            fontSize: text.length > 40 ? 40 : 48,
            fontWeight: 700,
            color: '#1A1612',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {text || 'De 8 Vaardigheden'}
        </span>
        {subtitle && (
          <span style={{ fontSize: 24, fontWeight: 500, color: '#7D7568', marginTop: 12, textAlign: 'center' }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* 2x4 grid of skill icons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flex: 1, alignContent: 'center' }}>
        {SKILL_ORDER.map((name) => {
          const clr = SKILL_COLORS[name] ?? '#F59E0B';
          return (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '25%',
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: clr + '20',
                  border: `3px solid ${clr}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <SkillIcon skill={name} color={clr} size={36} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: clr, textAlign: 'center' }}>
                {name}
              </span>
            </div>
          );
        })}
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function DidYouKnowTemplate({ text, color, skill }: { text: string; color: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30, marginTop: 40 }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: color + '20',
            border: `3px solid ${color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 48 }}>🔍</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color, letterSpacing: 3 }}>
          WIST JE DAT...
        </span>
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: text.length > 140 ? 36 : text.length > 80 ? 42 : 48,
            fontWeight: 700,
            color: '#1A1612',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: 880,
          }}
        >
          {text}
        </span>
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function ChallengeTemplate({ text, color, subtitle, skill }: { text: string; color: string; subtitle: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 30 }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: color + '20',
            border: `3px solid ${color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 48 }}>🏆</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
        <div
          style={{
            backgroundColor: color,
            borderRadius: 12,
            padding: '10px 28px',
            display: 'flex',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: 2 }}>
            WEEKUITDAGING
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: text.length > 100 ? 38 : 46,
            fontWeight: 700,
            color: '#1A1612',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: 880,
            marginBottom: 24,
          }}
        >
          {text}
        </span>
        {subtitle && (
          <span style={{ fontSize: 26, fontWeight: 500, color: '#7D7568', textAlign: 'center', maxWidth: 800 }}>
            {subtitle}
          </span>
        )}
      </div>

      <BottomBar color={color} />
    </div>
  );
}

function ComparisonTemplate({ text, color, subtitle, skill }: { text: string; color: string; subtitle: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '60px 80px' }}>
      <SkillBadge skill={skill} color={color} />

      <div style={{ display: 'flex', flex: 1, gap: 40 }}>
        {/* Left: Don't */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 24,
            padding: '40px 30px',
            backgroundColor: '#EF444415',
            border: '2px solid #EF444430',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
            <span style={{ fontSize: 32, marginRight: 12 }}>✗</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#EF4444', letterSpacing: 1 }}>NIET</span>
          </div>
          <span
            style={{
              fontSize: text.length > 80 ? 28 : 32,
              fontWeight: 700,
              color: '#1A1612',
              lineHeight: 1.4,
            }}
          >
            {text}
          </span>
        </div>

        {/* Right: Do */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 24,
            padding: '40px 30px',
            backgroundColor: color + '15',
            border: `2px solid ${color}30`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
            <span style={{ fontSize: 32, marginRight: 12 }}>✓</span>
            <span style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: 1 }}>WEL</span>
          </div>
          <span
            style={{
              fontSize: (subtitle || '').length > 80 ? 28 : 32,
              fontWeight: 700,
              color: '#1A1612',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: 30 }}>
        <BottomBar color={color} />
      </div>
    </div>
  );
}

function BottomBar({ color }: { color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: `3px solid ${color}30`,
        paddingTop: 28,
      }}
    >
      <span style={{ fontSize: 26, fontWeight: 700, color, marginRight: 12 }}>
        ♥
      </span>
      <span style={{ fontSize: 26, fontWeight: 700, color: '#7D7568' }}>
        devadercoach.nl
      </span>
    </div>
  );
}
