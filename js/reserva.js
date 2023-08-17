const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

document.getElementById('formReserva').addEventListener('submit', async function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const roomType = document.getElementById('roomType').value;

  // Criar um objeto com os dados a serem enviados para o back-end
  const data1 = {
    email,
    nome,
    telefone,
    checkin: checkIn,
    checkout: checkOut,
    roomType: roomType,
  };

  try {
    if (
      nome === '' ||
      email === '' ||
      checkIn === '' ||
      checkOut === '' ||
      roomType === ''
    ) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    const response2 = await fetch(`${servidor}:${porta}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1),
    });

    if (response2.status === 400) {
      alert('Usuário já cadastrado!');
      return;
    }

    const reponse = await fetch(`${servidor}:${porta}/pessoa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1),
    });
    if (reponse.status === 400) {
      alert('Email já cadastrado!');
    }
    if (reponse.status === 200) {
      alert('Reserva feita com sucesso!');

      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('telefone').value = '';
      document.getElementById('checkIn').value = '';
      document.getElementById('checkOut').value = '';
      document.getElementById('roomType').value = '';
    }

    const id = await fetch(`${servidor}:${porta}/idPessoa/${data1.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await id.json();
    console.log(data);
    document.cookie = `id=${data.id}`;
    window.location.href = 'confirma_reserva.html';
  } catch (error) {
    alert(error);
  }
});

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
