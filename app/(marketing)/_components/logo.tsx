import { cn } from "@/lib/utils";

interface LogoTailflowProps {
  className?: string;
  uniColor?: boolean;
  ariaLabel?: string;
}

export const Logo = ({
  className,
  uniColor = false,
  ariaLabel = "Tailflow",
}: LogoTailflowProps) => {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-label={ariaLabel}
      role="img"
    >
      <defs>
        <linearGradient id="tailflow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#A78BFA" />
          <stop offset="50%"  stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#34D399" />
        </linearGradient>
      </defs>

      {/* Flowing Wave Icon */}
      <g transform="translate(8,30)">
        <path
          d="M12 0 C20 -12, 32 8, 42 0 C52 -8, 64 12, 74 0 C82 -10, 90 -5, 96 0"
          stroke={uniColor ? "currentColor" : "url(#tailflow-gradient)"}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="12" cy="0" r="6" fill={uniColor ? "currentColor" : "url(#tailflow-gradient)"} />
        <circle cx="96" cy="0" r="7" fill={uniColor ? "currentColor" : "#34D399"} />
      </g>

      {/* Text — automatically dark in light mode, white in dark mode */}
      <text
        x="116"
        y="42"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-0.02em"
        fill="currentColor"                     // This is the key!
        className={uniColor ? "" : "text-gray-900 dark:text-white"}
      >
        Tailflow
      </text>

      {/* Underline */}
      <rect
        x="116"
        y="48"
        width="118"
        height="4"
        rx="2"
        fill={uniColor ? "currentColor" : "url(#tailflow-gradient)"}
        opacity={uniColor ? "0.6" : "0.85"}
      />
    </svg>
  );
};

/* Icon-only version */
export const LogoIcon = ({
  className,
  uniColor = false,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 110 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <defs>
        {!uniColor && (
          <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#A78BFA" />
            <stop offset="50%"  stop-color="#60A5FA" />
            <stop offset="100%" stop-color="#34D399" />
          </linearGradient>
        )}
      </defs>

      <g transform="translate(8,30)">
        <path
          d="M12 0 C20 -12, 32 8, 42 0 C52 -8, 64 12, 74 0 C82 -10, 90 -5, 96 0"
          stroke={uniColor ? "currentColor" : "url(#grad-icon)"}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="12" cy="0" r="7" fill={uniColor ? "currentColor" : "url(#grad-icon)"} />
        <circle cx="96" cy="0" r="8" fill={uniColor ? "currentColor" : "#34D399"} />
      </g>
    </svg>
  );
};

/* Stroke-only version (uses currentColor → perfect with Tailwind text classes) */
export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 110 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-10 w-auto", className)}
    >
      <path
        d="M12 30 C20 18, 32 38, 42 30 C52 22, 64 42, 74 30 C82 20, 90 25, 96 30"
        stroke="currentColor"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12" cy="30" r="6" fill="currentColor" />
      <circle cx="96" cy="30" r="7" fill="currentColor" />
    </svg>
  );
};