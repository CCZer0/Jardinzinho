import React, { useState } from 'react';
import CheckInScreen from './components/CheckInScreen';
import CadastroScreen from './components/CadastroScreen';
import CheckoutScreen from './components/CheckoutScreen';

function App() {
  const [telaAtual, setTelaAtual] = useState('checkin');

  return (
    // Removemos o 'bg-gradient' daqui porque já colocamos no index.css
    <div className="flex flex-col h-screen font-sans">

      {/* CABEÇALHO */}
      <header className="bg-white/80 backdrop-blur-md p-3 shadow-lg text-center rounded-b-3xl mx-2 mt-2 border-b-4 border-blue-200 sticky top-0 z-20">
        {/* CORREÇÃO DA IMAGEM: Adicionei style={{ width: 60 }} para travar o tamanho */}
        <img
          src="..\src\assets\ELEMENTOS-19 MARCA JARDIM CREME.PNG"
          alt="Logo Kids"
          style={{ width: 'auto', height: '60px' }}
          className="mx-auto mb-2 drop-shadow-md"
        />
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter drop-shadow-sm">
          MINISTÉRIO<span className="text-pink-500">KIDS</span> ✝️
        </h1>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-4 pb-28">
        {/* Fundo branco transparente para ler o texto melhor */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-2 min-h-[400px] border border-white">
          {telaAtual === 'checkin' && <CheckInScreen />}
          {telaAtual === 'checkout' && <CheckoutScreen />}
          {telaAtual === 'cadastro' && <CadastroScreen />}
        </div>
      </main>

      {/* NAVEGAÇÃO INFERIOR */}
      <nav className="fixed bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex justify-around pb-6 pt-3 z-50">
        <NavButton active={telaAtual === 'checkin'} onClick={() => setTelaAtual('checkin')} icon="📋" label="Entrada" color="text-blue-600"/>
        <NavButton active={telaAtual === 'checkout'} onClick={() => setTelaAtual('checkout')} icon="🎈" label="Em Sala" color="text-pink-600"/>
        <NavButton active={telaAtual === 'cadastro'} onClick={() => setTelaAtual('cadastro')} icon="⭐" label="Novo" color="text-yellow-500"/>
      </nav>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label, color }) => (
  <button onClick={onClick} className={`flex flex-col items-center px-4 transition-all ${active ? 'scale-110 -translate-y-1' : 'opacity-50 grayscale'}`}>
    <div className={`text-3xl mb-1 ${active ? 'animate-bounce' : ''}`}>{icon}</div>
    <span className={`text-[10px] font-black uppercase tracking-wider ${active ? color : 'text-gray-400'}`}>{label}</span>
  </button>
);

export default App;