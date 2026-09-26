import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-primary",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Miteshkumar Moirangthem",
  description:
    "Doctoral scholar in Chemical Engineering at IIT Ropar — molecular dynamics for nanomaterials, coatings, gels, and water.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <KineticGrid />
          <div className="relative z-10 flex min-h-full flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
