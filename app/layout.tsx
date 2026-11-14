import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const title = "Atif Shaikh, Forward Deployed Engineer";
const description =
  "Full-stack developer who ships AI to production on the cloud, working directly with enterprise customers. Open to remote roles worldwide.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atif Shaikh",
  jobTitle: "Forward Deployed Engineer",
  description,
  email: `mailto:${EMAIL}`,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bricolage.variable} font-sans antialiased bg-paper text-ink min-h-screen overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
