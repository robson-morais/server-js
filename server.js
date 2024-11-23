// Importa o pacote dotenv para gerenciar variáveis de ambiente
import dotenv from 'dotenv';
// Carrega as variáveis de ambiente definidas no arquivo .env para o process.env
dotenv.config();

// Importa o pacote express para criar o servidor HTTP
import express from "express";
import routes from './src/routes/postRouts.js';

// Cria uma instância do servidor Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 4000 e exibe uma mensagem no console
app.listen(4001, () => {
    console.log("Servidor iniciando...")
});
