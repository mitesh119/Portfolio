/** The NimbusMD "n" mark, drawn in the surrounding text color with the brand-orange dot. */
export function NimbusMark({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="44 44 158 168"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-5 0)">
        <path
          fill="currentColor"
          d="M53 208 V70 A22 22 0 0 1 75 48 H97 V59.71 A75 75 0 0 1 203 128 V208 H159 V128 A31 31 0 0 0 97 128 V208 Z"
        />
        <circle cx="128" cy="128" r="21" fill="#F2542D" />
      </g>
    </svg>
  );
}
