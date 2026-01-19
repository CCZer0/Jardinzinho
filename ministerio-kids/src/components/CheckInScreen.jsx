// src/components/CheckInScreen.jsx
import React, { useState } from 'react';
import { buscarCrianca, realizarCheckIn } from '../services/attendanceService';

const CheckInScreen = () => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [checkInRealizado, setCheckInRealizado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBusca = async (e) => {
    e.preventDefault();
    if (busca.length < 3) return; // Evita buscas muito curtas

    setLoading(true);
    const lista = await buscarCrianca(busca);
    setResultados(lista);
    setLoading(false);
  };

  const confirmarEntrada = async (crianca) => {
    if (window.confirm(`Confirmar entrada de ${crianca.nome}?`)) {
      setLoading(true);
      const resultado = await realizarCheckIn(crianca);

      if (resultado.sucesso) {
        setCheckInRealizado({
          nome: crianca.nome,
          codigo: resultado.codigo
        });
        setResultados([]); // Limpa a busca
        setBusca('');
      } else {
        alert("Erro ao fazer check-in");
      }
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-00">Check-in Kids</h1>

      {/* Área de Sucesso (Etiqueta Virtual) */}
      {checkInRealizado && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded">
          <p className="font-bold text-green-700">Check-in Concluído!</p>
          <div className="mt-2 text-center bg-white p-4 border border-dashed border-gray-400">
            <h2 className="text-xl">{checkInRealizado.nome}</h2>
            <p className="text-4xl font-black mt-2">{checkInRealizado.codigo}</p>
            <span className="text-xs text-gray-500">Escreva este código na etiqueta</span>
          </div>
          <button
            onClick={() => setCheckInRealizado(null)}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded rounded-full"
          >
            Novo Check-in
          </button>
        </div>
      )}

      {/* Formulário de Busca */}
      <form onSubmit={handleBusca} className="mb-6">
        <input
          type="text"
          placeholder="Nome da criança..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          type="submit"
          className="btn-padrao mt-4"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Lista de Resultados */}
      <div className="space-y-3">
        {resultados.map((crianca) => (
          <div key={crianca.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center border">
            <div>
              <p className="font-bold text-lg">{crianca.nome}</p>
              <p className="text-sm text-gray-600">Resp: {crianca.nome_responsavel}</p>
              {crianca.alergias && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full mt-1 inline-block">
                  Alergia: {crianca.alergias}
                </span>
              )}
            </div>
            <button
              onClick={() => confirmarEntrada(crianca)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
            >
              Entrar
            </button>
          </div>
        ))}

        {resultados.length === 0 && busca.length > 2 && !loading && (
          <p className="text-center text-gray-500 mt-4">Nenhuma criança encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default CheckInScreen;