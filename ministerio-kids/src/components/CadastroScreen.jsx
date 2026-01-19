import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // <--- Importamos o banco de dados
import { collection, addDoc } from 'firebase/firestore'; // <--- Funções para salvar

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alergia, setAlergia] = useState('');

  // Estados automáticos
  const [idade, setIdade] = useState('');
  const [turma, setTurma] = useState('');

  // Estado de carregamento (Loading)
  const [carregando, setCarregando] = useState(false);

  // Cálculo de Idade (Mesma lógica de antes)
  useEffect(() => {
    if (dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeCalculada--;
      }
      setIdade(idadeCalculada);

      if (idadeCalculada <= 3) setTurma('Kids 1 (0-3 anos)');
      else if (idadeCalculada <= 6) setTurma('Kids 2 (4-6 anos)');
      else if (idadeCalculada <= 9) setTurma('Kids 3 (7-9 anos)');
      else setTurma('Teens (10+ anos)');

    } else {
      setIdade('');
      setTurma('');
    }
  }, [dataNascimento]);

  // --- FUNÇÃO DE SALVAR NO FIREBASE ---
  const handleSalvar = async () => {
    if (!nome || !telefone || !dataNascimento) {
      alert("Preencha Nome, Data e Telefone!");
      return;
    }

    setCarregando(true); // Ativa o "Carregando..."

    try {
      // Cria o pacote de dados
      const novaCrianca = {
        nome,
        dataNascimento,
        idade,
        turma,
        responsavel,
        telefone,
        alergia,
        dataCadastro: new Date() // Bom para saber quando foi cadastrado
      };

      // COMANDO QUE SALVA NO FIREBASE:
      // Salva na coleção chamada "criancas"
      await addDoc(collection(db, "criancas"), novaCrianca);

      alert("✅ Cadastrado com Sucesso!");

      // Limpar campos
      setNome('');
      setDataNascimento('');
      setResponsavel('');
      setTelefone('');
      setAlergia('');

    } catch (error) {
      console.error("Erro ao salvar: ", error);
      alert("❌ Erro ao salvar. Verifique sua internet ou a configuração do Firebase.");
    } finally {
      setCarregando(false); // Desativa o "Carregando..."
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#626827] text-center mb-2">Novo Cadastro</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">Nome da Criança</label>
        <input type="text" placeholder="Ex: Davi Silva" className="input-padrao"
          value={nome} onChange={(e) => setNome(e.target.value)} disabled={carregando}
        />
      </div>

      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
        <label className="block text-sm font-semibold text-gray-600 mb-1">Data de Nascimento</label>
        <input type="date" className="input-padrao mb-2"
          value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} disabled={carregando}
        />

        {idade !== '' && (
          <div className="flex gap-2 mt-2">
            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex-1 text-center">
              <span className="block text-xs text-gray-500 uppercase font-bold">Idade</span>
              <span className="text-lg font-black text-[#626827]">{idade} anos</span>
            </div>
            <div className="bg-[#626827] p-2 rounded-lg shadow-sm flex-[2] text-center flex flex-col justify-center">
              <span className="block text-xs text-white/80 uppercase font-bold">Sala Destino</span>
              <span className="text-lg font-black text-white">{turma}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Responsável</label>
          <input type="text" placeholder="Nome da mãe/pai" className="input-padrao"
            value={responsavel} onChange={(e) => setResponsavel(e.target.value)} disabled={carregando}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">WhatsApp</label>
          <input type="tel" placeholder="(00) 00000-0000" className="input-padrao"
            value={telefone} onChange={(e) => setTelefone(e.target.value)} disabled={carregando}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">Observações</label>
        <textarea placeholder="Alergias / Cuidados" className="input-padrao h-20 resize-none"
          value={alergia} onChange={(e) => setAlergia(e.target.value)} disabled={carregando}
        />
      </div>

      <button 
        onClick={handleSalvar} 
        disabled={carregando}
        className={`btn-padrao mt-2 ${carregando ? 'bg-gray-400 cursor-not-allowed' : ''}`}
      >
        {carregando ? 'Salvando...' : 'Confirmar Cadastro'}
      </button>
    </div>
  );
};

export default CadastroScreen;