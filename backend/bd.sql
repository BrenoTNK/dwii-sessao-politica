CREATE DATABASE sessaoPolitica;


USE sessaopolitica;


CREATE TABLE politico(
	idPolitico  INT          PRIMARY KEY AUTO_INCREMENT,
    usuario     VARCHAR(200) UNIQUE,
    login       VARCHAR(100) UNIQUE,
    senha       VARCHAR(80)
);

CREATE TABLE sessao(
	idSessao    INT          PRIMARY KEY AUTO_INCREMENT,
    fkPolitico  INT,
    FOREIGN KEY (fkPolitico) REFERENCES politico(idPolitico),
    nome        VARCHAR(150),
    descricao   VARCHAR(250),
    tipo        VARCHAR(1),
    opcao1      VARCHAR(3),
	opcao2      VARCHAR(3),
    dataInicial DATE,
    dataFinal   DATE,
    qtdMax      INT,
    qtdVotosPos INT,
    qtdVotosNeg	INT,
    estado      VARCHAR(1)
);

CREATE TABLE voto (
	fkPolitico  INT,
	fkSessao    INT, 
	FOREIGN KEY (fkPolitico) REFERENCES politico(idPolitico),
	FOREIGN KEY (fkSessao)   REFERENCES sessao(idSessao),
	resposta    INT,
	estado      VARCHAR(1)
);


SELECT * FROM politico;
SELECT * FROM voto;
SELECT * FROM sessao;

-- Politico de teste
INSERT INTO politico (usuario, login, senha)
    VALUES("Seu Joaquim", "seujoaquim45@email.com", "123456");

-- Sessões de teste do politico teste
INSERT INTO sessao(fkPolitico, nome, descricao, opcao1, opcao2, qtdVotosPos, qtdVotosNeg)
    VALUES  (1, "Decoração de natal", "Proposta de investir em decoração de Natal no final de ano em toda a cidade", "sim", "nao", 12, 4),
            (1, "Limpeza do lixo", "Investir e criar campanha de limpeza nas ruas da cidade", "sim", "nao", 23, 15);
