import React, { useMemo } from 'react';

interface FloatingDecorationsProps {
  density?: 'low' | 'medium' | 'high';
}

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ density = 'medium' }) => {
  const count = density === 'high' ? 18 : density === 'medium' ? 12 : 7;

  // Generate deterministic floating items to avoid re-renders
  const items = useMemo(() => {
    const arr = [];
    const types = ['heart', 'petal', 'sparkle', 'star'] as const;
    const colors = ['#f472b6', '#c084fc', '#fbcfe8', '#e9d5ff', '#fbbf24', '#f59e0b'];

    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      const left = (i * 97) % 94 + 3; // 3% to 97%
      const duration = 12 + ((i * 3) % 10); // 12s to 22s
      const delay = (i * 1.8) % 12; // 0s to 12s
      const size = 14 + ((i * 5) % 16); // 14px to 30px
      const color = colors[i % colors.length];

      arr.push({ id: i, type, left, duration, delay, size, color });
    }
    return arr;
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            top: '-40px',
            animation: `petalFall ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            opacity: 0.75,
          }}
        >
          {item.type === 'heart' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              className="drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {item.type === 'petal' && (
            <svg
              width={item.size * 1.2}
              height={item.size * 0.8}
              viewBox="0 0 40 24"
              fill={item.color}
              className="opacity-70"
            >
              <path d="M0,12 C10,0 30,0 40,12 C30,24 10,24 0,12 Z" />
            </svg>
          )}

          {item.type === 'sparkle' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              className="animate-sparkle-glow"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}

          {item.type === 'star' && (
            <svg
              width={item.size * 0.7}
              height={item.size * 0.7}
              viewBox="0 0 24 24"
              fill="#fbbf24"
              className="opacity-60"
            >
              <circle cx="12" cy="12" r="4" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
