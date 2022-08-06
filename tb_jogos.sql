CREATE TABLE tb_jogos(
	id_jogo SERIAL PRIMARY KEY,
	nome VARCHAR(50),
	dev VARCHAR(50),
	categoria VARCHAR(50),
	url_img VARCHAR(250)
);

INSERT INTO tb_jogos(nome, dev, categoria, url_img) VALUES ('Super Mário', 'Nintendo', 'Aventura', 'https://images-na.ssl-images-amazon.com/images/I/71iUgldMJPL.jpg');
INSERT INTO tb_jogos(nome, dev, categoria, url_img) VALUES ('A lenda de Zelda', 'Capcom', 'Aventura', 'https://images-na.ssl-images-amazon.com/images/I/A15-31Y3bRL.jpg');
INSERT INTO tb_jogos(nome, dev, categoria, url_img) VALUES ('Resident Evil 2', 'Capcom', 'Ação', 'https://image.api.playstation.com/vulcan/img/cfn/11307nlSCjRt2mOBNjuzv2oOQVgoE6zZe_8Jp9f3GKBAyMGg7GsTtL9AeC-prhAB35ZvfJ268khuqIz2gTCyrtkPMmQDzayq.png');

SELECT * FROM tb_jogos;
