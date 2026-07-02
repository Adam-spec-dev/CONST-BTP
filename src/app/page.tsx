import { clients } from '@/data/clients';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Portail de Prospection (Agence IA)
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Pages d'atterrissage personnalisées pour les 17 prospects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Link key={client.id} href={`/${client.id}`}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-slate-900">{client.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.tier === 'A' ? 'bg-green-100 text-green-800' :
                    client.tier === 'B' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    Tier {client.tier}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{client.sector}</p>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <span className="text-indigo-600 text-sm font-semibold flex items-center">
                    Voir la page <span aria-hidden="true" className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
