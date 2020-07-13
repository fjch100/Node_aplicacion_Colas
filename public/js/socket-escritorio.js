/*****************************************
 * archivo JS para el manejo de tickets-socket
 * en el ESCRITORIO-CLIENTE (BROWSER)
 * 
 *****************************************/

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
console.log('escritorio: ', escritorio);
document.getElementById('h1').textContent = `Escritorio # ${escritorio}`;

var boton = document.getElementById('boton');
boton.addEventListener('click', function(event) {
    socket.emit('atenderTicket', { escritorio }, function(ticket_a_atender) {
        console.log(ticket_a_atender);
        if (ticket_a_atender === 'No hay tickets por atender') {
            document.getElementById('small').textContent = `Ticket: ${ticket_a_atender}`;
        } else {
            document.getElementById('small').textContent = `Ticket: ${ticket_a_atender.escritorio}`;
        }

    })
});