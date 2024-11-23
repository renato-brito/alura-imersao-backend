import 'dotenv/config.js'
import conectarAoBanco from "../config/dbConfig.js";
import {ObjectId} from "mongodb";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, postAtualizado) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: postAtualizado });
}