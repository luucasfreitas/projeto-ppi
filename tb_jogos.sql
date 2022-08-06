CREATE DATABASE projeto2PPI;

CREATE TABLE tb_jogos(
	id_jogo SERIAL PRIMARY KEY,
	nome VARCHAR(50),
	dev VARCHAR(50),
	categoria VARCHAR(50)
);