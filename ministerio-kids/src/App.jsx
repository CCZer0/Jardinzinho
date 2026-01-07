import React, { useState } from 'react';
import CheckInScreen from './components/CheckInScreen';
import CadastroScreen from './components/CadastroScreen';

function App() {
  const [telaAtual, setTelaAtual] = useState('checkin');

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <main className="flex-1 overflow-y-auto">
        {telaAtual === 'checkin' && <CheckInScreen />}
        {telaAtual === 'cadastro' && <CadastroScreen />}
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 shadow-lg z-50">
        <button onClick={() => setTelaAtual('checkin')} className={`flex flex-col items-center px-4 ${telaAtual === 'checkin' ? 'text-blue-600' : 'text-gray-400'}`}>
          <span className="text-2xl">📋</span><span className="text-xs font-bold">Check-in</span>
        </button>
        <button onClick={() => setTelaAtual('cadastro')} className={`flex flex-col items-center px-4 ${telaAtual === 'cadastro' ? 'text-purple-600' : 'text-gray-400'}`}>
          <span className="text-2xl">➕</span><span className="text-xs font-bold">Cadastro</span>
        </button>
      </nav>
    </div>
  );
}
export default App;