import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import fs from "fs";
import readline from "node:readline";
import Grupo from "./models/Grupo";
import Preparacao from "./models/Preparacao";
import Produto from "./models/Produto";
import query from "./controllers/db";
import ProdPrep from "./models/ProdPrep";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// inicializa o servidor na porta especificada
const server = app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

server.keepAliveTimeout = 61 * 1000;

// define a rota para o pacote /routes
app.use(routes);

// importando tabela grupo
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Grupo.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const g = new Grupo(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/grupo', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: g.id,
                gru_descricao: g.gru_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                // console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            });
    }
    x++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO
console.log("Importação de GRUPO finalizada.");


// importando tabela preparacao
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Preparacao.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (y > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const p = new Preparacao(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/preparacao', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: p.id,
                pre_descricao: p.pre_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                // console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            });
    }
    y++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO
console.log("Importação de PREPARACAO finalizada.");


// Lê o arquivo CSV de forma síncrona
const data = fs.readFileSync('./src/Taco-Produto.csv', { encoding: 'utf8', flag: 'r' });

// Divide as linhas do arquivo em um array
const linhas = data.split("\n"); // ou split("\r\n") dependendo do sistema operacional
let w: number = 0; // variável para pular a primeira linha de cabeçalho

// Itera sobre cada linha
linhas.forEach(linha => {
    if (w > 0) { // só processa se não for a primeira linha
        const l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        if (l.length < 3) return; // Verifica se a linha tem os campos suficientes

        const id = parseInt(l[0]); // ID
        const descricao = l[1]; // Descrição
        const grupo = parseInt(l[2]); // Grupo

        const p = new Produto(id, descricao, grupo); // instância um objeto do Modelo a ser usado

        // Execute a query de inserção
        query(
            "INSERT INTO produto(id, pro_descricao, pro_grupo) VALUES ($1, $2, $3)",
            [p.id, p.pro_descricao, p.pro_grupo]
        )
        .then(() => {
            console.log(`Produto inserido: ${p.pro_descricao}`); // Confirmação de inserção
        })
        .catch(error => {
            console.error("Erro ao inserir produto:", error); // Mostra erro se ocorrer
        });
    }
    w++; // incrementa a variável de controle de linha
});

console.log("Importação de PRODUTO finalizada.");


// Importando a tabela prodprep
const dataProdPrep = fs.readFileSync('./src/Taco-ProdPrep.csv', { encoding: 'utf8', flag: 'r' })
    .toString()
    .split("\r\n"); // lê e fecha o arquivo CSV de ProdPrep, colocando os dados na variável data linha a linha

let z: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

dataProdPrep.forEach(linha => { // faz a leitura de cada linha da variável dataProdPrep
    if (z > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l);

        // Cria um objeto ProdPrep com os dados do CSV
        const prodPrep = new ProdPrep(
            parseInt(l[0]), // pp_produto
            parseInt(l[1]), // pp_preparacao
            parseFloat(l[2]), // pp_energia
            parseFloat(l[3]), // pp_proteina
            parseFloat(l[4]), // pp_lipidios
            parseFloat(l[5]), // pp_carboidrato
            parseFloat(l[6]), // pp_fibra
            parseFloat(l[7]), // pp_colesterol
            parseFloat(l[8]), // pp_agsaturado
            parseFloat(l[9]), // pp_agmono
            parseFloat(l[10]), // pp_agpoli
            parseFloat(l[11]), // pp_aglinoleico
            parseFloat(l[12]), // pp_aglinolenico
            parseFloat(l[13]), // pp_agtranstotal
            parseFloat(l[14]), // pp_acucartotal
            parseFloat(l[15]), // pp_acucaradicao
            parseFloat(l[16]), // pp_calcio
            parseFloat(l[17]), // pp_magnesio
            parseFloat(l[18]), // pp_manganes
            parseFloat(l[19]), // pp_fosforo
            parseFloat(l[20]), // pp_ferro
            parseFloat(l[21]), // pp_sodio
            parseFloat(l[22]), // pp_sodioadicao
            parseFloat(l[23]), // pp_potassio
            parseFloat(l[24]), // pp_cobre
            parseFloat(l[25]), // pp_zinco
            parseFloat(l[26]), // pp_selenio
            parseFloat(l[27]), // pp_retinol
            parseFloat(l[28]), // pp_vitamina_a
            parseFloat(l[29]), // pp_tiamina
            parseFloat(l[30]), // pp_riboflavina
            parseFloat(l[31]), // pp_niacina
            parseFloat(l[32]), // pp_niacina_ne
            parseFloat(l[33]), // pp_piridoxina
            parseFloat(l[34]), // pp_cobalamina
            parseFloat(l[35]), // pp_folato
            parseFloat(l[36]), // pp_vitamina_d
            parseFloat(l[37]), // pp_vitamina_e
            parseFloat(l[38])  // pp_vitamina_c
        );


        // Realiza a inserção no banco de dados
        const r: any = query( // cria a query direta, sem passar pelas rotas
            "INSERT INTO prodprep (pp_produto, pp_preparacao, pp_energia, pp_proteina, pp_lipidios, pp_carboidrato, pp_fibra, pp_colesterol, pp_agsaturado, pp_agmono, pp_agpoli, pp_aglinoleico, pp_aglinolenico, pp_agtranstotal, pp_acucartotal, pp_acucaradicao, pp_calcio, pp_magnesio, pp_manganes, pp_fosforo, pp_ferro, pp_sodio, pp_sodioadicao, pp_potassio, pp_cobre, pp_zinco, pp_selenio, pp_retinol, pp_vitamina_a, pp_tiamina, pp_riboflavina, pp_niacina, pp_niacina_ne, pp_piridoxina, pp_cobalamina, pp_folato, pp_vitamina_d, pp_vitamina_e, pp_vitamina_c) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39)",
            [
                prodPrep.pp_produto,
                prodPrep.pp_preparacao,
                prodPrep.pp_energia,
                prodPrep.pp_proteina,
                prodPrep.pp_lipidios,
                prodPrep.pp_carboidrato,
                prodPrep.pp_fibra,
                prodPrep.pp_colesterol,
                prodPrep.pp_agsaturado,
                prodPrep.pp_agmono,
                prodPrep.pp_agpoli,
                prodPrep.pp_aglinoleico,
                prodPrep.pp_aglinolenico,
                prodPrep.pp_agtranstotal,
                prodPrep.pp_acucartotal,
                prodPrep.pp_acucaradicao,
                prodPrep.pp_calcio,
                prodPrep.pp_magnesio,
                prodPrep.pp_manganes,
                prodPrep.pp_fosforo,
                prodPrep.pp_ferro,
                prodPrep.pp_sodio,
                prodPrep.pp_sodioadicao,
                prodPrep.pp_potassio,
                prodPrep.pp_cobre,
                prodPrep.pp_zinco,
                prodPrep.pp_selenio,
                prodPrep.pp_retinol,
                prodPrep.pp_vitamina_a,
                prodPrep.pp_tiamina,
                prodPrep.pp_riboflavina,
                prodPrep.pp_niacina,
                prodPrep.pp_niacina_ne,
                prodPrep.pp_piridoxina,
                prodPrep.pp_cobalamina,
                prodPrep.pp_folato,
                prodPrep.pp_vitamina_d,
                prodPrep.pp_vitamina_e,
                prodPrep.pp_vitamina_c
            ]
        );
            //    console.log(r);
    }
    z++; // incrementa a variável de controle de linha
}); // fecha dataProdPrep.forEach

console.log("Importação de PRODPREP finalizada.");

console.log("Produtos importados FINAL ...");