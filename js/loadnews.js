const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

// Função para formatar a data no formato "dd/mm/yyyy - hh:mm"
function formatarData(dataString) {
    const dataObj = new Date(dataString);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}

// Função para buscar as postagens de notícias do servidor
fetch(`${servidor}:${porta}/api/noticias`)
    .then(response => response.json())
    .then(newsData => {
      // Ordena as postagens de notícias em ordem cronológica reversa
      newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

      const newsContainer = document.getElementById('newsContainer');
      newsData.forEach(newsPost => {
        const newsElement = document.createElement('div');
        newsElement.innerHTML = `
          <h2>${newsPost.title}</h2>
          <h3>${formatarData(newsPost.date)}</h3>
          <p>${newsPost.body}</p><br>
                <div align="center">
            <img src="../${newsPost.imageUrl}"/>
            <pre>${newsPost.imageCaption}</pre>
                </div>
                <br>
            `;
        newsContainer.appendChild(newsElement);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar notícias:', error);
    });
