import type { Metadata } from "next";
import { Amiri, Scheherazade_New } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "../providers";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

export const metadata: Metadata = {
  title: "Quran App",
  description: "Read and explore the Holy Quran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${amiri.variable} ${scheherazade.variable} min-h-screen flex flex-col`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <Providers>
          <Navbar />

          <main className="min-h-screen flex-1 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}