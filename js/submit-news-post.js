const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

async function publicar() {
  document.getElementById('publicar').disabled = true;
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const imageCaption = document.getElementById('imageCaption').value;
  const imageInput = document.getElementById('image');
  const selectedFile = imageInput.files[0];

  if (!title || !body || !imageCaption) {
    alert('Preencha todos os campos!');
    document.getElementById('publicar').disabled = false;
    return;
  }

  if (selectedFile) {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${servidor}:${porta}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { imagePath } = await response.json();
        const data = {
          title,
          body,
          imageCaption,
          image: imagePath, // Adiciona a URL da imagem aos dados enviados para o servidor
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
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(error);
    }
  } else {
    const data = {
      title,
      body,
      imageCaption,
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
}

document.getElementById('publicar').addEventListener('click', publicar);
