"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ROIChartProps {
  roiEstimation: string;
}

const data = [
  {
    name: 'Processus Standard',
    'Coûts / Temps': 100,
    fill: '#94a3b8'
  },
  {
    name: 'Processus Optimisé par IA',
    'Coûts / Temps': 35,
    fill: '#4f46e5'
  }
];

export default function ROIChart({ roiEstimation }: ROIChartProps) {
  return (
    <section className="py-24 bg-slate-50 sm:py-32" id="roi">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Projection du Retour sur Investissement</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Une estimation basée sur les standards de l'industrie pour votre secteur.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 h-80 bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="Coûts / Temps" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <TrendingUp className="w-10 h-10 text-indigo-200 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Notre Estimation</h3>
              <p className="text-lg text-indigo-100 leading-relaxed font-medium">
                {roiEstimation}
              </p>
              <div className="mt-8 pt-6 border-t border-indigo-500/30">
                <p className="text-sm text-indigo-200">
                  * Ces projections sont basées sur notre analyse de votre modèle d'affaires et les gains typiques observés suite à l'intégration de nos modèles IA.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
