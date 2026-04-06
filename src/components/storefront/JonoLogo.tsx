interface JonoLogoProps {
  className?: string;
  variant?: "main" | "pets";
}

export function JonoLogo({ className = "", variant = "main" }: JonoLogoProps) {
  return (
    <svg
      viewBox="0 0 280 80"
      className={className}
      aria-label={variant === "pets" ? "JONO Pets" : "JONO"}
      role="img"
    >
      {/* Calligraphic J */}
      <path
        d="M32 12 C34 12 36 14 36 18 L36 48 C36 58 32 66 24 68 C18 70 12 66 10 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 12 C30 10 34 10 36 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Calligraphic O (first) */}
      <path
        d="M52 40 C52 28 60 20 72 20 C84 20 92 28 92 40 C92 52 84 60 72 60 C60 60 52 52 52 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M60 32 C64 24 80 24 84 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Calligraphic N */}
      <path
        d="M108 58 L108 22 C108 20 110 18 112 20 L140 52 C142 54 144 52 144 50 L144 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Calligraphic O (second — mirrors first) */}
      <path
        d="M162 40 C162 28 170 20 182 20 C194 20 202 28 202 40 C202 52 194 60 182 60 C170 60 162 52 162 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M170 32 C174 24 190 24 194 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* "Pets" subtitle for pets variant */}
      {variant === "pets" && (
        <text
          x="220"
          y="56"
          fontFamily="inherit"
          fontSize="18"
          fontWeight="600"
          letterSpacing="3"
          fill="currentColor"
        >
          Pets
        </text>
      )}
    </svg>
  );
}
