// Importa o pacote dotenv para gerenciar variáveis de ambiente
import dotenv from 'dotenv';
// Carrega as variáveis de ambiente definidas no arquivo .env para o process.env
dotenv.config();
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão armazenada nas variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts no banco de dados
export async function getAllPosts(){
    const db = conexao.db("Alura-project");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Alura-project");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}