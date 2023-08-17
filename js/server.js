const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
app.use(cors());
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}${extension}`);
  },
});

const upload = multer({ storage: storage });

const path = require('path');
const basePath = path.join(__dirname, '../pages');

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  const imagePath = req.file.path;
  res.status(200).json({ imagePath });
});

app.get('/api/noticias', (req, res) => {
  const sql = 'SELECT * FROM noticia';
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar notícias' });
    } else {
      res.json(result);
    }
  });
});

app.get('/reservas/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM reserva WHERE pessoa_id = ${id}`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar reservas' });
    } else {
      res.json({ result });
    }
  });
});

app.get('/pessoa/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pessoa WHERE id = ${id}`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar pessoa' });
    } else {
      res.json({ result });
    }
  });
});

app.post('/news', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO noticia (title, body, imageCaption, image) VALUES ('${data.title}', '${data.body}', '${data.imageCaption}', '${data.image}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Notícia criada com sucesso!');
    }
  });
  res.redirect('/');
});

app.post('/verify', (req, res) => {
  const data = req.body.email;
  const sql = `SELECT id FROM pessoa WHERE email = '${data}'`;
  conn.query(sql, (err, result) => {
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

app.post('/pessoa', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO pessoa (email, nome, telefone) VALUES ('${data.email}', '${data.nome}', '${data.telefone}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const query = `SELECT id FROM pessoa WHERE email = '${data.email}'`;
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sql2 = `INSERT INTO reserva (checkin, checkout, pessoa_id, roomType) VALUES ('${data.checkin}', '${data.checkout}', ${result[0].id} ,'${data.roomType}')`;
          const id = result[0].id;
          conn.query(sql2, (err, result) => {
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

app.get('/idPessoa/:email', (req, res) => {
  const email = req.params;
  const sql = `SELECT id FROM pessoa WHERE email = '${email.email}'`;
  conn.query(sql, (err, result) => {
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

const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});
conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conectou ao MySQL!');
  }
});
