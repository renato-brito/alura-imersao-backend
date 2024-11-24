import express from "express";
import multer from "multer";
import cors from "cors";
import {atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem} from "../controller/postsController.js";

// caso use SO Windows
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const upload = multer({ dest: "./uploads" })

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/mongodb/posts", listarPosts);

    app.post("/mongodb/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
}
export default routes;



