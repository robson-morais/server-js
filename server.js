import express from "express";

const app = express()
const posts = [
    { id: 1, descricao: "imagem 1", imagem: "https://placecats.com/millie/300/150"
    }, 
    { id: 2, descricao: "imagem 2", imagem: "https://placecats.com/millie/300/150"},
    { id: 3, descricao: "imagem 3", imagem: "https://placecats.com/millie/300/150"}
];

app.use(express.json());
app.listen(4000, () => {
    console.log("Servidor iniciando...")
});

app.get("/api", (req,res) => {
    res.status(200).send("Boas vindas ao projeto");
})

function searchID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts", (req,res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req,res) => {
    const index = searchID(req.params.id)
    res.status(200).json(posts[index]);
})