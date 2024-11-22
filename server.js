// Importa o pacote dotenv para gerenciar variáveis de ambiente
import dotenv from 'dotenv';
// Carrega as variáveis de ambiente definidas no arquivo .env para o process.env
dotenv.config();

// Importa o pacote express para criar o servidor HTTP
import express from "express";
// Importa a função conectarAoBanco que lida com a conexão ao MongoDB
import conectarAoBanco from "./src/config/dbconfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão armazenada nas variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Cria uma instância do servidor Express
const app = express()

// Dados simulados para os posts
const posts = [
    { id: 1, descricao: "imagem 1 do local", imagem: "https://placecats.com/millie/300/150"},
    { id: 2, descricao: "imagem 2 do local", imagem: "https://placecats.com/millie/300/150"},
    { id: 3, descricao: "imagem 3 local", imagem: "https://placecats.com/millie/300/150"}
];

// Adiciona o middleware express.json() para que o servidor consiga entender requisições com corpo JSON
app.use(express.json());

// Inicia o servidor na porta 4000 e exibe uma mensagem no console
app.listen(4000, () => {
    console.log("Servidor iniciando...")
});

// Rota básica de boas-vindas
app.get("/api", (req, res) => {
    // Retorna uma resposta simples de boas-vindas
    res.status(200).send("Boas vindas ao projeto");
})

// Função assíncrona para buscar todos os posts no banco de dados
async function getAllPosts(){
    // Acessa o banco de dados 'Alura-project' e a coleção 'posts'
    const db = conexao.db("Alura-project");
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção 'posts' como um array
    return colecao.find().toArray();
}

// Rota que retorna todos os posts do banco de dados
app.get("/posts", async (req, res) => {
    // Chama a função getAllPosts para obter os posts do banco de dados
    const resultado = await getAllPosts();
    // Retorna os posts como resposta no formato JSON (aqui, está retornando a lista simulada de posts)
    res.status(200).json(posts);
});

// Função para buscar um post pelo ID
function searchID(id){
    // Encontra o índice do post com o ID fornecido
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

// Rota que retorna um post específico com base no ID fornecido na URL
app.get("/posts/:id", (req, res) => {
    // Chama a função searchID com o ID passado como parâmetro na URL
    const index = searchID(req.params.id);
    // Retorna o post encontrado no formato JSON
    res.status(200).json(posts[index]);
});
