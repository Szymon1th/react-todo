
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import ThemeToggle from "@/components/layout/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Tasks | Todo App",
  description: "A modern task management application built with Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
              <span className="font-semibold">Todo App</span>
              <ThemeToggle />
            </div>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
