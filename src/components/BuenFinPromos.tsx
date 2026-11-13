import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import {
  Check,
  Award,
  MessageCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Gift,
  ShoppingBag,
} from "lucide-react";

const BANNER_BUEN_FIN_URL =
  "https://thefocusplan.com/IMAGENES/BANNER%20BUEN%20FIN.png";

export interface BuenFinPackage {
  id: string;
  title: string;
  tierLabel: string;
  pricePrefix?: string;
  price: string;
  oldPrice?: string;
  unit: string;
  giftBanner: string;
  durationSummary: string;
  description: string;
  whatsappText: string;
  isFeatured?: boolean;
  features: string[];
  bonuses: string[];
  specialBonus?: string | null;
}

const WHATSAPP_BASE = "https://api.whatsapp.com/send?phone=523318042910&text=";

export const BUEN_FIN_PACKAGES: BuenFinPackage[] = [
  {
    id: "feel-like-yourself",
    title: "FEEL LIKE YOURSELF",
    tierLabel: "PAQUETE INSIGNIA · BUEN FIN",
    pricePrefix: "3 MESES X",
    price: "$1,999",
    unit: "MXN",
    giftBanner: "+ 1 MES DE REGALO",
    durationSummary: "Pagas 3 meses y entrenas 4 meses (1 mes gratis)",
    description:
      "El programa balanceado por excelencia: entrenamiento personalizado, acompañamiento constante y 3 sesiones 1:1.",
    whatsappText:
      "¡Hola Coach! Vi la promo de BUEN FIN FOCUS y quiero el paquete FEEL LIKE YOURSELF (3 meses x $1,999 + 1 MES DE REGALO).",
    isFeatured: true,
    features: [
      "Valoración inicial completa",
      "Plan de entrenamiento personalizado según objetivos, experiencia, horarios y equipo disponible",
      "Acceso ilimitado a la app Stenfit",
      "Modificaciones y ajustes constantes según tu progreso",
      "Comunicación vía WhatsApp para dudas, cambios y progreso constante",
      "Revisión técnica de ejercicios",
      "Acceso prioritario a mensajes",
      "Sesión 1:1 online de inicio, mitad y final de tu paquete",
    ],
    bonuses: [
      "E-book Cuerpo fuerte y sexy",
      "E-book Súper inteligente",
      "E-book Come sin culpa",
      "Recetario FIT",
      "Material exclusivo: retos HYROX, rutinas de abdomen y consejos de entrenamiento",
    ],
    specialBonus: null,
  },
  {
    id: "start-feeling-better",
    title: "START FEELING BETTER",
    tierLabel: "PRECIO DE REBAJA · 1 MES",
    pricePrefix: "A",
    oldPrice: "DE $799",
    price: "$599",
    unit: "MXN",
    giftBanner: "DESCUENTO BUEN FIN · AHORRAS $200",
    durationSummary: "1 Mes de entrenamiento personalizado de $799 a $599 MXN",
    description:
      "Da el primer paso para reactivar tu energía y aprender la técnica correcta con tu plan a medida.",
    whatsappText:
      "¡Hola Coach! Vi la promo de BUEN FIN FOCUS y quiero el paquete START FEELING BETTER (de $799 a $599 MXN).",
    isFeatured: false,
    features: [
      "Valoración inicial",
      "Plan de entrenamiento personalizado según objetivos, experiencia, horarios y equipo disponible",
      "Acceso a la app Stenfit durante el mes contratado",
      "Ajustes de rutina durante el mes",
      "Comunicación vía WhatsApp para dudas, cambios y progreso constante",
    ],
    bonuses: ["E-book Cuerpo fuerte y sexy"],
    specialBonus: null,
  },
  {
    id: "make-it-your-lifestyle",
    title: "MAKE IT YOUR LIFESTYLE",
    tierLabel: "TRANSFORMACIÓN INTEGRAL · BUEN FIN",
    pricePrefix: "6 MESES X",
    price: "$3,499",
    unit: "MXN",
    giftBanner: "+ 3 MESES DE REGALO",
    durationSummary: "Pagas 6 meses y entrenas 9 meses (3 meses gratis)",
    description:
      "El programa definitivo para transformar tu cuerpo y convertir los hábitos en tu estilo de vida permanente.",
    whatsappText:
      "¡Hola Coach! Vi la promo de BUEN FIN FOCUS y quiero el paquete MAKE IT YOUR LIFESTYLE (6 meses x $3,499 + 3 MESES DE REGALO).",
    isFeatured: false,
    features: [
      "Valoración inicial profunda",
      "Plan de entrenamiento personalizado según objetivos, experiencia, horarios y equipo disponible",
      "Acceso ilimitado a la app Stenfit",
      "Modificaciones y ajustes constantes según tu progreso",
      "Comunicación vía WhatsApp para dudas, cambios y progreso constante",
      "Revisión técnica de ejercicios por video",
      "Acceso prioritario a mensajes",
      "Agenda de sesiones 1:1 online (hasta 1 por semana)",
      "Descuento exclusivo al terminar tu plan",
    ],
    bonuses: [
      "E-book Cuerpo fuerte y sexy",
      "E-book Súper inteligente",
      "E-book Come sin culpa",
      "Recetario FIT",
      "Material exclusivo: retos HYROX, rutinas de abdomen y consejos de entrenamiento",
    ],
    specialBonus:
      "Guía de mantenimiento: cómo continuar entrenando y mantener tus hábitos después de los 6 meses.",
  },
];

interface BuenFinPromosProps {
  language: "es" | "en";
  onPromoModeChange?: (isOpen: boolean) => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 220 : -220,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 220 : -220,
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.16 },
    },
  }),
};

export const BuenFinPromos: React.FC<BuenFinPromosProps> = ({
  language,
  onPromoModeChange,
}) => {
  // Default to index 0 (FEEL LIKE YOURSELF - top card on Story)
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [selectedPkg, setSelectedPkg] = useState<BuenFinPackage | null>(null);
  const [bannerError, setBannerError] = useState(false);

  const total = BUEN_FIN_PACKAGES.length;
  const currentPkg = BUEN_FIN_PACKAGES[page];

  const openPromoModal = (pkg: BuenFinPackage) => {
    setSelectedPkg(pkg);
    onPromoModeChange?.(true);
  };

  const closePromoModal = () => {
    setSelectedPkg(null);
    onPromoModeChange?.(false);
  };

  const paginate = (newDirection: number) => {
    const nextIndex = (page + newDirection + total) % total;
    setPage([nextIndex, newDirection]);
  };

  const goToPackage = (index: number) => {
    if (index === page) return;
    setPage([index, index > page ? 1 : -1]);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50 || info.velocity.x < -300) {
      paginate(1);
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      paginate(-1);
    }
  };

  return (
    <section
      id="buen-fin-promos"
      aria-label="Promociones Buen Fin Focus"
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header Banner Image from thefocusplan.com/IMAGENES */}
      <div className="text-center mb-6 md:mb-8 space-y-5 flex flex-col items-center">
        <h1 className="sr-only">
          {language === "es"
            ? "BUEN FIN FOCUS - Solo por tiempo limitado"
            : "BUEN FIN FOCUS - Limited time only"}
        </h1>

        <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square rounded-sm overflow-hidden border border-[#768455]/40 bg-[#0B0B0B] shadow-[0_25px_60px_rgba(0,0,0,0.75)] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#768455] z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#768455] z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#768455] z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#768455] z-20 pointer-events-none" />

          {!bannerError ? (
            <img
              src={BANNER_BUEN_FIN_URL}
              alt="Buen Fin Focus - Entrena. Avanza. Siente la diferencia."
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={() => setBannerError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-3 bg-[#0B0B0B]">
              <div className="stencil text-5xl sm:text-6xl leading-[0.88] text-white italic tracking-tight">
                BUEN FIN{" "}
                <span className="text-[#B4D330] underline decoration-[#B4D330]/70 decoration-4 underline-offset-4">
                  FOCUS
                </span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold tracking-[0.16em] text-white uppercase">
                ENTRENA. AVANZA.{" "}
                <span className="text-[#B4D330]">SIENTE LA DIFERENCIA.</span>
              </p>
            </div>
          )}
        </div>

        {/* Quick Package Tabs */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {BUEN_FIN_PACKAGES.map((pkg, idx) => {
            const active = page === idx;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => goToPackage(idx)}
                className={`px-3.5 py-2 text-xs font-extrabold rounded-sm border transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-[#B4D330] ${
                  active
                    ? "bg-[#B4D330] border-[#B4D330] text-[#0B0B0B] shadow-[0_0_20px_rgba(180,211,48,0.3)]"
                    : "bg-[#121310] border-[#768455]/45 text-[#F2F2F2]/85 hover:border-[#B4D330] hover:text-white"
                }`}
              >
                {pkg.title} · {pkg.price}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel Arrow Navigation Bar */}
      <div className="max-w-xl mx-auto flex items-center justify-between px-3 py-2.5 mb-5 bg-[#121310]/95 backdrop-blur-md border border-[#768455]/50 rounded-sm shadow-lg">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label={language === "es" ? "Opción anterior" : "Previous option"}
          className="px-3.5 py-2 rounded-sm border border-[#768455]/50 text-xs font-black tracking-wider uppercase text-white hover:bg-[#B4D330] hover:text-[#0B0B0B] hover:border-[#B4D330] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B4D330]"
        >
          <ChevronLeft size={16} />
          <span>{language === "es" ? "Anterior" : "Prev"}</span>
        </button>

        {/* Indicator Dots + Counter */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            {BUEN_FIN_PACKAGES.map((pkg, idx) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => goToPackage(idx)}
                aria-label={`Ver ${pkg.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  page === idx
                    ? "w-7 bg-[#B4D330]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-[#F2F2F2]/65 tabular-nums">
            {page + 1} / {total}
          </span>
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label={language === "es" ? "Siguiente opción" : "Next option"}
          className="px-3.5 py-2 rounded-sm border border-[#768455]/50 text-xs font-black tracking-wider uppercase text-white hover:bg-[#B4D330] hover:text-[#0B0B0B] hover:border-[#B4D330] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B4D330]"
        >
          <span>{language === "es" ? "Siguiente" : "Next"}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Single Active Card Slot with Desktop Side Arrows + Drag/Swipe Scroll */}
      <div className="relative max-w-xl mx-auto">
        {/* Desktop Side Left Arrow */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label={language === "es" ? "Opción anterior" : "Previous option"}
          className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#B4D330]/55 bg-[#121310]/95 text-white hover:bg-[#B4D330] hover:text-[#0B0B0B] hover:border-[#B4D330] active:scale-95 transition-all items-center justify-center z-20 cursor-pointer shadow-xl focus-visible:outline-2 focus-visible:outline-[#B4D330]"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Desktop Side Right Arrow */}
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label={language === "es" ? "Siguiente opción" : "Next option"}
          className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#B4D330]/55 bg-[#121310]/95 text-white hover:bg-[#B4D330] hover:text-[#0B0B0B] hover:border-[#B4D330] active:scale-95 transition-all items-center justify-center z-20 cursor-pointer shadow-xl focus-visible:outline-2 focus-visible:outline-[#B4D330]"
        >
          <ChevronRight size={22} />
        </button>

        <div className="overflow-hidden px-1 py-1">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPkg.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              role="button"
              tabIndex={0}
              onClick={() => openPromoModal(currentPkg)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPromoModal(currentPkg);
                }
              }}
              className="group relative flex flex-col justify-between text-center rounded-xl p-6 sm:p-8 bg-[#0E0F0C]/95 border-2 border-[#B4D330] shadow-[0_20px_55px_rgba(180,211,48,0.16)] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4D330]"
            >
              {/* Package Title Bar (Matching Story graphic lime-olive banner) */}
              <div className="mb-5">
                <div className="text-[11px] font-bold tracking-[0.2em] text-[#A3B18A] uppercase mb-2">
                  {currentPkg.tierLabel}
                </div>
                <div className="inline-block w-full bg-[#B4D330] text-[#0B0B0B] px-4 py-2 rounded-sm shadow-md">
                  <h2 className="stencil text-2xl sm:text-3xl tracking-wider italic">
                    {currentPkg.title}
                  </h2>
                </div>
              </div>

              {/* Price & Gift Callout matching Story graphic */}
              <div className="my-2 py-5 px-4 rounded-lg bg-[#0B0B0B] border border-[#768455]/50 space-y-3">
                {currentPkg.oldPrice ? (
                  <div className="text-xl sm:text-2xl font-extrabold text-white/80 tracking-wide tabular-nums">
                    <span className="line-through decoration-[#B4D330] decoration-4">
                      {currentPkg.oldPrice}
                    </span>
                  </div>
                ) : null}

                {currentPkg.pricePrefix ? (
                  <div className="text-lg sm:text-2xl font-black tracking-wider text-white uppercase">
                    {currentPkg.pricePrefix}
                  </div>
                ) : null}

                <div className="flex items-baseline justify-center gap-2 tabular-nums">
                  <span className="stencil text-5xl sm:text-6xl text-white tracking-tight">
                    {currentPkg.price}
                  </span>
                  <span className="text-sm font-black tracking-widest text-[#B4D330] uppercase">
                    {currentPkg.unit}
                  </span>
                </div>

                {/* Crystal-clear Gift / Discount Bar */}
                <div className="pt-1">
                  <div className="inline-flex items-center justify-center gap-2 w-full bg-[#B4D330] text-[#0B0B0B] px-4 py-2.5 rounded-sm font-black text-sm sm:text-base tracking-wide uppercase shadow-md">
                    <Gift size={18} className="shrink-0" />
                    <span>{currentPkg.giftBanner}</span>
                  </div>
                </div>
              </div>

              {/* Short Description + Included Count */}
              <p className="text-xs sm:text-sm text-[#F2F2F2]/80 leading-relaxed mt-5 mb-5 max-w-md mx-auto">
                {currentPkg.description}
              </p>

              <div className="space-y-2 mb-6 text-left max-w-md mx-auto w-full">
                {currentPkg.features.slice(0, 3).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F2F2F2]/90"
                  >
                    <Check
                      size={15}
                      className="text-[#B4D330] shrink-0 mt-0.5"
                    />
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="text-xs font-bold text-[#B4D330] pl-6">
                  + {currentPkg.features.length - 3 + currentPkg.bonuses.length}{" "}
                  beneficios y bonos incluidos
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-white/10">
                <span className="w-full py-4 px-6 rounded-sm bg-white group-hover:bg-[#B4D330] text-[#0B0B0B] text-xs sm:text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-lg">
                  <span>
                    {language === "es"
                      ? "OK, QUIERO MI PROMO · VER DETALLES"
                      : "CLAIM MY PROMO · VIEW DETAILS"}
                  </span>
                  <ChevronRight size={16} />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full Buen Fin Rebaja Modal (Opened when user clicks "OK, QUIERO MI PROMO") */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePromoModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl my-8 bg-[#0B0B0B] border-2 border-[#B4D330] rounded-xl p-6 sm:p-8 shadow-[0_0_70px_rgba(180,211,48,0.25)] text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closePromoModal}
                aria-label="Cerrar detalles"
                className="sticky float-right top-0 w-10 h-10 rounded-full bg-[#121310] border border-[#B4D330]/60 text-white hover:bg-[#B4D330] hover:text-[#0B0B0B] transition-colors flex items-center justify-center cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Buen Fin Rebaja Banner */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B4D330] text-[#0B0B0B] text-[11px] font-black tracking-[0.2em] uppercase rounded-sm mb-4">
                <ShoppingBag size={13} />
                <span>REBAJA BUEN FIN · THE FOCUS PLAN</span>
              </div>

              <h3 className="stencil text-3xl sm:text-4xl text-white italic mb-1">
                {selectedPkg.title}
              </h3>
              <p className="text-xs font-bold tracking-widest text-[#B4D330] uppercase mb-4">
                {selectedPkg.durationSummary}
              </p>

              {/* Big Rebaja Box inside Modal */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#121310] border border-[#B4D330]/60 mb-5 text-center space-y-2">
                <div className="flex items-baseline justify-center gap-3 flex-wrap tabular-nums">
                  {selectedPkg.oldPrice && (
                    <span className="text-lg font-extrabold line-through decoration-[#B4D330] decoration-2 text-white/60">
                      {selectedPkg.oldPrice} MXN
                    </span>
                  )}
                  {selectedPkg.pricePrefix && (
                    <span className="text-base font-black text-white uppercase">
                      {selectedPkg.pricePrefix}
                    </span>
                  )}
                  <span className="stencil text-4xl sm:text-5xl text-white">
                    {selectedPkg.price}
                  </span>
                  <span className="text-xs font-black tracking-widest text-[#B4D330] uppercase">
                    {selectedPkg.unit}
                  </span>
                </div>

                <div className="inline-flex items-center justify-center gap-2 w-full bg-[#B4D330] text-[#0B0B0B] px-4 py-2 rounded-sm text-xs sm:text-sm font-black uppercase tracking-wider">
                  <Gift size={16} className="shrink-0" />
                  <span>{selectedPkg.giftBanner}</span>
                </div>
              </div>

              <p className="text-[#F2F2F2]/80 text-sm leading-relaxed mb-5">
                {selectedPkg.description}
              </p>

              {/* Full Service Stack */}
              <div className="space-y-2.5 mb-5 bg-[#121310] border border-[#768455]/35 p-4 rounded-lg">
                <div className="text-[11px] font-black tracking-widest text-[#B4D330] uppercase mb-2">
                  LO QUE INCLUYE TU PAQUETE BUEN FIN:
                </div>
                {selectedPkg.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F2F2F2]/90"
                  >
                    <Check
                      size={15}
                      className="text-[#B4D330] shrink-0 mt-0.5"
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Bonuses */}
              <div className="space-y-2 mb-6 bg-[#121310] border border-[#768455]/35 p-4 rounded-lg">
                <div className="text-[11px] font-black tracking-widest text-[#B4D330] uppercase flex items-center gap-1.5 mb-2">
                  <Award size={14} />
                  <span>BONUS EXCLUSIVOS INCLUIDOS:</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#F2F2F2]/85">
                  {selectedPkg.bonuses.map((bonus, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B4D330] font-bold">·</span>
                      <span>{bonus}</span>
                    </li>
                  ))}
                  {selectedPkg.specialBonus && (
                    <li className="pt-2 mt-2 border-t border-white/10 text-white font-bold">
                      {selectedPkg.specialBonus}
                    </li>
                  )}
                </ul>
              </div>

              {/* Modal WhatsApp CTA */}
              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent(
                  selectedPkg.whatsappText
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#B4D330] hover:bg-white text-[#0B0B0B] font-black text-xs sm:text-sm tracking-widest uppercase rounded-sm flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(180,211,48,0.35)] transition-colors whitespace-nowrap"
              >
                <MessageCircle size={18} />
                <span>
                  {language === "es"
                    ? "APARTAR MI PROMO POR WHATSAPP"
                    : "CLAIM MY PROMO ON WHATSAPP"}
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
