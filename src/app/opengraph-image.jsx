import { ImageResponse } from 'next/og';

export const alt = 'Sumon Ahmed | Front-End Web Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundColor: '#0b0d10',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          border: '12px solid #14171d',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              color: '#f8fafc',
            }}
          >
            SMN<span style={{ color: '#f59e0b' }}>.DEV</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 9999,
              backgroundColor: '#14171d',
              border: '1px solid #232834',
              fontSize: 14,
              fontWeight: 700,
              color: '#94a3b8',
            }}
          >
            Rangpur, Bangladesh · GMT+6
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Sumon Ahmed
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: '#f59e0b' }}>
            Front-End &amp; Full Stack Developer
          </div>
          <div style={{ fontSize: 20, color: '#94a3b8', maxWidth: 800 }}>
            Crafting responsive, accessible, and high-performance web applications with React, Next.js, and modern JavaScript.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 16px',
                  borderRadius: 12,
                  backgroundColor: '#14171d',
                  border: '1px solid #232834',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#cbd5e1',
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
