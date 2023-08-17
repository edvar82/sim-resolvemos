const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor
const caminho = '../uploads/';

// loadnews.js
document.addEventListener('DOMContentLoaded', async () => {
  const newsContainer = document.getElementById('newsContainer');

  try {
    const response = await fetch(`${servidor}:${porta}/api/noticias `);
    const noticias = await response.json();

    if (Array.isArray(noticias)) {
      noticias.forEach((noticia) => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.className = 'noticia';

        const titulo = document.createElement('h1');
        titulo.textContent = noticia.title;

        const corpo = document.createElement('p');
        corpo.textContent = noticia.body;

        const imagem = document.createElement('img');
        imagem.src = `${caminho}/${noticia.image.split('uploads')[1]}`;
        imagem.alt = noticia.imageCaption;

        noticiaDiv.appendChild(titulo);
        noticiaDiv.appendChild(corpo);
        noticiaDiv.appendChild(imagem);

        newsContainer.appendChild(noticiaDiv);
      });
    } else {
      console.error('A resposta da API não está no formato esperado.');
    }
  } catch (error) {
    console.error(error);
  }
});
