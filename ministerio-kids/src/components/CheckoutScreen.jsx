import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Importa o banco
import { collection, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'; 

const CheckoutScreen = () => {
  const [criancas, setCriancas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. BUSCAR DADOS EM TEMPO REAL ---
  useEffect(() => {
    // Cria uma query ordenando pela data de entrada (mais recentes primeiro)
    const q = query(collection(db, "checkins"), orderBy("data", "desc"));

    // onSnapshot fica "escutando" o banco. Qualquer mudança, ele roda esse código:
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id, // O ID do documento (importante para apagar depois)
        ...doc.data()
      }));

      setCriancas(lista);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar checkins:", error);
      setLoading(false);
    });

    // Limpa o ouvinte quando sair da tela
    return () => unsubscribe();
  }, []);

  // --- 2. FUNÇÃO DE LIBERAR (DELETAR O CHECK-IN) ---
  const handleLiberar = async (crianca) => {
    if (window.confirm(`Entregar ${crianca.nome} ao responsável?`)) {
      try {
        // Remove o documento da coleção "checkins"
        await deleteDoc(doc(db, "checkins", crianca.id));
        // Não precisa chamar carregarLista() aqui, o onSnapshot atualiza a tela sozinho!
      } catch (error) {
        console.error("Erro ao dar saída:", error);
        alert("Erro ao realizar saída.");
      }
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-gray-700">Turminha Atual</h2>
        <span className="bg-pink-100 text-pink-600 border border-pink-200 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
          {criancas.length} Crianças
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 opacity-60">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-2"></div>
            <p>Carregando...</p>
        </div>
      ) : criancas.length === 0 ? (
        <div className="text-center py-16 opacity-50 flex flex-col items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" className="w-24 h-24 mb-4 grayscale" alt="Vazio" />
          <p className="font-medium text-gray-500">A sala está vazia!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {criancas.map((item) => (
            // CARD ESTILIZADO
            <div key={item.id} className="bg-white border-2 border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] rounded-2xl p-4 flex items-center relative overflow-hidden transition-transform transform hover:scale-[1.02]">

              {/* Avatar Automático com as Iniciais */}
              <img
                src={`https://ui-avatars.com/api/?name=${item.nome}&background=random&color=fff&rounded=true&bold=true`} 
                alt="Avatar"
                className="w-12 h-12 mr-4 shadow-sm"
              />

              {/* Detalhes */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 leading-tight">{item.nome}</h3>

                {/* Nota: Se você não salvou o responsável no CheckInScreen anterior, este campo pode vir vazio.
                    Sugestão: Adicione 'responsavel' ao salvar no CheckInScreen se quiser que apareça aqui. */}
                <p className="text-xs text-gray-400 uppercase mt-1">Turma</p>
                <p className="text-sm text-gray-600 font-medium">{item.turma || "Não informado"}</p>
              </div>

              {/* Código e Botão */}
              <div className="flex flex-col items-end gap-2 pl-2 border-l border-dashed border-gray-200">
                <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 text-center w-full">
                  <p className="text-[10px] text-blue-400 font-bold">CÓDIGO</p>
                  <p className="text-xl font-black text-blue-600 tracking-wider">{item.codigo}</p>
                </div>

                <button
                  onClick={() => handleLiberar(item)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold py-2 px-4 rounded-lg w-full transition-colors"
                >
                  SAÍDA
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