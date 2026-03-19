import type { Metadata } from "next";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Lato } from "next/font/google";
import ClientProviders from "./providers";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Установка Пожарной Сигнализации и Камер в Ташкенте — Azrar",
    template: "%s | Azrar",
  },

  icons: {
    icon: "/logo_icon.svg",
  },

  description:
    "Azrar — Монтаж охранных систем, камер видеонаблюдения и пожарных датчиков в Ташкенте и Узбекистане. Гарантия качества и выгодные цены.",

  keywords:
    "Пожарная сигнализация Ташкент, видеонаблюдение Узбекистан, установка камер, датчики дыма, охранная сигнализация, Azrar, Ташкент",

  metadataBase: new URL("https://www.azrar.uz"),

  openGraph: {
    title: "Установка Систем Безопасности Azrar (Ташкент)",
    description:
      "Надежные системы пожарной и охранной безопасности в Узбекистане.",
    url: "https://www.azrar.uz",
    siteName: "Azrar",
    locale: "ru_RU",
    type: "website",
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

  alternates: {
    canonical: "https://www.azrar.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={lato.className}>
        <ClientProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
