/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Globe } from "lucide-react";
import { BuenFinPromos } from "./components/BuenFinPromos";

type Language = "es" | "en";

const FOCUS_LOGO_URL =
  "https://thefocusplan.com/IMAGENES/LOGO%20FOCUS%20-%20SIN%20FONDO.png";
const PORTAL_IMAGE_URL =
  "https://thefocusplan.com/IMAGENES/THE%20FOCUS%20EN%20CONSTRUCCION.png";
const BACKGROUND_VIDEO_URL =
  "https://thefocusplan.com/VIDEOS/VIDEO%20FONDO%20FOCUS-2.mp4";

const WHATSAPP_URL_ES = `https://api.whatsapp.com/send?phone=523318042910&text=${encodeURIComponent(
  "¡Hola Coach! Vi las promociones de Buen Fin en The Focus Plan y me gustaría recibir información."
)}`;
const WHATSAPP_URL_EN = `https://api.whatsapp.com/send?phone=523318042910&text=${encodeURIComponent(
  "Hello Coach! I saw the Buen Fin deals on The Focus Plan and would like more information."
)}`;

const copy = {
  es: {
    imageAlt: "The Focus Plan - Sitio en Construcción",
    fallbackTitle: "PORTAL EN",
    fallbackAccent: "CONSTRUCCIÓN",
    whatsappCta: "CONTACTAR POR WHATSAPP",
    footer: "© 2026 THE FOCUS PLAN · FOCUS BOX & FITNESS",
  },
  en: {
    imageAlt: "The Focus Plan - Site Under Construction",
    fallbackTitle: "PORTAL UNDER",
    fallbackAccent: "CONSTRUCTION",
    whatsappCta: "CONTACT ON WHATSAPP",
    footer: "© 2026 THE FOCUS PLAN · FOCUS BOX & FITNESS",
  },
};

const TopoBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="topo"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20C40 10 60 50 100 40C140 30 160 70 200 60"
            fill="none"
            stroke="#768455"
            strokeWidth="0.5"
          />
          <path
            d="M0 60C50 50 70 90 120 80C170 70 190 110 200 100"
            fill="none"
            stroke="#768455"
            strokeWidth="0.5"
          />
          <path
            d="M0 100C30 90 50 130 90 120C130 110 150 150 200 140"
            fill="none"
            stroke="#768455"
            strokeWidth="0.5"
          />
          <path
            d="M0 140C60 130 80 170 140 160C200 150 220 190 200 180"
            fill="none"
            stroke="#768455"
            strokeWidth="0.5"
          />
          <path
            d="M0 180C40 170 60 210 100 200"
            fill="none"
            stroke="#768455"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/60 to-[#0B0B0B]" />
  </div>
);

export default function App() {
  const [language, setLanguage] = useState<Language>("es");
  const [heroImageError, setHeroImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const t = copy[language];
  const whatsappUrl = language === "es" ? WHATSAPP_URL_ES : WHATSAPP_URL_EN;

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-[#0B0B0B] text-[#F2F2F2] selection:bg-[#768455] selection:text-[#0B0B0B] overflow-x-hidden">
      {/* Ambient Background Video & Scrim */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#0B0B0B]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-25 brightness-75"
        >
          <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/70 to-[#0B0B0B]/95 pointer-events-none" />
      </div>

      <TopoBackground />

      {/* Minimal Top Brand Bar */}
      <header className="relative z-20 w-full border-b border-[#768455]/25 bg-[#0B0B0B]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full border border-[#768455]/60 bg-[#0B0B0B] flex items-center justify-center overflow-hidden shrink-0">
              {!logoError ? (
                <img
                  src={FOCUS_LOGO_URL}
                  alt="Logo The Focus Plan"
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="stencil text-xs text-[#768455]">F</span>
              )}
            </div>
            <span className="stencil text-lg sm:text-xl tracking-wider text-white whitespace-nowrap shrink-0">
              THE FOCUS PLAN
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setLanguage((prev) => (prev === "es" ? "en" : "es"))
            }
            aria-label={
              language === "es" ? "Switch to English" : "Cambiar a Español"
            }
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-widest uppercase text-[#F2F2F2]/80 hover:text-[#768455] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#768455]"
          >
            <Globe size={14} className="text-[#768455]" />
            <span>{language === "es" ? "EN" : "ES"}</span>
          </button>
        </div>
      </header>

      {/* Main Content: Buen Fin Deals First, then Under Construction Visual + WhatsApp */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <BuenFinPromos language={language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-7 pt-4 border-t border-[#768455]/20"
        >
          {/* Featured Under Construction Image from thefocusplan.com/IMAGENES */}
          <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square rounded-sm overflow-hidden border border-[#768455]/40 bg-[#0B0B0B] shadow-[0_25px_60px_rgba(0,0,0,0.75)] flex items-center justify-center">
            {/* Tactical Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#768455] z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#768455] z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#768455] z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#768455] z-20 pointer-events-none" />

            {!heroImageError ? (
              <img
                src={PORTAL_IMAGE_URL}
                alt={t.imageAlt}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={() => setHeroImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#161913] via-[#0B0B0B] to-[#11130E] space-y-4">
                {!logoError && (
                  <img
                    src={FOCUS_LOGO_URL}
                    alt="Logo The Focus Plan"
                    className="w-28 h-28 object-contain"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                  />
                )}
                <div className="stencil text-4xl sm:text-5xl leading-[0.9] text-white">
                  {t.fallbackTitle}
                  <br />
                  <span className="text-[#768455]">{t.fallbackAccent}</span>
                </div>
              </div>
            )}
          </div>

          {/* Primary WhatsApp Link + Jump to Buen Fin Promo */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactical w-full sm:w-auto px-8 py-4 text-xs sm:text-sm inline-flex items-center justify-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3B18A]"
            >
              <MessageCircle size={18} />
              <span>{t.whatsappCta}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("buen-fin-promos");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-4 text-xs sm:text-sm font-black tracking-widest uppercase border border-[#B4D330]/70 text-[#B4D330] hover:bg-[#B4D330] hover:text-[#0B0B0B] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B4D330]"
            >
              {language === "es" ? "QUIERO MI PROMO" : "VIEW BUEN FIN DEALS"}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-[#768455]/15 bg-[#0B0B0B]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#F2F2F2]/45 uppercase text-center">
          <span>{t.footer}</span>
          <span>thefocusplan.com</span>
        </div>
      </footer>
    </div>
  );
}
