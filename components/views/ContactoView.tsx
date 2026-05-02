"use client"

import { useState } from "react"
import Link from "next/link"
import { useFadeInOnScroll } from "@/hooks/useAnimations"
import {
  IconPhone, IconMail, IconMapPin, IconClock, IconCheck,
  IconArrowRight, IconHeadphones,
} from "@/components/icons"

export function ContactoView() {
  const { ref, isVisible } = useFadeInOnScroll()
  const [formState, setFormState] = useState({
    nombre: "", empresa: "", email: "", telefono: "", asunto: "", mensaje: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      {/* Hero Contacto */}
      <section className="relative overflow-hidden bg-[#003D73] py-20">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">Contacto</span>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Cotizaciones y Asesoría Técnica AT/MT</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
            Cuéntanos tu proyecto. Nuestros ingenieros te ayudan a seleccionar los materiales eléctricos correctos antes de que arranque la obra.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section ref={ref} className={`py-16 ${isVisible ? "animate-reveal" : "opacity-0"}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-xl font-bold text-slate-900">Información de Contacto</h2>
              <div className="space-y-4">
                {[
                  { icon: IconPhone, title: "Teléfono", info: "XXX XXX XXX" },
                  { icon: IconMail, title: "Email", info: "XXXXXXX@XXXXX.com" },
                  { icon: IconMapPin, title: "Dirección", info: "XXXXXXX N° XXX - Int. XXX, XXXXX" },
                  { icon: IconClock, title: "Horario de Atención", info: "X-X: Xam-Xpm | XXX: Xam-Xpm" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.title}</p>
                      <p className="text-sm font-semibold text-slate-800 tracking-widest">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Formulario de Contacto</h2>

                {submitted ? (
                  <div className="rounded-xl bg-green-50 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <IconCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-green-800">Mensaje enviado</h3>
                    <p className="text-sm text-green-700">Nos pondremos en contacto en un plazo de 24 horas hábiles.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Nombre Completo *</label>
                        <input type="text" required value={formState.nombre} onChange={(e) => setFormState({...formState, nombre: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Empresa</label>
                        <input type="text" value={formState.empresa} onChange={(e) => setFormState({...formState, empresa: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nombre de empresa" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Email *</label>
                        <input type="email" required value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="correo@empresa.com" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Teléfono</label>
                        <input type="tel" value={formState.telefono} onChange={(e) => setFormState({...formState, telefono: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="+51 987 654 321" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Asunto *</label>
                      <select required value={formState.asunto} onChange={(e) => setFormState({...formState, asunto: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="">Selecciona un asunto</option>
                        <option value="cotizacion">Solicitar Cotización</option>
                        <option value="asesoria">Asesoría Técnica</option>
                        <option value="proyecto">Suministro para Proyecto</option>
                        <option value="general">Consulta General</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Mensaje *</label>
                      <textarea required rows={5} value={formState.mensaje} onChange={(e) => setFormState({...formState, mensaje: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Describe tu requerimiento..." />
                    </div>
                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-all hover:shadow-xl hover:shadow-[#FF6B35]/30">
                      <IconArrowRight className="h-4 w-4" />
                      Enviar Mensaje
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative bg-[#F5F7FA] pb-20 pt-16 border-b-[3px] border-[#FF6B35]/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-900">Encuéntranos</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
            <div className="flex h-80 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
              <div className="text-center">
                <IconMapPin className="mx-auto mb-3 h-12 w-12 text-primary" />
                <p className="text-sm font-semibold text-slate-700">XXXXXXX N° XXX - Int. XXX, XXXXX</p>
                <p className="text-xs text-slate-500">Lorem Ipsum, Lorem Ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
