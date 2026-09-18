import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { InboxProvider } from "@/components/InboxProvider";
import InboxShell from "@/components/InboxShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Unibox — Demo de bandeja de entrada para atención al cliente",
  description:
    "Proyecto de portfolio: bandeja de entrada ficticia para un equipo de atención al cliente que unifica varios canales de mensajería, sin backend ni datos reales.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-slate-50 text-slate-900">
        <LanguageProvider>
          <InboxProvider>
            <InboxShell>{children}</InboxShell>
          </InboxProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
