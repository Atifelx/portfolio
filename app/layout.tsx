import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atif Shaikh | Forward Deployed Engineer",
  description: "Portfolio of Atif Shaikh - Engineer deploying AI solutions for enterprise clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${archivo.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen relative overflow-x-hidden font-sans`}
      >
        <div className="fixed inset-0 pointer-events-none z-[-1] noise-bg opacity-[0.03]"></div>
        {children}
      </body>
    </html>
  );
}
