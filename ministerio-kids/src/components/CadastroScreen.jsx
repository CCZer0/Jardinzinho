import React, { useState } from 'react';
import { cadastrarCrianca } from '../services/attendanceService';

const CadastroScreen = () => {
  const [formData, setFormData] = useState({ nome: '', dataNascimento: '', alergias: '', responsavel: '', telefone: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.responsavel) return alert("Preencha os nomes!");
    const res = await cadastrarCrianca(formData);
    if (res.sucesso) {
        alert("Cadastrado!");
        setFormData({ nome: '', dataNascimento: '', alergias: '', responsavel: '', telefone: '' });
    } else { alert("Erro ao salvar."); }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen pb-24">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Novo Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Nome da Criança" />
        <input name="alergias" value={formData.alergias} onChange={(e) => setFormData({...formData, alergias: e.target.value})} className="w-full p-3 border border-red-200 bg-red-50 rounded-lg" placeholder="Alergias?" />
        <input name="responsavel" value={formData.responsavel} onChange={(e) => setFormData({...formData, responsavel: e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Nome do Responsável" />
        <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-lg font-bold">Salvar Cadastro</button>
      </form>
    </div>
  );
};
export default CadastroScreen;