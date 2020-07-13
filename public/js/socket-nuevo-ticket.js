/*****************************************
 * archivo JS para el manejo de tickets-socket
 * en el cliente (BROWSER)
 * 
 *****************************************/

var socket = io();

var label = document.getElementById('lblNuevoTicket');
var boton = document.getElementById('boton');

socket.on('connect', function() {
    console.log('Socket connected');
});

socket.on('disconnect', function() {
    console.log('Socket disconnected');
});

socket.on('estadoActual', function(data) {
    console.log(data);
    label.textContent = `Ticket: ${data.ticket}`;
})

/********** Descomentar para iniciar el proceso de traer eñ ticket desde la pagina **********
socket.emit('estadoActual', '', function(ticket) {
        label.textContent = `Ticket: ${ticket}`;
    })

*/

/******** Descomentar si se quiere usar Jquery ***************
    $('button').on('click', function() {
        socket.emit('nuevoTicket', '', function(newTicket) {
            console.log('nuevo ticket: ', newTicket);
            label.textContent = `Ticket: ${newTicket}`;
        });
    });
*/

boton.addEventListener('click', function(event) {
    socket.emit('nuevoTicket', '', function(newTicket) {
        console.log('nuevo ticket: ', newTicket);
        label.textContent = `Ticket: ${newTicket}`;
    });
})