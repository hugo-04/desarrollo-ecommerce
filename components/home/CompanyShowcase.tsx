"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportOnce,
} from "@/hooks/useAnimations";
import { COMPANY_SHOWCASE_CONTENT } from "@/lib/data/mock/static-content.mock";
import {
  IconShield,
  IconTruck,
  IconHeadphones,
  IconClock,
  IconArrowRight,
  IconPhone,
  IconCertificate,
} from "@/components/icons";

const iconMap = {
  shield: IconShield,
  truck: IconTruck,
  headphones: IconHeadphones,
  clock: IconClock,
};

export function CompanyShowcase() {
  const ref = useRef<HTMLElement>(null);
  const c = COMPANY_SHOWCASE_CONTENT;

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={fadeLeft} className="order-2 lg:order-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">
                {c.badge}
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">
              {c.title}
              <br />
              <span className="text-primary">{c.titleHighlight}</span>
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              {c.description}
            </p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {c.features.map((item, i) => {
                const Icon = iconMap[item.iconName as keyof typeof iconMap];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.04 }}
                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4"
                  >
                    <div
                      className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${item.colorClass}`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <p className="mb-1 text-sm font-bold text-[#121A47]">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                {c.ctaNosotros}
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#121A47] px-6 py-3 text-sm font-bold text-[#121A47] transition-all hover:-[#002a5c] hover:text-white"
              >
                <IconPhone className="h-4 w-4" />
                {c.ctaContacto}
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} className="order-1 lg:order-2">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={c.image}
                  alt={c.imageAlt}
                  className="h-[420px] w-full object-cover origin-center"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
