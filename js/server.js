const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

const path = require('path');
const basePath = path.join(__dirname, '../pages');

app.use(express.json());
var sectionID = null;

// // Crie uma pasta separada para armazenar as imagens das notícias
// const upload = multer({ dest: 'media/news_images' });

// // Verifica se o arquivo reservas.json existe e o cria, se não existir
// const reservationsFilePath = 'data/reservas.json';
// fs.access(reservationsFilePath, fs.constants.F_OK, (err) => {
//   if (err) {
//     // O arquivo não existe, cria-o com um array vazio como dados iniciais
//     fs.writeFile(reservationsFilePath, '[]', 'utf8', (err) => {
//       if (err) {
//         console.error('Erro ao criar o arquivo reservations.json:', err);
//       } else {
//         console.log('Arquivo reservations.json criado.');
//       }
//     });
//   }
// });

// // Verifica se o arquivo newsposts.json existe e o cria, se não existir
// const newsPostsFilePath = 'data/newsposts.json';
// fs.access(newsPostsFilePath, fs.constants.F_OK, (err) => {
//   if (err) {
//     // O arquivo não existe, cria-o com um array vazio como dados iniciais
//     fs.writeFile(newsPostsFilePath, '[]', 'utf8', (err) => {
//       if (err) {
//         console.error('Erro ao criar o arquivo newsposts.json:', err);
//       } else {
//         console.log('Arquivo newsposts.json criado.');
//       }
//     });
//   }
// });

// // Rota para lidar com a solicitação de criação de uma nova reserva
// // Tipo: POST
// app.post('/reserva', (req, res) => {
//   const data = req.body;
//   // Calcula o número de dias entre as datas de check-in e check-out
//   const checkInDate = new Date(data.checkIn);
//   const checkOutDate = new Date(data.checkOut);
//   const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
//   const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

//   // Calcula o valor final da reserva (100 reais por dia)
//   // Pode ser expandido para levar em conta o tipo de reserva e seus preços
//   const finalValue = numberOfDays * 100;

//   // Gera um ID único para a reserva
//   const reservationId = uuidv4();

//   // Tenta ler o atual arquivo de reservas, se existir
//   fs.readFile(reservationsFilePath, 'utf8', (err, fileData) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo:', err);
//       res.json({ message: 'Erro ao ler o arquivo de dados da reserva.' });
//       return;
//     }

//     // Lê os dados do arquivo em um array de objetos JSON ou inicializa um array vazio
//     const existingData = JSON.parse(fileData) || [];

//     // Cria uma nova entrada JSON com os dados da reserva com seu ID único
//     const newReservation = { id: reservationId, ...data, days: numberOfDays, finalPrice: finalValue };
//     // Adiciona os novos dados da reserva aos dados existentes
//     existingData.push(newReservation);

//     // Escreve os dados da reserva atualizados de volta ao arquivo
//     fs.writeFile(reservationsFilePath, JSON.stringify(existingData, null, 2), (err) => {
//       if (err) {
//         console.error('Erro ao escrever o arquivo:', err);
//         res.json({ message: 'Erro ao salvar os dados da reserva.' });
//         return;
//       }

//       // Dados da reserva salvos com sucesso, informa no console do servidor
//       console.log('Dados da reserva salvos:', newReservation);
//       // Retorna uma mensagem de confirmação para o cliente com um novo dado: o ID gerado para a reserva
//       res.json({ message: 'Reserva realizada.', reservationId: newReservation.id });
//     });
//   });
// });

// // Rota para lidar com a solicitação de busca dos dados da reserva com base no ID da reserva.
// // Tipo: GET
// app.get('/reserva/:id', (req, res) => {
//   const reservationId = req.params.id;

//   // Tenta ler o atual arquivo de reservas, se existir
//   fs.readFile(reservationsFilePath, 'utf8', (err, fileData) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo:', err);
//       res.status(500).json({ error: 'Erro ao ler o arquivo de dados da reserva.' });
//       return;
//     }

//     // Lê os dados do arquivo em um array de objeto JSON ou inicializa um array vazio
//     const reservations = JSON.parse(fileData) || [];
//     // Busca pelo ID solicitado nas entradas de reserva existentes
//     const reservation = reservations.find(r => r.id === reservationId);

//     if (!reservation) {
//       // Reserva não encontrada, retorna erro
//       res.status(404).json({ error: 'Reserva não encontrada.' });
//       return;
//     }

//     // Retorna os dados da reserva, se encontrada
//     res.json({ reservation });
//   });
// });

// // Rota para lidar com a solicitação de busca das postagens de notícias
// // Tipo: GET
// app.get('/api/noticias', (req, res) => {

//     // Tenta ler o atual arquivo de notícias, se existir
//     fs.readFile(newsPostsFilePath, 'utf8', (err, fileData) => {
//         if (err) {
//         console.error('Erro ao ler o arquivo de notícias:', err);
//         res.status(500).json({ error: 'Erro ao ler os dados de notícias.' });
//         return;
//         }

//         // Lê os dados do arquivo em um array de objetos JSON ou inicializa um array vazio
//         const newsData = JSON.parse(fileData) || [];
//         // Retorna os dados das notícias
//         res.json(newsData);
//     });
//     });

// // Rota para lidar com a solicitação de criação de uma nova postagem de notícia
// // Tipo: POST
// app.post('/api/noticias', upload.single('image'), (req, res) => {

//     // Parse nos dados da notícia
//     const { title, body, imageCaption } = req.body;
//     // Se houver o upload de uma imagem, pega seu caminho aqui, se não vazio
//     const imageUrl = req.file ? `media/news_images/${req.file.filename}` : '';
//     // Data da postagem = data e hora atual
//     const date = new Date().toISOString(); // Registra a data e hora atual da postagem

//     // Cria um objeto JSON com os dados da notícia e um ID único
//     const newNewsPost = { id: uuidv4(), title, body, imageCaption, imageUrl, date };

//     // Tenta ler o atual arquivo de notícias, se existir
//     fs.readFile(newsPostsFilePath, 'utf8', (err, fileData) => {
//         if (err) {
//         console.error('Erro ao ler o arquivo de notícias:', err);
//         res.status(500).json({ error: 'Erro ao ler os dados de notícias.' });
//         return;
//         }

//         // Lê os dados do arquivo em um array de objetos JSON ou inicializa um array vazio
//         const newsData = JSON.parse(fileData) || [];
//         // Adiciona os novos dados da notícia aos dados existentes
//         newsData.push(newNewsPost);

//         // Escreve os dados da notícia atualizados de volta ao arquivo
//         fs.writeFile(newsPostsFilePath, JSON.stringify(newsData, null, 2), (err) => {
//         if (err) {
//             console.error('Erro ao escrever o arquivo de notícias:', err);
//             res.status(500).json({ error: 'Erro ao salvar os dados de notícias.' });
//             return;
//         }

//         // Dados da notícia salvos com sucesso, informa no console do servidor
//         console.log('Nova postagem de notícia criada:', newNewsPost);
//         // Retorna uma mensagem de confirmação para o cliente com os dados da notícia
//         res.json({ message: 'Nova postagem de notícia criada com sucesso!', newsPost: newNewsPost });
//         });
//     });
//     });
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.post('/news', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO noticia (titulo, corpo, legendaImagem) VALUES ('${data.titulo}', '${data.corpo}', '${data.legendaImagem}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Notícia criada com sucesso!');
    }
  });
  res.redirect('/');
});

app.post('/pessoa', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO pessoa (email, name, phone) VALUES ('${data.email}', '${data.name}', '${data.phone}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const query = `SELECT idpessoa FROM pessoa WHERE email = '${data.email}'`;
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sql2 = `INSERT INTO reserva (checkin, checkout, idUser, roomType) VALUES ('${data.checkin}', '${data.checkout}', ${result[0].idpessoa} ,'${data.roomType}')`;
          conn.query(sql2, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Pessoa criada com sucesso!');
            }
          });
        }
      });
    }
  });
  res.redirect('/');
});

app.post('/reserva', (req, res) => {
  console.log(sectionID);
  const data = req.body;
  const sql = `INSERT INTO reserva (checkin, checkout, idUser, roomType) VALUES ('${data.checkin}', '${data.checkout}', ${sectionID} ,'${data.roomType}')`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Pessoa criada com sucesso!');
    }
  });
  res.redirect('/');
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
