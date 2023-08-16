const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

async function publicar() {
  document.getElementById('publicar').disabled = true;
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const imageCaption = document.getElementById('imageCaption').value;

  const data = {
    titulo: title,
    corpo: body,
    legendaImagem: imageCaption,
  };
  try {
    await fetch(`${servidor}:${porta}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    alert('Notícia publicada com sucesso!');
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('imageCaption').value = '';
  } catch (error) {
    alert(error);
  }
}

document.getElementById('publicar').addEventListener('click', publicar);
