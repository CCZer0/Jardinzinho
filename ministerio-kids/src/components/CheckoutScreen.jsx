import React, { useEffect, useState } from 'react';
import { listarPresentes, realizarCheckOut } from '../services/attendanceService';

const CheckoutScreen = () => {
  const [criancas, setCriancas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarLista = async () => {
    setLoading(true);
    const lista = await listarPresentes();
    setCriancas(lista);
    setLoading(false);
  };

  useEffect(() => {
    carregarLista();
  }, []);

  const handleLiberar = async (crianca) => {
    if (window.confirm(`Entregar ${crianca.nome_crianca} ao responsável?`)) {
      const res = await realizarCheckOut(crianca.id_checkin);
      if (res.sucesso) {
        carregarLista(); // Recarrega a lista para sumir com a criança
      } else {
        alert("Erro ao liberar.");
      }
    }
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crianças em Sala</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
          {criancas.length} Presentes
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Carregando turminha...</p>
      ) : criancas.length === 0 ? (
        <div className="text-center py-10 opacity-50">
          <p className="text-4xl mb-2">🎈</p>
          <p>Nenhuma criança na sala agora.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {criancas.map((item) => (
            <div key={item.id_checkin} className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-4 flex justify-between items-center relative overflow-hidden">
              
              {/* Detalhes da Criança */}
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.nome_crianca}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Responsável</p>
                <p className="text-sm text-gray-700 font-medium">{item.responsavel_nome}</p>
              </div>

              {/* Código de Segurança e Botão */}
              <div className="text-right flex flex-col items-end gap-2">
                <div className="bg-gray-100 px-3 py-1 rounded border border-gray-200">
                   <p className="text-xs text-gray-400 text-center">CÓDIGO</p>
                   <p className="text-xl font-black text-blue-600 tracking-wider">{item.codigo_seguranca}</p>
                </div>
                
                <button 
                  onClick={() => handleLiberar(item)}
                  className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  Liberar Saída
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;
