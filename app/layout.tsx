import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employable",
  description: "ReWiring your career",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-gradient-to-br from-blue-500 to-green-500 dark:from-blue-900 dark:to-gray-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}
