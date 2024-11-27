// src/routes/prodprep.ts
import { Router } from "express";
import controller from "../controllers/ProdPrepController"; // Certifique-se de que o caminho está correto

const routes = Router();

routes.post('/', controller.create);   // Para criar um novo registro
routes.get('/', controller.list);      // Para listar todos os registros
routes.delete('/', controller.delete);  // Para excluir um registro
routes.put('/', controller.update);     // Para atualizar um registro

export default routes;
