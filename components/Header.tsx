
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-4 text-center rounded-b-3xl shadow-lg">
      <div className="flex flex-col items-center">
        <div className="bg-white p-2 rounded-full mb-2 shadow-inner">
           <svg viewBox="0 0 100 120" className="w-12 h-12 fill-cyan-600">
             <path d="M50 0C25 35 15 55 15 75C15 95 31 110 50 110C69 110 85 95 85 75C85 55 75 35 50 0ZM50 100C36 100 25 89 25 75C25 64 30 52 50 25C70 52 75 64 75 75C75 89 64 100 50 100Z" />
             <path d="M70 15C60 25 55 35 55 45C55 55 62 62 70 62C78 62 85 55 85 45C85 35 80 25 70 15Z" opacity="0.6"/>
           </svg>
        </div>
        <h1 className="text-xl font-black tracking-wider uppercase">Alcalina Pura</h1>
        <p className="text-[10px] opacity-90 uppercase font-medium tracking-widest mt-1">Franqueado Purific</p>
        <div className="h-0.5 w-12 bg-cyan-300 mt-2 rounded-full"></div>
        <p className="text-xs mt-1 font-light italic">Purificadores de Água Alcalina e Refis</p>
      </div>
    </header>
  );
};

export default Header;
