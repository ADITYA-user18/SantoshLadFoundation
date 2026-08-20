import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Noto_Sans_Kannada, Noto_Serif_Kannada } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SiteShell } from "@/components/site/SiteShell";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { site } from "@/data/content";
import { LanguageProvider } from "@/i18n/language";
import "./globals.css";

const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const knSans = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-kn-sans",
  display: "swap",
});

const knSerif = Noto_Serif_Kannada({
  subsets: ["kannada"],
  variable: "--font-kn-serif",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.santoshladfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `Santosh Lad Foundation`,
    template: `%s | Santosh Lad Foundation`,
  },
  description:
    "Official website of Santosh Lad Foundation and Santosh S. Lad, Minister for Labour, Government of Karnataka, and four-time MLA from Kalaghatagi. Leadership rooted in service. Impact driven by action.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: `Santosh Lad Foundation`,
    description:
      "Leadership rooted in service. Impact driven by action. Santosh Lad Foundation.",
    url: baseUrl,
    siteName: "Santosh Lad Foundation",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/portraits/hero-podium.jpg",
        width: 1200,
        height: 630,
        alt: `Santosh Lad Foundation - Minister for Labour, Government of Karnataka`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Santosh Lad Foundation`,
    description:
      "Official website of Santosh Lad Foundation.",
    images: ["/images/portraits/hero-podium.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/brand/favicon-circle.png",
    shortcut: "/images/brand/favicon-circle.png",
    apple: "/images/brand/favicon-circle.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: site.name,
        jobTitle: "Minister for Labour",
        worksFor: {
          "@type": "GovernmentOrganization",
          name: "Government of Karnataka",
        },
        description:
          "Minister for Labour, Government of Karnataka, and Member of Legislative Assembly from Kalaghatagi.",
        url: baseUrl,
        sameAs: [
          "https://en.wikipedia.org/wiki/Santosh_Lad",
          "https://www.wikidata.org/wiki/Q7420658",
          "https://www.linkedin.com/in/santoshlad",
          "https://www.facebook.com/SantoshLadOfficial",
          "https://twitter.com/SLLadOfficial",
          "https://www.instagram.com/santoshladofficial",
          "https://www.youtube.com/@SantoshLadOfficial",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#office`,
        name: `Office of ${site.name} — ${site.shortRole}`,
        image: `${baseUrl}/images/portraits/hero-podium.jpg`,
        telephone: site.phone || "+91 836 244 5566",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "Kalaghatagi",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 15.1834,
          longitude: 74.9669,
        },
        areaServed: ["Karnataka", "Kalaghatagi", "Dharwad", "Bengaluru"],
        url: baseUrl,
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: site.name,
        url: baseUrl,
        logo: `${baseUrl}/images/brand/favicon-circle.png`,
        sameAs: [
          "https://en.wikipedia.org/wiki/Santosh_Lad",
          "https://www.wikidata.org/wiki/Q7420658",
          "https://www.linkedin.com/in/santoshlad",
          "https://www.facebook.com/SantoshLadOfficial",
          "https://twitter.com/SLLadOfficial",
          "https://www.instagram.com/santoshladofficial",
          "https://www.youtube.com/@SantoshLadOfficial",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: site.name,
        description: "Official website of Santosh S. Lad",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${knSans.variable} ${knSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Baloo+Bhai+2:wght@400..800&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full bg-bg font-sans text-ink transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <SiteShell>{children}</SiteShell>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
