// Importe os módulos necessários
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
app.use(cors());

const port = 3000;

// Configure o multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destino para os arquivos enviados
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Gera um carimbo de data e hora único
    const extension = path.extname(file.originalname); // Extrai a extensão do arquivo
    cb(null, `${timestamp}${extension}`);// Constrói um nome de arquivo único
  },
});

const upload = multer({ storage: storage });

// Importe o módulo "path" e defina o caminho base para os arquivos estáticos
const path = require('path');
const basePath = path.join(__dirname, '../pages');

// Configure um middleware para lidar com dados JSON
app.use(express.json());

// Defina uma rota para servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

// Defina uma rota para lidar com o envio de arquivos

app.post('/upload', upload.single('image'), (req, res) => {
    // Verifique se um arquivo foi enviado
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  const imagePath = req.file.path; // Caminho da imagem enviada
  res.status(200).json({ imagePath }); // Responda com o caminho da imagem
});

// Defina uma rota para buscar notícias de um banco de dados
app.get('/api/noticias', (req, res) => {
  // Execute uma consulta SELECT para recuperar as notícias
  const sql = 'SELECT * FROM noticia';
  conn.query(sql, (err, result) => {
    // Responda com os dados recuperados ou uma mensagem de erro
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar notícias' });
    } else {
      res.json(result);
    }
  });
});

// Defina uma rota para buscar reservas de uma pessoa no banco de dados
app.get('/reservas/:id', (req, res) => {
  const id = req.params.id;
  // Recupere as reservas associadas ao ID fornecido
  const sql = `SELECT * FROM reserva WHERE pessoa_id = ${id}`;
  conn.query(sql, (err, result) => {
    // Responda com as reservas ou uma mensagem de erro
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar reservas' });
    } else {
      res.json({ result });
    }
  });
});

// Defina uma rota para buscar informações de uma pessoa com base no ID
app.get('/pessoa/:id', (req, res) => {
  const id = req.params.id;
    // Recupere as informações da pessoa com base no ID fornecido
  const sql = `SELECT * FROM pessoa WHERE id = ${id}`;
  conn.query(sql, (err, result) => {
    if (err) {
        // Responda com as informações da pessoa ou uma mensagem de erro
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar pessoa' });
    } else {
      res.json({ result });
    }
  });
});

// Defina uma rota para criar uma nova notícia
app.post('/news', (req, res) => {
  const data = req.body;
    // Extraia os dados da notícia da requisição e insira no banco de dados
  const sql = `INSERT INTO noticia (title, body, imageCaption, image) VALUES ('${data.title}', '${data.body}', '${data.imageCaption}', '${data.image}')`;
  conn.query(sql, (err, result) => {
      // Responda com uma mensagem de sucesso ou uma mensagem de erro
    if (err) {
      console.log(err);
    } else {
      console.log('Notícia criada com sucesso!');
    }
  });
  res.redirect('/');
});

// Defina uma rota para verificar se um e-mail já está cadastrado
app.post('/verify', (req, res) => {
  const data = req.body.email;
    // Verifique se o e-mail fornecido já está cadastrado
  const sql = `SELECT id FROM pessoa WHERE email = '${data}'`;
  conn.query(sql, (err, result) => {
      // Responda com o status de disponibilidade ou uma mensagem de erro
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.status(400).json({ message: 'Email já cadastrado!' });
      } else {
        res.json({ message: 'Email disponível!' });
      }
    }
  });
});

// Defina uma rota para criar uma nova pessoa e uma reserva associada
app.post('/pessoa', (req, res) => {
  const data = req.body;
    // Crie um novo registro de pessoa no banco de dados
  const sql = `INSERT INTO pessoa (email, nome, telefone) VALUES ('${data.email}', '${data.nome}', '${data.telefone}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // Recupere os dados do usuario de acordo com o email da pessoa
      const query = `SELECT id FROM pessoa WHERE email = '${data.email}'`;
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
            // Crie um registro de reserva correspondente
          const sql2 = `INSERT INTO reserva (checkin, checkout, pessoa_id, roomType) VALUES ('${data.checkin}', '${data.checkout}', ${result[0].id} ,'${data.roomType}')`;
          const id = result[0].id;
          conn.query(sql2, (err, result) => {
            // Responda com o ID da pessoa recém-criada ou uma mensagem de erro
            if (err) {
              console.log(err);
            } else {
              return res.json(id);
            }
          });
        }
      });
    }
  });
});

// Defina uma rota para buscar o ID de uma pessoa com base no e-mail
app.get('/idPessoa/:email', (req, res) => {
  const email = req.params;
    // Recupere o ID da pessoa com base no e-mail fornecido
  const sql = `SELECT id FROM pessoa WHERE email = '${email.email}'`;
  conn.query(sql, (err, result) => {
      // Responda com o ID da pessoa ou uma mensagem de erro
    if (err) {
      console.log(err);
    } else {
      const id = result[0].id;
      res.json({ id });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port);
});

// Importe e configure a conexão MySQL
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});

// Conecte-se ao banco de dados MySQL
conn.connect((err) => {
  if (err) {
    console.log(err); // Registre um erro se a conexão falhar
  } else {
    console.log('Conectou ao MySQL!'); // Registre uma mensagem de sucesso após a conexão bem-sucedida
  }
});
