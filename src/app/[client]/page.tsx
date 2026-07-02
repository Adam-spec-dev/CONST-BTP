import { notFound } from 'next/navigation';
import { clients } from '@/data/clients';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ROIChart from '@/components/ROIChart';

export function generateStaticParams() {
  return clients.map((client) => ({
    client: client.id,
  }));
}

export default async function ClientPage({ params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const clientData = clients.find((c) => c.id === client);

  if (!clientData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Votre Agence IA</span>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Agence IA</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <span className="text-sm font-semibold leading-6 text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              Proposition Confidentielle
            </span>
          </div>
        </nav>
      </header>

      <Hero clientName={clientData!.name} pitch={clientData!.pitch} />
      
      <Features 
        painPoints={clientData!.painPoints} 
        aiOpportunities={clientData!.aiOpportunities} 
      />

      <ROIChart roiEstimation={clientData!.roiEstimation} />

      {/* CTA Section */}
      <section className="bg-white py-24 sm:py-32" id="contact">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center bg-indigo-50 rounded-3xl p-12 border border-indigo-100 shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Prêt à transformer vos opérations ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Un simple échange de 15 minutes suffira pour valider ensemble le potentiel de l'IA pour {clientData!.name}.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="mailto:contact@votre-agence.dz"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105"
              >
                Prendre Rendez-vous
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-center">
          <p className="text-sm text-slate-400">© 2026 Agence IA Algérie. Propulsé par ui-ux-pro-max.</p>
        </div>
      </footer>
    </main>
  );
}
