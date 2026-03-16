import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HookahPlace 360 — Меню",
  description: "Интерактивное меню кальянной HookahPlace 360",
  openGraph: {
    title: "HookahPlace 360",
    description: "Интерактивное меню кальянной",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
