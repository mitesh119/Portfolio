/**
 * Consistent bullet marker used for every checklist/point line across the
 * site — a red dot that glows and grows when the cursor is anywhere over
 * its line (parent element needs the `group` class).
 */
export function PointDot() {
  return (
    <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
      <span className="absolute inset-0 rounded-full bg-red-600 transition-all duration-300 ease-out group-hover:scale-[1.8] group-hover:shadow-[0_0_10px_3px_rgba(220,38,38,0.7)] dark:bg-red-500" />
    </span>
  );
}
