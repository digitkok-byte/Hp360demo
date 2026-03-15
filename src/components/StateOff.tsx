'use client';

export default function StateOff() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#040904] z-[2]">
      {/* Static noise */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.05 0 0 0 0 0.18 0 0 0 0 0.07 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'noise-jitter 0.08s steps(1) infinite',
        }}
      />
      <div className="relative z-[2] text-center opacity-15">
        <span className="block text-[clamp(12px,3.5vw,16px)] text-phosphor-mid tracking-[0.2em]">
          HOOKAHPLACE
        </span>
        <span className="block text-[clamp(12px,3.5vw,16px)] text-phosphor-mid tracking-[0.2em]">
          360
        </span>
      </div>
    </div>
  );
}
