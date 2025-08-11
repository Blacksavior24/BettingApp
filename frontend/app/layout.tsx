import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

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
    <html lang="es" suppressHydrationWarning>
      <body
        className={inter.className}
      >

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
