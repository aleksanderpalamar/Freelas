import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/session-provider";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import { Navbar } from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freelas",
  description: "Plataforma de Freelas 100% brasileira e gratuita para você encontrar freelas e contratar freelas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-50 text-zinc-900`}
      >
        <NextAuthProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-center"/>
        </NextAuthProvider>
      </body>
    </html>
  );
}
