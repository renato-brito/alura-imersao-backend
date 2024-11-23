import getTodosPosts, {atualizarPost, criarPost} from "../models/postModels.js";
import * as fs from "node:fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).send(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(201).send(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).send({"Erro": "Erro ao criar novo post"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(201).send(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).send({"Erro": "Erro ao criar novo post"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBUffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBUffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(201).send(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).send({"Erro": "Erro ao criar novo post"});
    }
}

