const servidor = 'http://localhost'; // Endereço do servidor
const porta = 3000; // Número da porta para se comunicar com o servidor

const urlParams = new URLSearchParams(window.location.search);
const reservationId = urlParams.get('reservationId');

// Função para buscar os dados da reserva no servidor usando o ID da reserva.
function buscarDadosDaReserva() {
    fetch(`${servidor}:${porta}/reserva/${reservationId}`)
    .then(response => response.json())
    .then(data => {
        // Preenche a página de confirmação com os dados da reserva obtidos.
        const detalhesConfirmacao = document.getElementById('confirmation-details');
        const dadosDaReserva = data.reservation;
        const html = `
        <label>Nome:</label>
        <p>${dadosDaReserva.nome}</p>
        <label>E-mail:</label>
        <p>${dadosDaReserva.email}</p>
        <label>Telefone:</label>
        <p>${dadosDaReserva.telefone}</p>
        <label>Data de Check-in:</label>
        <p>${dadosDaReserva.checkIn}</p>
        <label>Data de Check-out:</label>
        <p>${dadosDaReserva.checkOut}</p>
        <label>Número de Dias:</label>
        <p>${dadosDaReserva.days} dias</p>
        <label>Acomodação:</label>
        <p>${dadosDaReserva.roomType}</p>
        <h2>Valor Final da Reserva:</h2>
        <h3>R$ ${dadosDaReserva.finalPrice}</h3>
        `;
        detalhesConfirmacao.innerHTML = html;
    })
    .catch(error => {
        console.error('Erro ao buscar dados da reserva:', error);
    });
}

// Chama a função buscarDadosDaReserva quando a página carregar.
window.onload = buscarDadosDaReserva;
