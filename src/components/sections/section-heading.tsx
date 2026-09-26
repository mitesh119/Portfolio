import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">{children}</p>
      )}
    </header>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">{children}</h3>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("glass rounded-3xl p-6 md:p-8", className)}>{children}</div>;
}
