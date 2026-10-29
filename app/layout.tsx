import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const title = "Atif Shaikh, Forward Deployed Engineer";
const description =
  "Forward deployed engineer open to remote roles in the US and Europe: full-stack, AI agents, RAG and fine-tuning. Lead developer of a multi-agent assistant in production for Procter & Gamble.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bricolage.variable} font-sans antialiased bg-paper text-ink min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
