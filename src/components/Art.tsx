/* Icons and logo for SkyDoze. All decorative (aria-hidden). */

type IconProps = { size?: number };

export function Icon({ name, size = 20 }: IconProps & { name: keyof typeof paths }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

const paths = {
  truck: (
    <>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  plane: (
    <path d="M10.5 13.5 3 11l1.5-1.5 7.5 1 4.5-4.5a2.1 2.1 0 0 1 3 3L15 13.5l1 7.5-1.5 1.5-2.5-7.5-3 3v2.5L7.5 21l-1-3-3-1L5 15.5h2.5z" />
  ),
  train: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="3.5" />
      <path d="M5 11h14M8.5 21l2-4M15.5 21l-2-4" />
      <circle cx="9" cy="14" r=".8" />
      <circle cx="15" cy="14" r=".8" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-4l2-5h12l2 5v4z" />
      <path d="M4 12h16" />
      <circle cx="8" cy="16.5" r="1.8" />
      <circle cx="16" cy="16.5" r="1.8" />
    </>
  ),
  sofa: (
    <>
      <path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" />
      <path d="M2.5 13a2 2 0 0 1 4 0v2h11v-2a2 2 0 0 1 4 0v5h-19z" />
      <path d="M5 18v2M19 18v2" />
    </>
  ),
  desk: (
    <>
      <rect x="4" y="4" width="16" height="11" rx="2" />
      <path d="M9 20h6M12 15v5" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
  ),
  scale: (
    <>
      <path d="M12 3v18M7 21h10M5 7h14" />
      <path d="m5 7-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z" />
    </>
  ),
} as const;

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="10" fill="#c42a6c" />
      <path d="M22.5 18.5A7.5 7.5 0 1 1 13.5 9a6 6 0 0 0 9 9.5z" fill="#ffe6ef" />
      <circle cx="22" cy="10" r="1.6" fill="#ffe6ef" />
    </svg>
  );
}
