import type { Metadata } from "next";
import Header from "@/components/Header";
import { Lato } from "next/font/google";
import { StoreProvider } from "@/lib/store/StoreProvider";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Установка Пожарной Сигнализации и Камер в Ташкенте — Azrar",

  icons: {
    icon: "logo_icon.svg",
  },

  description:
    "Azrar — Монтаж охранных систем, камер видеонаблюдения и пожарных датчиков в Ташкенте и Узбекистане. Гарантия качества и выгодные цены.",

  keywords:
    "Пожарная сигнализация Ташкент, видеонаблюдение Узбекистан, установка камер, датчики дыма, охранная сигнализация, Azrar, Ташкент",

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={lato.className}>
        <Header />
        <main>
          <StoreProvider>{children}</StoreProvider>
        </main>
      </body>
    </html>
  );
}
