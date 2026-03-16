"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { clients } from "@/lib/data"
import {
  IconShield, IconTruck, IconClock, IconHeadphones, IconBuilding,
  IconArrowRight, IconCertificate, IconCheck, IconBolt, IconZap,
  IconWhatsApp, IconTools, IconPhone,
} from "@/components/icons"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleUp, viewportOnce } from "@/hooks/useAnimations"

// ========== NOSOTROS PAGE ==========
export default function NosotrosPage() {
  const valores = [
    { icon: IconShield, title: "Calidad Certificada", description: "Todos nuestros productos cuentan con certificaciones IEC, ANSI y NTP para alta y media tension." },
    { icon: IconTruck, title: "Disponibilidad", description: "Stock permanente con mas de 1,000 items y despacho en 48 horas a nivel nacional." },
    { icon: IconClock, title: "Puntualidad", description: "Entrega programada segun cronograma de obra para no afectar los plazos de tus proyectos." },
    { icon: IconHeadphones, title: "Asesoria Tecnica", description: "Equipo de ingenieros electricos especializados en seleccion de materiales AT/MT." },
  ]

  const stats = [
    { value: "20+", label: "Años de experiencia" },
    { value: "350+", label: "Proyectos ejecutados" },
    { value: "1,162+", label: "Productos en stock" },
    { value: "98%", label: "Clientes satisfechos" },
  ]

  return (
    <>
      {/* ===== HERO — DARK ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#0B1035]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-24 text-center"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/[0.08] px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Sobre Nosotros
          </motion.div>
          <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Electro Thina
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Distribuidores especializados en ferreteria y accesorios electricos para lineas de alta y media tension desde hace mas de 20 años.
          </motion.p>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ===== HISTORIA — LIGHT ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid items-center gap-14 lg:grid-cols-2"
          >
            <motion.div variants={fadeLeft}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Nuestra Historia</span>
              </div>
              <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">
                Más de 20 años<br />de experiencia
              </h2>
              <p className="mb-6 text-sm leading-[1.85] text-slate-600">
                Electro Thina nació con la visión de convertirse en el principal distribuidor y fabricante de materiales electricos para lineas de alta y media tension en Peru. A lo largo de dos decadas, hemos construido relaciones solidas con los principales fabricantes internacionales y desarrollado nuestra propia línea de productos certificados.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={scaleUp} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt="Operaciones Electro Thina"
                  className="h-[440px] w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-[#121A47] p-5 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/20">
                    <IconCertificate className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-white">ISO 9001</p>
                    <p className="text-[11px] text-slate-400">Gestión de Calidad</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Timeline de hitos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-20"
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Nuestro recorrido</span>
            </motion.div>
            <div className="relative">
              {/* connector line */}
              <div className="absolute left-0 right-0 top-5 hidden h-px md:block" style={{ background: 'repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 6px, transparent 6px, transparent 14px)' }} />
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                className="relative grid gap-8 md:grid-cols-5"
              >
                {[
                  { year: "1995", title: "Fundación", desc: "Electro Thina inicia operaciones en Lima" },
                  { year: "2004", title: "Certificación ISO", desc: "Obtenemos ISO 9001 de Gestión de Calidad" },
                  { year: "2012", title: "Planta Propia", desc: "Inauguramos planta de fabricación de herrajes" },
                  { year: "2019", title: "Expansión Nacional", desc: "Cobertura a todas las regiones del país" },
                  { year: "2024", title: "Liderazgo AT/MT", desc: "Referente #1 en materiales eléctricos AT/MT" },
                ].map((hito, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                    <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#121A47] shadow-lg ring-4 ring-white">
                      <span className="text-[9px] font-extrabold text-white">{i + 1}</span>
                    </div>
                    <p className="mb-1 text-lg font-extrabold text-primary">{hito.year}</p>
                    <p className="mb-1 text-sm font-bold text-slate-800">{hito.title}</p>
                    <p className="text-[11px] leading-relaxed text-slate-500">{hito.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FABRICACIÓN PROPIA — LIGHT ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid items-center gap-14 lg:grid-cols-2"
          >
            <motion.div variants={fadeRight} className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581093196867-ca9b9e02e42e?w=800&q=80"
                  alt="Planta de fabricacion"
                  className="h-[380px] w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -right-5 -top-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <IconShield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Fabricante</p>
                    <p className="text-[10px] font-semibold text-emerald-600">Certificado IEC</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeLeft} className="order-1 lg:order-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Fabricación Propia</span>
              </div>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#121A47] lg:text-4xl">
                Fabricantes,<br />no solo distribuidores
              </h2>
              <p className="mb-6 text-sm leading-[1.85] text-slate-600">
                Nuestra planta de fabricación nos permite producir accesorios eléctricos bajo estrictos controles de calidad. Esto nos diferencia de cualquier revendedor: tenemos trazabilidad completa, capacidad de personalización técnica y garantías directas de fábrica.
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  "Control de calidad propio en cada etapa del proceso",
                  "Trazabilidad completa de materiales y lotes de producción",
                  "Personalización técnica según especificaciones del proyecto",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <IconCheck className="h-3 w-3 text-emerald-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-50 px-4 py-2">
                <IconCertificate className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">Marca Propia ET — IEC Certificado</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MISIÓN & VISIÓN — DARK ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1035] via-[#121A47] to-[#0B1035]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-20"
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-red-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">Propósito</span>
              <div className="h-px w-8 bg-red-500" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">Misión y Visión</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Misión */}
            <motion.div
              variants={fadeLeft}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-red-500/20 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 ring-1 ring-red-500/20">
                <IconBolt className="h-7 w-7 text-red-400" />
              </div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">Misión</p>
              <h3 className="mb-4 text-xl font-extrabold text-white">Suministro de excelencia para la industria eléctrica</h3>
              <p className="text-sm leading-[1.85] text-slate-400">
                Proveer a empresas e instituciones del sector electrico materiales y accesorios de alta calidad para lineas de alta y media tension, garantizando stock permanente, asesoria tecnica especializada y entregas puntuales que soporten los proyectos mas exigentes del pais.
              </p>
              <ul className="mt-6 space-y-2">
                {["Calidad certificada IEC, ANSI y NTP", "Asesoria tecnica de ingenieros especializados", "Stock permanente y despacho en 48h"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visión */}
            <motion.div
              variants={fadeRight}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 ring-1 ring-primary/20">
                <IconZap className="h-7 w-7 text-blue-400" />
              </div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Visión</p>
              <h3 className="mb-4 text-xl font-extrabold text-white">Ser el referente nacional en materiales eléctricos AT/MT</h3>
              <p className="text-sm leading-[1.85] text-slate-400">
                Consolidarnos como la empresa lider en distribucion de ferreteria y accesorios electricos para alta y media tension en Peru, expandiendo nuestra presencia a nivel regional con un catalogo ampliado, alianzas estrategicas con fabricantes de clase mundial y un servicio tecnico que marque la diferencia.
              </p>
              <ul className="mt-6 space-y-2">
                {["Expansion regional en latinoamerica", "Catalogo de mas de 5,000 productos AT/MT", "Plataforma digital de cotizacion en tiempo real"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-blue-400">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== VALORES — LIGHT ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Valores</span>
                <div className="h-px w-8 bg-red-500" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Lo que nos define</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">Los pilares que guian cada decision y cada entrega que hacemos</p>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary via-red-500 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                    <valor.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#121A47]">{valor.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{valor.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CLIENTES — LIGHT ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Confían en nosotros</span>
                <div className="h-px w-8 bg-red-500" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Nuestros Clientes</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">Empresas líderes del sector electrico que confían en nosotros para sus proyectos</p>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600 transition-all hover:border-primary/30 hover:bg-white hover:text-primary hover:shadow-md"
                >
                  <IconBuilding className="h-4 w-4 shrink-0" />
                  <span className="truncate">{client.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-14 text-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#121A47] to-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              >
                Trabajemos juntos
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== EQUIPO — LIGHT ===== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600">Nuestro Equipo</span>
                <div className="h-px w-8 bg-red-500" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#121A47] lg:text-4xl">Los ingenieros detrás<br />de cada proyecto</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">Especialistas AT/MT que acompañan tu proyecto desde la consulta hasta el despacho</p>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { name: "Ing. Carlos Mendoza", role: "Gerente Técnico", spec: "Alta Tensión — 15 años", initial: "CM" },
                { name: "Ing. Patricia Rios", role: "Jefa de Proyectos", spec: "Líneas Aéreas AT/MT", initial: "PR" },
                { name: "Ing. Roberto Silva", role: "Asesor Comercial", spec: "Distribución Eléctrica", initial: "RS" },
                { name: "Ing. Ana Castillo", role: "Control de Calidad", spec: "Certificaciones IEC", initial: "AC" },
              ].map((persona, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#121A47] to-primary text-xl font-extrabold text-white shadow-lg">
                    {persona.initial}
                  </div>
                  <p className="font-bold text-[#121A47]">{persona.name}</p>
                  <p className="mt-0.5 text-xs font-semibold text-primary">{persona.role}</p>
                  <p className="mt-1.5 text-[11px] text-slate-500">{persona.spec}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA FINAL — DARK ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07091E] via-[#121A47] to-[#07091E]" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl px-4 py-20 text-center"
        >
          <motion.p variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">
            ¿Conociste nuestra empresa?
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
            Ahora conoce nuestro catálogo
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-slate-400">
            Más de 1,000 productos certificados para Alta y Media Tensión. Cotización técnica en menos de 24 horas.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/25 transition-all hover:scale-[1.03] hover:shadow-red-600/40"
            >
              Ver Catálogo
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/51123456789?text=Hola%2C%20quisiera%20hablar%20con%20un%20ingeniero%20sobre%20mi%20proyecto%20AT%2FMT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <IconWhatsApp className="h-4 w-4 text-green-400" />
              Hablar con un Ingeniero
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
