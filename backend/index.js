// Libs
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const md5 = require("md5");

// config .env
require("dotenv").config();

// Server
const app = express();

try
{
    app.listen(process.env.PORT);
    console.log(`Sistema rodando em http://localhost:${process.env.PORT}`);
}
catch (err)
{
    console.log(err);
}

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))

// Banco de dados
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// CRUD
app.post("/cadastro", async (req, res) => {
    const user = req.body.user;
    const login = req.body.email;
    const password = req.body.password;

    const query = `INSERT INTO politico (usuario, login, senha)
                    VALUES (?,?,md5(?));`;
    
    res.send(db.query(query, [user, login, password]));
});

app.post("/login", async (req, res) => {
    const login = req.body.email;
    const password = md5(req.body.password);

    const query = `SELECT idPolitico, login, senha FROM politico
                    WHERE login = (?);`;

    bd.query(query, [login], (err, result) => {
        const realPass = result[0].senha;

        password == realPass ? res.send({idUser: result[0].idPolitico}) : res.send({idUser: null});
    });
});

app.post("/propostas", async (req, res) => {
    const fkPolitico = req.body.idUser;

    const query = `SELECT * FROM sessao
                    WHERE fkPolitico = (?);`;

    res.send(db.query(query, [fkPolitico]));
});

app.post("/listaVotos", async (req, res) => {
    const fkSessao = req.body.fkSessao;

    const query = `SELECT * FROM voto
                    WHERE fkSessao = (?);`;

    const votos = db.query(query, [fkSessao]);
    console.log(votos);
    res.send(votos);
});

app.post("/votar", async (req, res) => {
    const voto = req.body.voto;
    const sessao = req.body.sessao;
    const politico  = req.body.politico;

    const query = `INSERT INTO voto (resposta, fkSessao, fkPolitico,)
                    VALUES (?,?,?);`;

    res.send(db.query(query, [voto, sessao, politico]));
});

app.post("/novaSessao", async (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const tipo = req.body.tipo;
    const opcao1 = "sim";
	const opcao2 = "nao";
    const dataInicial = req.body.dataInicial;
    const dataFinal = req.body.dataFinal;
    const qtdMax = req.body.qtdMax;
    const qtdVotosPos = 0;
    const qtdVotosNeg = 0;
    const estado = req.body.estado;
    const fkPolitico = req.body.fkPolitico;

    const query = `INSERT INTO sessao (nome, descricao, tipo, opcao1, opcao2, dataInicial, dataFinal, qtdMax, qtdVotosPos, qtdVotosNeg, estado, fkPolitico)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;

    res.send(db.query(query, [nome, descricao, tipo, opcao1, opcao2, dataInicial, dataFinal, qtdMax, qtdVotosPos, qtdVotosNeg, estado, fkPolitico]));
});

app.post("/deletarSessao", async (req, res) => {
    const idSessao = req.body.sessao;
    const fkPolitico = req.body.politico;

    const query = `DELETE FROM sessao
                    WHERE idSessao = (?) AND
                          fkPolitico = (?);`;
    
    res.send(db.query(query, [idSessao, fkPolitico]));
});
