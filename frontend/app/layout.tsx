import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Betting App",
  description: "A simple betting application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 block dark:hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.1),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(74,222,128,0.08),transparent)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_80%,rgba(236,72,153,0.03))]" />
            </div>

            {/* Fondo mejorado en modo oscuro - Estilo 2023 */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden dark:block">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(139,92,246,0.25),transparent_50%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(20,184,166,0.15),transparent)]" />
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_80%_50%,rgba(59,130,246,0.1),rgba(124,58,237,0.15),rgba(236,72,153,0.1))]" />
            </div>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
