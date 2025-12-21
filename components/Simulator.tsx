
import React, { useState, useMemo } from 'react';
import { Purifier, Refill } from '../types';

interface SimulatorProps {
  purifiers: Purifier[];
  refills: Refill[];
  onBack: () => void;
}

const Simulator: React.FC<SimulatorProps> = ({ purifiers, refills, onBack }) => {
  const [jugsPerWeek, setJugsPerWeek] = useState<number>(2);
  const [jugPrice, setJugPrice] = useState<number>(12);
  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(purifiers[0]?.id || '');
  const [selectedRefillId, setSelectedRefillId] = useState<string>(refills[0]?.id || '');

  const selectedPurifier = purifiers.find(p => p.id === selectedPurifierId);
  const selectedRefill = refills.find(r => r.id === selectedRefillId);

  const results = useMemo(() => {
    if (!selectedPurifier || !selectedRefill) return null;

    // Galão calculation
    const weeklyGalonCost = jugsPerWeek * jugPrice;
    const year1GalonCost = weeklyGalonCost * 52.14; // Precise weeks in a year
    const year5GalonCost = year1GalonCost * 5;

    // Purifier calculation
    // Year 1: Purchase price (includes 6 months) + 1 change of refills at month 6
    const refillChangeCost = selectedRefill.price * selectedPurifier.refillCount;
    const year1PurifierCost = selectedPurifier.price + refillChangeCost;
    
    // Year 5: 60 months. 
    // Changes at month 6, 12, 18, 24, 30, 36, 42, 48, 54. (Total 9 changes)
    const year5PurifierCost = selectedPurifier.price + (9 * refillChangeCost);

    return {
      galon1y: year1GalonCost,
      galon5y: year5GalonCost,
      purific1y: year1PurifierCost,
      purific5y: year5PurifierCost,
      save1y: year1GalonCost - year1PurifierCost,
      save5y: year5GalonCost - year5PurifierCost
    };
  }, [jugsPerWeek, jugPrice, selectedPurifier, selectedRefill]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-cyan-600 font-bold flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Voltar
        </button>
        <h2 className="text-lg font-bold text-slate-800">Simulador de Economia</h2>
      </div>

      <section className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-cyan-900 mb-1">Garrafões por semana?</label>
          <input 
            type="number" 
            value={jugsPerWeek}
            onChange={(e) => setJugsPerWeek(Number(e.target.value))}
            className="w-full p-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-cyan-900 mb-1">Preço por garrafão (R$)</label>
          <input 
            type="number" 
            value={jugPrice}
            onChange={(e) => setJugPrice(Number(e.target.value))}
            className="w-full p-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 outline-none transition-colors"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Qual Purificador?</label>
          <select 
            value={selectedPurifierId}
            onChange={(e) => setSelectedPurifierId(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none transition-colors"
          >
            {purifiers.map(p => (
              <option key={p.id} value={p.id}>{p.description} (R$ {p.price.toFixed(2)})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Qual Refil você usará?</label>
          <select 
            value={selectedRefillId}
            onChange={(e) => setSelectedRefillId(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none transition-colors"
          >
            {refills.map(r => (
              <option key={r.id} value={r.id}>{r.description} (R$ {r.price.toFixed(2)})</option>
            ))}
          </select>
          <p className="text-[10px] text-gray-500 mt-1">* Os refis são trocados a cada 6 meses.</p>
        </div>
      </section>

      {results && (
        <div className="flex flex-col gap-4 mt-2">
          {/* 1 Year Result Section */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest ml-1">Resultado em 1 Ano</span>
            <div className="bg-white border-2 border-green-500 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Gasto com Galão:</span>
                  <span className="font-semibold text-red-500">R$ {results.galon1y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Gasto com Purific:</span>
                  <span className="font-semibold text-blue-500">R$ {results.purific1y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="h-px bg-gray-100 my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Economia Total:</span>
                  <span className={`text-xl font-black ${results.save1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {Math.abs(results.save1y).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Years Result Section */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-widest ml-1">Previsão em 5 Anos</span>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg relative transform hover:scale-[1.01] transition-transform">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Economia Estimada</span>
                <h3 className="text-3xl font-black tracking-tight">R$ {results.save5y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                <p className="text-xs opacity-90 mt-2 font-medium">Você deixa de gastar R$ {results.galon5y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com galões!</p>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                  <path d="M11.774 4.035a.5.5 0 0 1 .196.657L10.132 8l1.838 3.308a.5.5 0 0 1-.87.493L9.33 8.5H6.67l-1.77 3.301a.5.5 0 1 1-.87-.493L5.868 8l-1.838-3.308a.5.5 0 1 1 .87-.493L6.67 7.5h2.66l1.77-3.301a.5.5 0 0 1 .674-.164z"/>
                </svg>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open(`https://wa.me/5581992657235?text=Olá! Fiz a simulação e vi que posso economizar R$ ${results.save5y.toFixed(2)} em 5 anos. Quero saber mais sobre o ${selectedPurifier?.description}!`, '_blank')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
             Pedir meu Purificador agora
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
               <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607z"/>
             </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Simulator;
