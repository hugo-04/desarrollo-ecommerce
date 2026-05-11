import { getEntidadesBancariasActivasAction } from "@/features/entidades-bancarias/actions"
import Link from "next/link"
import { IconWhatsApp } from "@/components/icons"
import { Mail } from "lucide-react"
import { CONTACT, WA } from "@/lib/contact"

export const metadata = {
  title: "Formas de Pago | Insumind",
  description: "Conoce nuestras formas de pago y cuentas bancarias oficiales.",
}

export default async function FormasDePagoPage() {
  const entidades = await getEntidadesBancariasActivasAction()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Título Principal (Barra Negra Superior) */}
      <div className="bg-black py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
            FORMAS DE PAGO
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 w-full flex-1 bg-white shadow-sm mt-6 mb-10 rounded-xl">
        {/* Sección: Transferencias */}
        <section>
          <h2 className="mb-10 text-lg md:text-xl font-bold uppercase text-slate-900 border-b pb-4">
            TRANSFERENCIA BANCARIA DIRECTAS
          </h2>

          {entidades.length === 0 ? (
            <p className="text-sm text-slate-500 py-8">No hay cuentas bancarias registradas por el momento.</p>
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:gap-x-16">
              {entidades.map((ent) => (
                <div key={ent.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-slate-100 p-6 rounded-xl hover:shadow-md transition-shadow">
                  
                  {/* Logo */}
                  <div className="flex h-20 w-36 shrink-0 items-center justify-center">
                    {ent.logo && ent.logo.startsWith("http") ? (
                      <img
                        src={ent.logo}
                        alt={ent.logoAlt ?? ent.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-bold text-slate-400">{ent.name}</span>
                    )}
                  </div>

                  {/* Detalles de la cuenta */}
                  <div className="flex-1 space-y-2 text-center sm:text-left text-sm text-slate-600">
                    <p className="text-[15px] font-bold text-slate-900 uppercase">
                      BANCO: {ent.name}
                    </p>
                    
                    {ent.nroCuenta && (
                      <p className="text-[13px]">
                        Número de cuenta: {ent.nroCuenta}
                      </p>
                    )}
                    
                    {ent.nroCci && (
                      <p className="text-[13px]">
                        CCI: {ent.nroCci}
                      </p>
                    )}
                    
                    {ent.tipoCuenta && (
                      <p className="text-[13px]">
                        Tipo de cuenta: {ent.tipoCuenta}
                      </p>
                    )}
                    
                    {ent.nombreCuenta && (
                      <p className="text-[13px]">
                        Nombre de Cuenta: {ent.nombreCuenta}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Banner de Contacto (Rojo) */}
      <div className="bg-[#E31818] py-8 w-full mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between md:justify-center gap-6 md:gap-12 text-center">
          <h3 className="text-white text-lg md:text-xl font-bold">
            ¿Necesitas ayuda de un especialista?.. Contáctanos
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href={WA.general} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-sm"
            >
              <IconWhatsApp className="w-5 h-5" />
              VÍA WHATSAPP
            </a>
            
            <Link 
              href="/contacto"
              className="flex items-center gap-2 bg-[#FFC107] hover:bg-[#ffb300] text-slate-900 px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-sm"
            >
              <Mail className="w-5 h-5" />
              CONTACTO
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
