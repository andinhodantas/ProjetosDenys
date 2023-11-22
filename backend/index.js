const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importe o middleware 'cors'

const app = express();
const port = 3000;

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'atv',
  host: 'containerbackend',
  database: 'Clientes',
  password: 'atv12345', // Use a senha que você definiu anteriormente
  port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
    return console.error('Erro ao obter cliente do pool', err);
    }

    const createTableClientes = `
    CREATE TABLE IF NOT EXISTS clientes (
    id serial PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    telefone INTEGER
    );
`

    // Executa a consulta para criar a tabela
    client.query(createTableClientes, (err, result) => {
    release(); // Libera o cliente de volta ao pool

    if (err) {
        return console.error('Erro ao criar a tabela', err);
    }

    console.log('Tabela criada com sucesso');
    });
});

app.use(express.json());

// Use o middleware 'cors' para permitir solicitações de origens diferentes
app.use(cors());

// Rota GET para recuperar dados do banco de dados
app.get('/dados', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
  }
});

// Rota POST para adicionar dados ao banco de dados
app.post('/dados', async (req, res) => {
  const { nome, email,telefone } = req.body;
  try {
    await pool.query('INSERT INTO clientes (nome, email, telefone) VALUES($1, $2, $3)', [nome, email, telefone]);
    console.log()
    res.status(201).json({ message: 'Dado adicionado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar dado ao banco de dados.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});