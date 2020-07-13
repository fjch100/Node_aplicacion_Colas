/*****************************************
 * archivo JS para el manejo de tickets-socket
 * en el cliente (BROWSER)
 * 
 *****************************************/

var socket = io();
var lblTicket1 = document.getElementById('lblTicket1'); //ticket-actual-numero => W
var lblEscritorio1 = document.getElementById('lblEscritorio1'); //ticket-actual-escritorio
var lblTicket2 = document.getElementById('lblTicket2'); //ticket-secundario  => X
var lblEscritorio2 = document.getElementById('lblEscritorio2'); //
var lblTicket3 = document.getElementById('lblTicket3'); //ticket-secundario  => Y
var lblEscritorio3 = document.getElementById('lblEscritorio3'); //
var lblTicket4 = document.getElementById('lblTicket4'); //ticket-secundario  => Z
var lblEscritorio4 = document.getElementById('lblEscritorio4'); //
var audiofile = document.getElementById('audiofile');


socket.on('connect', function() {
    console.log('Socket connected');
});

socket.on('disconnect', function() {
    console.log('Socket disconnected');
});

socket.on('estadoActual', function(data) {
    console.log(data);
    actualizaHTML(data);
});

socket.on('ultimos4', async function(data) {
    console.log('ultimos 4 ', data);
    // let audiofile = new Audio("audio/new-ticket.mp3");
    // await audiofile.play();
    actualizaHTML(data);

});

function actualizaHTML(data) {
    lblTicket1.textContent = `Ticket ${data.ultimos4[0].number}`;
    lblEscritorio1.textContent = `Escritorio ${data.ultimos4[0].escritorio}`;
    lblTicket2.textContent = `Ticket ${data.ultimos4[1].number}`;
    lblEscritorio2.textContent = `Escritorio ${data.ultimos4[1].escritorio}`;
    lblTicket3.textContent = `Ticket ${data.ultimos4[2].number}`;
    lblEscritorio3.textContent = `Escritorio ${data.ultimos4[2].escritorio}`;
    lblTicket4.textContent = `Ticket ${data.ultimos4[3].number}`;
    lblEscritorio4.textContent = `Escritorio ${data.ultimos4[3].escritorio}`;

}