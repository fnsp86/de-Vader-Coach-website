import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const template = searchParams.get('template') ?? 'quote';
  const text = searchParams.get('text') ?? '';
  const color = searchParams.get('color') ?? '#F59E0B';
  const skill = searchParams.get('skill') ?? '';
  const subtitle = searchParams.get('subtitle') ?? '';
  const number = searchParams.get('number') ?? '';

  const interBold = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwYZ90OcXDcPfOhiJUk3Nq3DNOk.woff2'),
  ).then((res) => res.arrayBuffer());

  const interMedium = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwYZ90OcXDcPfG5iJUk3Nq3DNOk.woff2'),
  ).then((res) => res.arrayBuffer());

  let content;
  if (template === 'tip') {
    content = (
      <TipTemplate text={text} color={color} number={number} />
    );
  } else if (template === 'teaser') {
    content = (
      <TeaserTemplate text={text} color={color} subtitle={subtitle} skill={skill} />
    );
  } else {
    content = (
      <QuoteTemplate text={text} color={color} skill={skill} />
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#111318',
          fontFamily: 'Inter',
        }}
      >
        {content}
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700 },
        { name: 'Inter', data: interMedium, weight: 500 },
      ],
    },
  );
}

function QuoteTemplate({ text, color, skill }: { text: string; color: string; skill: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      {/* Skill badge top-left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            backgroundColor: color,
          }}
        />
        <span style={{ fontSize: '28px', fontWeight: 700, color, letterSpacing: '2px', textTransform: 'uppercase' as const }}>
          {skill}
        </span>
      </div>

      {/* Quote text centered */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <p
          style={{
            fontSize: text.length > 160 ? 38 : text.length > 100 ? 46 : 54,
            fontWeight: 700,
            color: '#F0F2F8',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {text}
        </p>
      </div>

      {/* Bottom bar */}
      <BottomBar color={color} />
    </div>
  );
}

function TipTemplate({ text, color, number }: { text: string; color: string; number: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '80px' }}>
      {/* Number circle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', marginTop: '40px' }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            backgroundColor: color + '20',
            border: `4px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '56px', fontWeight: 700, color }}>
            {number || '#'}
          </span>
        </div>
      </div>

      {/* Tip label */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, color, letterSpacing: '3px', textTransform: 'uppercase' as const }}>
          VADERTIP
        </span>
      </div>

      {/* Tip text */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <p
          style={{
            fontSize: text.length > 140 ? 36 : 44,
            fontWeight: 700,
            color: '#F0F2F8',
            lineHeight: 1.35,
            textAlign: 'center',
            maxWidth: '880px',
          }}
        >
          {text}
        </p>
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
      {/* Category badge */}
      <div style={{ display: 'flex', marginBottom: '40px', marginTop: '20px' }}>
        <div
          style={{
            backgroundColor: color + '25',
            borderRadius: '12px',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '22px', fontWeight: 700, color, letterSpacing: '1px' }}>
            {skill}
          </span>
        </div>
      </div>

      {/* Blog title */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <p
          style={{
            fontSize: text.length > 60 ? 48 : 56,
            fontWeight: 700,
            color: '#F0F2F8',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          {text}
        </p>
        {subtitle && (
          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#9BA3B8',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <BottomBar color={color} />
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
        gap: '12px',
        borderTop: `3px solid ${color}30`,
        paddingTop: '28px',
      }}
    >
      {/* Heart icon SVG */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span style={{ fontSize: '26px', fontWeight: 700, color: '#9BA3B8' }}>
        devadercoach.nl
      </span>
    </div>
  );
}
