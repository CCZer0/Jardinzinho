import React, { useState } from 'react';
import CheckInScreen from './components/CheckInScreen';
import CadastroScreen from './components/CadastroScreen';
import CheckoutScreen from './components/CheckoutScreen';

function App() {
  const [telaAtual, setTelaAtual] = useState('checkin');

  return (
    <div className="flex flex-col h-screen font-sans">
      
      {/* CABEÇALHO */}
      <header className="bg-white p-4 shadow-md text-center sticky top-0 z-20">
        <h1 className="text-xl font-black text-[#626827] uppercase tracking-wider">
          Ministério <span className="text-yellow-600">Kids</span>
        </h1>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-4 min-h-[400px]">
           {telaAtual === 'checkin' && <CheckInScreen />}
           {telaAtual === 'checkout' && <CheckoutScreen />}
           {telaAtual === 'cadastro' && <CadastroScreen />}
        </div>
      </main>

      {/* NAVEGAÇÃO (Menu de Baixo) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-[#626827] flex justify-around py-2 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        
        {/* Botão 1: Entrada */}
        <button 
          onClick={() => setTelaAtual('checkin')}
          className={`flex flex-col items-center justify-center w-full py-2 transition-all ${telaAtual === 'checkin' ? 'opacity-100 scale-105' : 'opacity-50'}`}
        >
          <span className="text-2xl mb-1">📋</span>
          <span className="text-[10px] font-bold text-[#626827] uppercase">Entrada</span>
        </button>

        {/* Botão 2: Em Sala */}
        <button 
          onClick={() => setTelaAtual('checkout')}
          className={`flex flex-col items-center justify-center w-full py-2 transition-all ${telaAtual === 'checkout' ? 'opacity-100 scale-105' : 'opacity-50'}`}
        >
          <span className="text-2xl mb-1">🎈</span>
          <span className="text-[10px] font-bold text-[#626827] uppercase">Em Sala</span>
        </button>

        {/* Botão 3: Novo */}
        <button 
          onClick={() => setTelaAtual('cadastro')}
          className={`flex flex-col items-center justify-center w-full py-2 transition-all ${telaAtual === 'cadastro' ? 'opacity-100 scale-105' : 'opacity-50'}`}
        >
          <span className="text-2xl mb-1">⭐</span>
          <span className="text-[10px] font-bold text-[#626827] uppercase">Novo</span>
        </button>

      </nav>
    </div>
  );
}

export default App;