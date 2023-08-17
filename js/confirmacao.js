const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

async function buscarDadosDaReserva() {
  try {
    const id = document.cookie.split('=')[1];
    const response = await fetch(`${servidor}:${porta}/reservas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response2 = await fetch(`${servidor}:${porta}/pessoa/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dadosDaReserva = await response.json();
    const dadosDaPessoa = await response2.json();

    // Preenche a página de confirmação com os dados da reserva obtidos.
    const detalhesConfirmacao = document.getElementById('confirmation-details');
    const html = `
      <label>Nome:</label>
      <p>${dadosDaPessoa.result[0].nome}</p>
      <label>E-mail:</label>
      <p>${dadosDaPessoa.result[0].email}</p>
      <label>Telefone:</label>
      <p>${dadosDaPessoa.result[0].telefone}</p>
      <label>Data de Check-in:</label>
      <p>${dadosDaReserva.result[0].checkin}</p>
      <label>Data de Check-out:</label>
      <p>${dadosDaReserva.result[0].checkout}</p>
      <label>Acomodação:</label>
      <p>${dadosDaReserva.result[0].roomType}</p>
    `;
    detalhesConfirmacao.innerHTML = html;
  } catch (error) {
    console.error('Erro ao buscar dados da reserva:', error);
  }
}

// Chama a função buscarDadosDaReserva quando a página carregar.
window.onload = buscarDadosDaReserva;
