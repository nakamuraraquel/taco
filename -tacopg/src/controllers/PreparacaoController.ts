import { Request, Response } from "express";
import query from "./db";

class PreparacaoController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { id, pre_descricao } = req.body;
        const r: any = await query(
            "INSERT INTO preparacao(id, pre_descricao) VALUES ($1,$2) RETURNING id",
            [id, pre_descricao]
        );
        return res.json(r);
    }

    public async list(_: Request, res: Response): Promise<Response> {
        const r: any = await query(
            "SELECT id,pre_descricao FROM preparacao ORDER BY id"
        );
        return res.json(r);

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body; // id do registro a ser excluído
        const r: any = await query(
            "DELETE FROM preparacao WHERE id = $1", [id]
        );
        return res.json(r);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, pre_descricao } = req.body;
        const r: any = await query(
            "UPDATE preparacao SET pre_descricao=$2 WHERE id=$1",
            [id, pre_descricao]
        );
        return res.json(r);
    }
}

export default new PreparacaoController();