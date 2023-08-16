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
    name: nome,
    phone: telefone,
    checkin: checkIn,
    checkout: checkOut,
    roomType: roomType,
  };

  try {
    await fetch(`${servidor}:${porta}/pessoa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1),
    });
    alert('Reserva realizada com sucesso!');
  } catch (error) {
    alert(error);
  }

  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('checkIn').value = '';
  document.getElementById('checkOut').value = '';
  document.getElementById('roomType').value = '';
});

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
