/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, ArrowUpRight, Globe } from "lucide-react";

type Language = "es" | "en";

const FOCUS_LOGO_URL =
  "https://thefocusplan.com/IMAGENES/LOGO%20FOCUS%20-%20SIN%20FONDO.png";
const PORTAL_IMAGE_URL =
  "https://thefocusplan.com/IMAGENES/THE%20FOCUS%20EN%20CONSTRUCCION.png";
const BACKGROUND_VIDEO_URL =
  "https://thefocusplan.com/VIDEOS/VIDEO%20FONDO%20FOCUS-2.mp4";

const WHATSAPP_URL_ES = `https://api.whatsapp.com/send?phone=523318042910&text=${encodeURIComponent(
  "¡Hola Coach! Vi que el portal de The Focus Plan está en construcción y me gustaría recibir información."
)}`;
const WHATSAPP_URL_EN = `https://api.whatsapp.com/send?phone=523318042910&text=${encodeURIComponent(
  "Hello Coach! I saw The Focus Plan portal is under construction and would like more information."
)}`;

const INSTAGRAM_URL = "https://www.instagram.com/the_focusplan/";
const FACEBOOK_URL =
  "https://www.facebook.com/265338446659485?ref=PROFILE_EDIT_xav_ig_profile_page_web";

const copy = {
  es: {
    imageAlt: "The Focus Plan - Sitio en Construcción",
    fallbackTitle: "PORTAL EN",
    fallbackAccent: "CONSTRUCCIÓN",
    whatsappCta: "CONTACTAR POR WHATSAPP",
    socialLabel: "REDES OFICIALES DE THE FOCUS PLAN",
    instagramHandle: "@the_focusplan",
    facebookLabel: "Facebook Oficial",
    footer: "© 2026 THE FOCUS PLAN · FOCUS BOX & FITNESS",
  },
  en: {
    imageAlt: "The Focus Plan - Site Under Construction",
    fallbackTitle: "PORTAL UNDER",
    fallbackAccent: "CONSTRUCTION",
    whatsappCta: "CONTACT ON WHATSAPP",
    socialLabel: "THE FOCUS PLAN OFFICIAL SOCIALS",
    instagramHandle: "@the_focusplan",
    facebookLabel: "Official Facebook",
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
  const [igIconError, setIgIconError] = useState(false);
  const [fbIconError, setFbIconError] = useState(false);

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

      {/* Minimal Top Brand Bar (No navigation sections) */}
      <header className="relative z-20 w-full border-b border-[#768455]/25 bg-[#0B0B0B]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
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

      {/* Single Centered Main Page Content (Sin secciones) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-7"
        >
          <h1 className="sr-only">{t.imageAlt}</h1>

          {/* Featured Under Construction Image from thefocusplan.com/IMAGENES */}
          <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square rounded-sm overflow-hidden border border-[#768455]/40 bg-[#0B0B0B] shadow-[0_25px_60px_rgba(0,0,0,0.75)] flex items-center justify-center">
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

          {/* Primary WhatsApp Link */}
          <div className="w-full flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactical w-full sm:w-auto px-8 py-4 text-xs sm:text-sm inline-flex items-center justify-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3B18A]"
            >
              <MessageCircle size={18} />
              <span>{t.whatsappCta}</span>
            </a>
          </div>

          {/* Official Social Links Only */}
          <div className="w-full pt-4 border-t border-[#768455]/20 space-y-3">
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#F2F2F2]/60 uppercase">
              {t.socialLabel}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#121410]/90 border border-[#768455]/35 hover:border-[#768455] hover:bg-[#768455]/15 rounded-sm transition-colors text-xs sm:text-sm font-semibold text-[#F2F2F2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#768455]"
              >
                {!igIconError ? (
                  <img
                    src="https://thefocusplan.com/IMAGENES/LOGO%20INSTAGRAM.png"
                    alt="Instagram The Focus Plan"
                    className="w-5 h-5 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                    onError={() => setIgIconError(true)}
                  />
                ) : (
                  <svg
                    className="w-4 h-4 text-[#768455] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )}
                <span>{t.instagramHandle}</span>
                <ArrowUpRight size={14} className="text-[#768455]" />
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#121410]/90 border border-[#768455]/35 hover:border-[#768455] hover:bg-[#768455]/15 rounded-sm transition-colors text-xs sm:text-sm font-semibold text-[#F2F2F2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#768455]"
              >
                {!fbIconError ? (
                  <img
                    src="https://thefocusplan.com/IMAGENES/LOGO%20FACEBOOK.png"
                    alt="Facebook The Focus Plan"
                    className="w-5 h-5 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                    onError={() => setFbIconError(true)}
                  />
                ) : (
                  <svg
                    className="w-4 h-4 text-[#768455] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                )}
                <span>{t.facebookLabel}</span>
                <ArrowUpRight size={14} className="text-[#768455]" />
              </a>
            </div>
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
