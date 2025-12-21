
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Parati1997') {
      onLoginSuccess();
    } else {
      setError('Senha incorreta!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-bold text-slate-800 text-center mb-6">Acesso Administrativo</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input 
              type="password"
              placeholder="Digite a senha do Gerente"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${error ? 'border-red-400' : 'border-gray-100 focus:border-cyan-500'}`}
            />
            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
          </div>
          <button className="bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
            Entrar
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="text-gray-400 font-medium text-sm mt-2 hover:text-gray-600"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
