import { Request, Response } from "express";
import query from "./db";

class ProdutoController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { id, pro_descricao, pro_grupo } = req.body;
        const r: any = await query(
            "INSERT INTO produto(id, pro_descricao, pro_grupo) VALUES ($1,$2,$3) RETURNING id",
            [id, pro_descricao, pro_grupo]
        );
        return res.json(r);
    }

    public async list(_: Request, res: Response): Promise<Response> {
        const r: any = await query(
            "SELECT id,pro_descricao,pro_grupo FROM produto ORDER BY id"
        );
        return res.json(r);

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body; // id do registro a ser excluído
        const r: any = await query(
            "DELETE FROM produto WHERE id = $1", [id]
        );
        return res.json(r);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, pro_descricao, pro_grupo } = req.body;
        const r: any = await query(
            "UPDATE produto SET pro_descricao=$2, pro_grupo=$3 WHERE id=$1",
            [id, pro_descricao, pro_grupo]
        );
        return res.json(r);
    }
}

export default new ProdutoController();