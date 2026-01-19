import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Conexão com o banco
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Funções do banco

const CheckInScreen = () => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [checkInRealizado, setCheckInRealizado] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- 1. LÓGICA DE BUSCA NO FIREBASE ---
  const handleBusca = async (e) => {
    e.preventDefault();
    if (busca.length < 2) return; // Evita buscas muito curtas

    setLoading(true);
    try {
      // Baixa a lista de crianças do banco
      const querySnapshot = await getDocs(collection(db, "criancas"));
      const listaCompleta = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filtra pelo nome digitado
      const filtrados = listaCompleta.filter(crianca =>
        crianca.nome.toLowerCase().includes(busca.toLowerCase())
      );

      setResultados(filtrados);
    } catch (error) {
      console.error("Erro ao buscar:", error);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. LÓGICA DE CONFIRMAR ENTRADA ---
  const confirmarEntrada = async (crianca) => {
    if (window.confirm(`Confirmar entrada de ${crianca.nome}?`)) {
      setLoading(true);

      try {
        // Gera um código simples para a etiqueta (Ex: D-492)
        const codigoGerado = crianca.nome.charAt(0).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);

        // Opcional: Salva no histórico de "checkins" no banco
        await addDoc(collection(db, "checkins"), {
          nome: crianca.nome,
          turma: crianca.turma,
          data: new Date(),
          codigo: codigoGerado
        });

        // Mostra a tela de sucesso
        setCheckInRealizado({
          nome: crianca.nome,
          codigo: codigoGerado
        });

        // Limpa a busca
        setResultados([]);
        setBusca('');

      } catch (error) {
        alert("Erro ao fazer check-in");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#626827]">Check-in Kids</h1>

      {/* --- ÁREA DE SUCESSO (ETIQUETA) --- */}
      {checkInRealizado && (
        <div className="bg-green-50 border-l-4 border-[#626827] p-4 mb-6 rounded shadow-md animate-bounce-short">
          <p className="font-bold text-[#626827]">Check-in Concluído!</p>

          <div className="mt-2 text-center bg-white p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800">{checkInRealizado.nome}</h2>
            <p className="text-5xl font-black mt-2 text-[#626827] tracking-widest">{checkInRealizado.codigo}</p>
            <span className="text-xs text-gray-500 uppercase mt-2 block">Escreva este código na etiqueta</span>
          </div>

          <button
            onClick={() => setCheckInRealizado(null)}
            className="w-full mt-4 bg-[#626827] text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
          >
            Fazer Novo Check-in
          </button>
        </div>
      )}

      {/* --- FORMULÁRIO DE BUSCA --- */}
      {!checkInRealizado && (
        <form onSubmit={handleBusca} className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Buscar Criança</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite o nome..."
              className="input-padrao flex-1"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#626827] text-white px-4 rounded-xl font-bold shadow-md active:scale-95 transition-all"
            >
              {loading ? '...' : 'Buscar'}
            </button>
          </div>
        </form>
      )}

      {/* --- LISTA DE RESULTADOS --- */}
      <div className="space-y-3">
        {resultados.map((crianca) => (
          <div key={crianca.id} className="p-4 bg-white shadow-sm hover:shadow-md transition-all rounded-2xl flex justify-between items-center border border-gray-100">
            <div>
              <p className="font-bold text-lg text-gray-800">{crianca.nome}</p>

              {/* Ajustei aqui para usar os nomes corretos do seu banco */}
              <p className="text-sm text-gray-500">Resp: <span className="font-semibold">{crianca.responsavel}</span></p>

              <p className="text-xs text-[#626827] font-bold mt-1 bg-[#f4f6e1] px-2 py-0.5 rounded-md w-fit">
                {crianca.turma}
              </p>

              {crianca.alergia && (
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full mt-1 inline-block font-bold border border-red-200">
                  ⚠️ {crianca.alergia}
                </span>
              )}
            </div>

            <button
              onClick={() => confirmarEntrada(crianca)}
              className="bg-[#626827] text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-[#4f5320] transition-colors"
            >
              Entrar
            </button>
          </div>
        ))}

        {resultados.length === 0 && busca.length > 2 && !loading && !checkInRealizado && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-lg">😕 Nenhuma criança encontrada.</p>
            <p className="text-sm text-gray-400">Verifique se o nome está correto.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInScreen;