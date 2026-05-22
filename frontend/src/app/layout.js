import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Trade Copilot — AI Market Intelligence",
  description: "AI-powered market context and analysis for modern traders.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f5f0] text-[#1a1814] flex flex-col relative overflow-x-hidden font-sans">

        {/* Subtle designer grid overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 designer-grid" />

        {/* Soft radial vignette — warm bronze center glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(140,111,74,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Main app */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
