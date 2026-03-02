import { ImageResponse } from 'next/og';

// Using Node.js runtime (edge has Vercel deployment issues)
export const alt = 'De Vadercoach - Word elke dag een betere vader';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          backgroundColor: '#0A0A0A',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              backgroundColor: '#F59E0B20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 800,
              color: '#F59E0B',
              letterSpacing: '-1px',
            }}
          >
            De Vadercoach
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 500,
              color: '#999',
              maxWidth: '600px',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Word elke dag een betere vader
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px',
            }}
          >
            {['Cursussen', 'Experience', 'Blog', 'App'].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#666',
                  backgroundColor: '#1A1A1A',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #2A2A2A',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
