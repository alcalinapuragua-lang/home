
import React, { useState, useEffect } from 'react';
import { UserRole, Purifier, Refill } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Simulator from './components/Simulator';
import ManagerDashboard from './components/ManagerDashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Initial state from localStorage or defaults
  const [purifiers, setPurifiers] = useState<Purifier[]>(() => {
    const saved = localStorage.getItem('purifiers');
    return saved ? JSON.parse(saved) : [
      { id: '1', description: 'Purific Saúde', refillCount: 2, price: 450.00 },
      { id: '2', description: 'Purific Ecológico', refillCount: 1, price: 290.00 }
    ];
  });

  const [refills, setRefills] = useState<Refill[]>(() => {
    const saved = localStorage.getItem('refills');
    return saved ? JSON.parse(saved) : [
      { id: '1', description: 'Refil Purific Camadas', price: 65.00 },
      { id: '2', description: 'Refil Purific Alcalino', price: 85.00 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('purifiers', JSON.stringify(purifiers));
  }, [purifiers]);

  useEffect(() => {
    localStorage.setItem('refills', JSON.stringify(refills));
  }, [refills]);

  const handleLogout = () => {
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative pb-24">
      <Header />
      
      <main className="flex-grow p-4">
        {!role ? (
          <div className="flex flex-col gap-4 py-10">
            <h2 className="text-2xl font-bold text-center text-cyan-800 mb-4">Bem-vindo à Alcalina Pura</h2>
            <button 
              onClick={() => setRole('client')}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95"
            >
              Sou Cliente (Simular Economia)
            </button>
            <button 
              onClick={() => setRole('manager')}
              className="w-full border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 font-bold py-4 rounded-xl transition-all transform active:scale-95"
            >
              Área do Gerente
            </button>
          </div>
        ) : role === 'manager' && !isLoggedIn ? (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} onCancel={() => setRole(null)} />
        ) : role === 'manager' ? (
          <ManagerDashboard 
            purifiers={purifiers} 
            refills={refills}
            setPurifiers={setPurifiers}
            setRefills={setRefills}
            onLogout={handleLogout}
          />
        ) : (
          <Simulator 
            purifiers={purifiers} 
            refills={refills} 
            onBack={() => setRole(null)} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
