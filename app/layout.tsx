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
