import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FeaturesProps {
  painPoints: string[];
  aiOpportunities: string[];
}

export default function Features({ painPoints, aiOpportunities }: FeaturesProps) {
  return (
    <section className="py-24 bg-white sm:py-32" id="solutions">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Vos Défis vs. Nos Solutions IA</h2>
          <p className="mt-4 text-lg text-slate-600">
            Nous transformons vos goulots d'étranglement opérationnels en avantages concurrentiels mesurables.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Pain Points */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-red-50/50 rounded-3xl p-8 border border-red-100 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-red-800 mb-8 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                Défis Actuels
              </h3>
              <ul className="space-y-6">
                {painPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-x-3 text-base text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Opportunities */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-indigo-900 mb-8 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-3 text-indigo-600" />
                Solutions IA Proposées
              </h3>
              <ul className="space-y-6">
                {aiOpportunities.map((opp, idx) => (
                  <li key={idx} className="flex gap-x-3 text-base text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
