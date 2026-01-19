import React, { useState } from 'react';
import CheckInScreen from './components/CheckInScreen';
import CadastroScreen from './components/CadastroScreen';
import CheckoutScreen from './components/CheckoutScreen';

function App() {
  const [telaAtual, setTelaAtual] = useState('checkin');

  return (
    // Fundo com gradiente suave (bg-gradient) para ficar mais bonito
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      
      {/* Cabeçalho Fixo */}
      <header className="bg-white p-4 shadow-sm text-center border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-black text-blue-600 tracking-tighter">
          MINISTÉRIO<span className="text-purple-500">KIDS</span> ✝️
        </h1>
      </header>

      {/* Área Principal */}
      <main className="flex-1 overflow-y-auto">
        {telaAtual === 'checkin' && <CheckInScreen />}
        {telaAtual === 'checkout' && <CheckoutScreen />}
        {telaAtual === 'cadastro' && <CadastroScreen />}
      </main>

      {/* Navegação Inferior Estilizada */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around pb-4 pt-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-50">
        
        <NavButton 
          active={telaAtual === 'checkin'} 
          onClick={() => setTelaAtual('checkin')} 
          icon="📋" 
          label="Entrada" 
        />
        
        <NavButton 
          active={telaAtual === 'checkout'} 
          onClick={() => setTelaAtual('checkout')} 
          icon="🎈" 
          label="Em Sala" 
        />

        <NavButton 
          active={telaAtual === 'cadastro'} 
          onClick={() => setTelaAtual('cadastro')} 
          icon="➕" 
          label="Novo" 
        />

      </nav>
    </div>
  );
}

// Componente botão menor para organizar o código
const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center px-4 transition-all duration-300 ${active ? 'scale-110 -translate-y-1' : 'opacity-60 grayscale'}`}
  >
    <div className={`text-2xl mb-1 ${active ? 'drop-shadow-md' : ''}`}>{icon}</div>
    <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-blue-600' : 'text-gray-400'}`}>
      {label}
    </span>
  </button>
);

export default App;