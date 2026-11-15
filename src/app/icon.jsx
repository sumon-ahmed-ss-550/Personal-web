import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.25px',
          borderRadius: '8px',
        }}
      >
        SMN
      </div>
    ),
    {
      ...size,
    }
  );
}
