"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { IconWhatsApp } from "@/components/icons";
import { globalAnimationsCSS } from "@/styles/animations";
import { WA } from "@/lib/contact";
import { ScrollToTop } from "@/components/ScrollToTop";

/**
 * AppShell wraps all pages with the shared layout.
 *
 * El nav usa `position: fixed` (no sticky) para que al ocultarse con
 * translateY(-100%) NO revele contenido que estaba detrás del nav.
 * Con sticky ocurría un flash blanco en páginas con contenido claro al top.
 * Con fixed, el nav flota sobre el contenido y el padding-top compensa su altura.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname        = usePathname()
  const isCatalog       = pathname === "/catalogo"
  const isProductDetail = pathname?.startsWith("/producto/")
  const hideWhatsApp    = isCatalog || isProductDetail
  const [searchQuery, setSearchQuery] = useState("");

  // Sincroniza el input de búsqueda con el param ?q= de la URL del catálogo
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(pathname === "/catalogo" ? (params.get("q") ?? "") : "");
  }, [pathname]);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const nearTop = useRef(true);
  const { scrollY } = useScroll();

  // Medir el alto real del nav para el padding-top del contenido
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(136); // aproximado inicial para evitar FOUC

  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    nearTop.current = latest < 80;
    setIsScrolled(latest > 50);

    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Transition según dirección y posición
  const navTransition = hidden
    ? {
        duration: 0.15,
        ease: [0.55, 0, 1, 0.45] as [number, number, number, number],
      }
    : nearTop.current
      ? { duration: 0 }
      : {
          duration: 0.22,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        };

  return (
    <>
      <ScrollToTop />
      <style dangerouslySetInnerHTML={{ __html: globalAnimationsCSS }} />
      <div className="min-h-screen bg-white font-sans antialiased">
        {/* Nav fijo — TopBar + Header + Navigation se mueven como una unidad */}
        <motion.div
          ref={navRef}
          className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-shadow duration-300 ${
            isScrolled ? "shadow-2xl shadow-black/20" : ""
          }`}
          animate={{ y: hidden ? "-100%" : 0 }}
          transition={navTransition}
        >
          <TopBar />
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Navigation />
        </motion.div>

        {/* Contenido desplazado exactamente el alto del nav fijo */}
        <div style={{ paddingTop: navHeight }}>
          <main>{children}</main>
          {/* Espaciador blanco entre contenido y footer para evitar fusión visual */}
          <div className="h-8 bg-white" />
          <Footer />
        </div>

        {/* Botón flotante WhatsApp — pill estática con texto integrado */}
        {!hideWhatsApp && (
          <a
            id="whatsapp-button"
            href={WA.general}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cotizar por WhatsApp"
            className="fixed bottom-8 right-6 z-50 group flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 shadow-xl shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30 hover:bg-[#22c55e]"
          >
            <IconWhatsApp className="h-5 w-5 text-white shrink-0" />
            <span className="text-sm font-bold text-white leading-none whitespace-nowrap">
              Cotizar aquí
            </span>
          </a>
        )}
      </div>
    </>
  );
}
