import type { Metadata } from "next";
import {
  Quicksand,
  Playfair_Display,
  Cormorant_Garamond,
  Parisienne,
  Montserrat,
} from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Fontes extras oferecidas no editor de texto do painel admin
// (ver FONT_OPTIONS em src/lib/richTextFonts.ts).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amanda Alcântara Cerimonial | Assessoria de Casamentos e Eventos",
  description:
    "Assessoria intencional, estratégica e personalizada para quem deseja viver o grande dia. Cerimonial de casamentos, debutantes e eventos especiais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${quicksand.variable} ${playfair.variable} ${cormorant.variable} ${parisienne.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
