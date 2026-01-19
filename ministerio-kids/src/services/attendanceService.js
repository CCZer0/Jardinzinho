// src/services/attendanceService.js
import { db } from "../firebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  updateDoc, 
  doc, 
  orderBy 
} from "firebase/firestore";

// --- Funções Auxiliares ---

// Gerar código (ex: A45)
const gerarCodigoSeguranca = () => {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  return `${letras.charAt(Math.floor(Math.random() * letras.length))}${Math.floor(Math.random() * 90 + 10)}`;
};

// --- Funções Principais ---

// 1. Buscar Criança (Para o Check-in)
export const buscarCrianca = async (nomeBusca) => {
  try {
    const q = query(
      collection(db, "criancas"),
      where("nome", ">=", nomeBusca),
      where("nome", "<=", nomeBusca + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return [];
  }
};

// 2. Realizar Check-in (Entrada)
export const realizarCheckIn = async (crianca) => {
  try {
    const codigo = gerarCodigoSeguranca();
    // AQUI ESTAVA O ERRO (A barra invertida foi removida)
    const docRef = await addDoc(collection(db, "checkins"), {
      id_crianca: crianca.id,
      nome_crianca: crianca.nome,
      responsavel_nome: crianca.nome_responsavel || crianca.responsavel || "Não informado",
      horario_entrada: Timestamp.now(),
      status: "presente",
      codigo_seguranca: codigo,
      data_evento: new Date().toLocaleDateString('pt-BR')
    });
    return { sucesso: true, codigo: codigo, id_checkin: docRef.id };
  } catch (error) {
    console.error("Erro no checkin:", error);
    return { sucesso: false, erro: error };
  }
};

// 3. Cadastrar Nova Criança
export const cadastrarCrianca = async (dados) => {
  try {
    const docRef = await addDoc(collection(db, "criancas"), {
      nome: dados.nome.trim(),
      data_nascimento: dados.dataNascimento || "",
      alergias: dados.alergias || "",
      nome_responsavel: dados.responsavel,
      telefone_responsavel: dados.telefone || ""
    });
    return { sucesso: true, id: docRef.id };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { sucesso: false };
  }
};

// 4. Listar Crianças Presentes (Para o Checkout - Tela "Em Sala")
export const listarPresentes = async () => {
  try {
    const q = query(
      collection(db, "checkins"),
      where("status", "==", "presente")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id_checkin: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao listar presentes:", error);
    return [];
  }
};

// 5. Realizar Checkout (Liberar Criança)
export const realizarCheckOut = async (idCheckIn) => {
  try {
    const checkInRef = doc(db, "checkins", idCheckIn);
    await updateDoc(checkInRef, {
      status: "entregue",
      horario_saida: Timestamp.now()
    });
    return { sucesso: true };
  } catch (error) {
    console.error("Erro ao fazer checkout:", error);
    return { sucesso: false };
  }
};