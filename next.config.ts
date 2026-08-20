import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://res.cloudinary.com https://i.ytimg.com https://img.youtube.com",
      "media-src 'self' https://res.cloudinary.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' https://res.cloudinary.com https://script.google.com https://script.googleusercontent.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/Initiatives.html",
        destination: "/#focus-areas",
        permanent: true,
      },
      {
        source: "/initiatives.html",
        destination: "/#focus-areas",
        permanent: true,
      },
      {
        source: "/Initiatives",
        destination: "/#focus-areas",
        permanent: true,
      },
      {
        source: "/initiatives",
        destination: "/#focus-areas",
        permanent: true,
      },
      {
        source: "/About.html",
        destination: "/#philosophy",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/#philosophy",
        permanent: true,
      },
      {
        source: "/Contact.html",
        destination: "/#founder",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/#founder",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
