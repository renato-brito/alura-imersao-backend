import express from "express";
import routes from "./src/routes/postsRoutes.js";

 console.log("STRING_CONEXAO:", process.env.STRING_CONEXAO);
 console.log("PORTA:", process.env.PORT);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("uploads"));

routes(app);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});







