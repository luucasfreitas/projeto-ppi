const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new pg.Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'admin',
        port: 5432,
    }
);
client.connect();


app.get('/',
    (req, res) => { res.send("Aqui é a raiz!"); }
);


// Listar jogos
app.get('/jogos',
    (req, res) => {
        client.query('SELECT * FROM tb_jogos')
            .then(
                function (ret) {
                    res.json(ret.rows)
                }
            );
    });


// Buscar Jogos por id
app.get('/jogos/id/:id',
    (req, res) => {
        client.query(
            {
                text: "SELECT * FROM tb_jogos WHERE id_jogo = $1",
                values: [req.params.id]
            }
        ).then(
            function (ret) {
                res.json(ret.rows)
            }
        );
    });


// Inserir novos jogos via POST/JSON
app.post('/jogos/insertJogo',
    function (req, res) {
        let nome = req.body.nome;
        let dev = req.body.dev;
        let categoria = req.body.categoria;
        let url = req.body.url_img;

        client.query(
            {
                text: 'INSERT INTO tb_jogos(nome, dev, categoria, url_img) VALUES ($1, $2, $3, $4);',
                values: [nome, dev, categoria, url]
            }
        )
            .then(
                function (ret) {
                    res.json(
                        {
                            response: 'Dados inserido',
                            dados: req.body
                        }
                    )
                }
            );
    });


// Update jogos via POST/JSON
app.post('/jogos/updateJogo',
    function (req, res) {
        let nome = req.body.nome
        let dev = req.body.dev
        let categoria = req.body.categoria
        let url_img = req.body.url_img
        let id = req.body.id

        client.query(
            {
                text: 'UPDATE tb_jogos SET nome = $1, dev = $2, categoria = $3, url_img = $4 WHERE id_jogo = $5',
                values: [nome, dev,
                    categoria, url_img, id]
            }
        )
            .then(
                function (ret) {
                    res.json(
                        {
                            status: 'Dados atualizados com sucesso.',
                            dadosEnviados: req.body
                        }
                    )
                }
            );
    });


// Deletar jogos via POST/JSON
app.post('/jogos/removeJogo',
    function (req, res) {
        let id = req.body.id;

        client.query(
            {
                text: 'DELETE FROM tb_jogos WHERE id_jogo = $1',
                values: [id]
            }
        )
            .then(
                function (ret) {
                    res.json(
                        {
                            status: 'Dados deletados com sucesso.',
                            dadosEnviados: req.body
                        }
                    )
                }
            );
    });



app.listen(3000,
    () => console.log('Server On!')
);