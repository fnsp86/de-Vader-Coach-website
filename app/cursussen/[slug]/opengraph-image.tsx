import { ImageResponse } from 'next/og';
import { COURSES, SKILL_COLORS } from '@/lib/courses';

export const alt = 'De Vadercoach Cursus';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES[slug];

  const title = course?.title || 'Cursus';
  const description = course?.description || '';
  const color = course ? (SKILL_COLORS[course.category] || course.color) : '#F59E0B';
  const pages = course?.pages || 0;
  const price = course?.price || 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '60px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color,
              backgroundColor: color + '20',
              padding: '6px 16px',
              borderRadius: '8px',
              alignSelf: 'flex-start',
            }}
          >
            {course?.category || 'Cursus'}
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: '22px',
                color: '#999',
                lineHeight: 1.4,
                maxWidth: '800px',
              }}
            >
              {description}
            </div>
          )}
          {pages > 0 && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <span style={{ fontSize: '16px', color: '#666' }}>
                {pages} pagina&apos;s
              </span>
              <span style={{ fontSize: '16px', color: '#666' }}>
                &euro;{price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#F59E0B20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#F59E0B' }}>
            De Vadercoach
          </span>
          <span style={{ fontSize: '16px', color: '#666', marginLeft: '8px' }}>
            devadercoach.nl
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
