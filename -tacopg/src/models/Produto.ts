class Produto {
    id: number;
    pro_descricao: string;
    pro_grupo: number;
    constructor(id:number,pro_descricao:string,pro_grupo:number){
        this.id = id;
        this.pro_descricao = pro_descricao;
        this.pro_grupo = pro_grupo;
    }
}

export default Produto;