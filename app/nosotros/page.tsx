"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { clients } from "@/lib/data"
import {
  IconShield, IconTruck, IconClock, IconHeadphones, IconBuilding,
  IconArrowRight, IconCertificate, IconCheck, IconBolt, IconZap,
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
              <p className="mb-4 text-sm leading-[1.85] text-slate-600">
                Electro Thina nació con la visión de convertirse en el principal distribuidor de materiales electricos para lineas de alta y media tension en Peru. A lo largo de dos decadas, hemos construido relaciones solidas con los principales fabricantes internacionales.
              </p>
              <p className="mb-8 text-sm leading-[1.85] text-slate-600">
                Nuestro compromiso con la calidad, el servicio tecnico especializado y la disponibilidad de stock nos ha posicionado como el socio estrategico preferido por empresas de distribucion electrica, proyectos de electrificacion rural y operaciones mineras.
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
    </>
  )
}
