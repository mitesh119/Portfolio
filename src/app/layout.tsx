import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
