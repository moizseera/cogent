import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Cogent — Think clearly. Speak clearly.",
  description:
    "Practise navigating difficult situations where the answer is not obvious.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col font-[family-name:var(--font-inter)]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
