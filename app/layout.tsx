import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";

import { ProjectProvider } from "@/context/ProjectContext";
import { ReactLenis } from "lenis/react";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import ConditionalFooter from "@/components/ConditionalFooter";
import { InitProjects } from "@/components/InitProjects";
import { PostHogProvider } from "@/providers/PostHogProvider";

import { Suspense } from "react"; // 👈 ADD THIS
import LenisProvider from "@/providers/LenisProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  display: "swap",
});

// app/layout.tsx or next/head (Next.js 13+)
export const metadata = {
  title: "Tommy | Shopify Developer, Full-Stack Engineer & Graphic Designer",
  description:
    "Portfolio of Tommy – Shopify developer, full-stack engineer, and graphic designer. I build custom e-commerce solutions, web apps, and creative brand experiences.",
  keywords: [
    "Shopify Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "E-commerce Development",
    "Next.js",
    "React",
    "Web Design",
    "Custom Shopify",
    "Portfolio",
  ],
  openGraph: {
    title: "Tommy | Shopify Developer & Full-Stack Engineer",
    description:
      "Building custom Shopify stores, full-stack web apps, and bold visual design.",
    url: "https://tommyvong.com/", // replace with your domain
    siteName: "Tommy Portfolio",
    images: [
      {
        url: "/images/tv.png", // can use same tv.png or a larger og-image.png
        width: 1200,
        height: 630,
        alt: "Tommy Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/tv.png", // favicon
    shortcut: "/images/tv.png",
    apple: "/images/tv.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Suspense fallback={null}>
        {" "}
        {/* 👈 WRAP PostHogProvider */}
        <PostHogProvider>
          <html lang="en" suppressHydrationWarning>
            <head />
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} font-raleway antialiased`}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col min-h-screen text-foreground transition-colors">
                  <ProjectProvider>
                    <Navbar />
                    <main className="flex-grow">
                      <InitProjects />
                      {children}
                    </main>
                    <ConditionalFooter />
                  </ProjectProvider>
                </div>
              </ThemeProvider>
            </body>
          </html>
        </PostHogProvider>
      </Suspense>
    </ClerkProvider>
  );
}
