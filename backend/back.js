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



app.get('/jogos',
    (req, res) => {
        client.query('SELECT * FROM tb_jogos')
            .then(
                function (ret) {
                    res.json(ret.rows)
                }
            );
    });


app.get('/jogos/id/:id',
    (req, res) => {
        client.query(
            {
                text: "SELECT * FROM jogos WHERE id = $1",
                values: [req.params.id]
            }
        ).then(
            function (ret) {
                res.json(ret.rows)
            }
        );
    });


app.get('/jogos/nome/:nome',
    (req, res) => {
        client.query(
            {
                text: "SELECT * FROM jogos WHERE nome LIKE $1",
                values: ['%' + req.params.autor + '%']
            }
        ).then(
            function (ret) {
                res.json(ret.rows)
            }
        );
    });


app.get('/jogos/dev/:dev',
    (req, res) => {
        client.query(
            {
                text: "SELECT * FROM jogos WHERE dev LIKE $1",
                values: ['%' + req.params.autor + '%']
            }
        ).then(
            function (ret) {
                res.json(ret.rows)
            }
        );
    });








app.post('/jogos/insertJogo',
    function (req, res) {
        let nome = req.body.nome;
        let dev = req.body.dev;
        let categoria = req.body.categoria;
        let url = req.body.url_img;

        client.query(
            {
                text: 'INSERT INTO tb_jogos(nome, dev, categoria, url_img) VALUES ($1, $2, $3, $4);',
                values: [nome, dev, categoria, '{' + url + '}']
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



app.post('/jogos/updateJogo',
    function (req, res) {
        let titulo = req.body.titulo
        let autor = req.body.autor
        let categoria = req.body.categoria
        let id = req.body.id

        client.query(
            {
                text: 'UPDATE jogos SET nome = $1, dev = $2, categoria = $3 WHERE id = $4',
                values: [titulo, autor,
                    categoria, id]
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



app.post('/jogos/removeJogo',
    function (req, res) {
        let id = req.body.id;

        client.query(
            {
                text: 'DELETE FROM livros WHERE id = $1',
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