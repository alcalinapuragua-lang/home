
import React, { useState } from 'react';
import { Purifier, Refill } from '../types';

interface ManagerDashboardProps {
  purifiers: Purifier[];
  refills: Refill[];
  setPurifiers: React.Dispatch<React.SetStateAction<Purifier[]>>;
  setRefills: React.Dispatch<React.SetStateAction<Refill[]>>;
  onLogout: () => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ 
  purifiers, refills, setPurifiers, setRefills, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'purifiers' | 'refills'>('purifiers');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    description: '',
    price: 0,
    refillCount: 1 as 1 | 2
  });

  const handleSavePurifier = () => {
    if (!formData.description || formData.price <= 0) return;

    if (editingId) {
      setPurifiers(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      setPurifiers(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleSaveRefill = () => {
    if (!formData.description || formData.price <= 0) return;

    if (editingId) {
      setRefills(prev => prev.map(r => r.id === editingId ? { ...r, description: formData.description, price: formData.price } : r));
    } else {
      setRefills(prev => [...prev, { id: Date.now().toString(), description: formData.description, price: formData.price }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ description: '', price: 0, refillCount: 1 });
    setEditingId(null);
  };

  const deleteItem = (id: string, type: 'p' | 'r') => {
    if (type === 'p') setPurifiers(prev => prev.filter(item => item.id !== id));
    else setRefills(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Dashboard Gerente</h2>
        <button onClick={onLogout} className="text-red-500 font-bold text-sm underline">Sair</button>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl">
        <button 
          onClick={() => { setActiveTab('purifiers'); resetForm(); }}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'purifiers' ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}
        >
          Purificadores
        </button>
        <button 
          onClick={() => { setActiveTab('refills'); resetForm(); }}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'refills' ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}
        >
          Refis
        </button>
      </div>

      <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100 flex flex-col gap-3">
        <h3 className="font-bold text-cyan-900 text-sm">{editingId ? 'Editar Item' : 'Novo Item'}</h3>
        <input 
          placeholder="Descrição"
          className="w-full p-2 rounded-lg border border-cyan-200 outline-none"
          value={formData.description}
          onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
        />
        <input 
          type="number"
          placeholder="Preço (R$)"
          className="w-full p-2 rounded-lg border border-cyan-200 outline-none"
          value={formData.price || ''}
          onChange={e => setFormData(prev => ({...prev, price: Number(e.target.value)}))}
        />
        {activeTab === 'purifiers' && (
          <select 
            className="w-full p-2 rounded-lg border border-cyan-200 outline-none bg-white"
            value={formData.refillCount}
            onChange={e => setFormData(prev => ({...prev, refillCount: Number(e.target.value) as 1 | 2}))}
          >
            <option value={1}>1 Refil por troca</option>
            <option value={2}>2 Refis por troca</option>
          </select>
        )}
        <div className="flex gap-2 mt-2">
          <button 
            onClick={activeTab === 'purifiers' ? handleSavePurifier : handleSaveRefill}
            className="flex-1 bg-cyan-600 text-white font-bold py-2 rounded-lg shadow-md"
          >
            {editingId ? 'Salvar Alteração' : 'Adicionar'}
          </button>
          {editingId && <button onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600">Cancelar</button>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-slate-700 text-sm">Lista de Produtos</h3>
        {(activeTab === 'purifiers' ? purifiers : refills).map(item => (
          <div key={item.id} className="bg-white border border-gray-200 p-3 rounded-xl flex justify-between items-center group">
            <div>
              <p className="font-bold text-slate-800">{item.description}</p>
              <p className="text-xs text-cyan-600">R$ {item.price.toFixed(2)} {'refillCount' in item ? `(${item.refillCount} refis)` : ''}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setEditingId(item.id);
                  setFormData({
                    description: item.description,
                    price: item.price,
                    refillCount: 'refillCount' in item ? (item as Purifier).refillCount : 1
                  });
                }}
                className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </button>
              <button 
                onClick={() => deleteItem(item.id, activeTab === 'purifiers' ? 'p' : 'r')}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
