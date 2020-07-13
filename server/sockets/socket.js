const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('nuevoTicket', (data, callback) => {
        newTicket = ticketControl.siguiente();
        console.log('nuevo tieckt: ', newTicket);
        callback(newTicket);

    })

    client.emit('estadoActual', {
        ticket: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                error: true,
                message: 'El escritorio es Necesario'
            });
        }
        let ticket_a_Atender = ticketControl.atenderTicket(data.escritorio)
        callback(ticket_a_Atender);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    })

    /********** Descomentar para iniciar el proceso de traer el ticket desde el browser **********
    client.on('estadoActual', (data, callback) => {
        let ticket = ticketControl.getUltimoTicket();
        callback(ticket);
    })
    */

    /****************************************************
        // Escuchar el cliente
        client.on('enviarMensaje', (data, callback) => {

            console.log(data);

            client.broadcast.emit('enviarMensaje', data);
            // if (mensaje.usuario) {
            //     callback({
            //         resp: 'TODO SALIO BIEN!'
            //     });

            // } else {
            //     callback({
            //         resp: 'TODO SALIO MAL!!!!!!!!'
            //     });
            // }

        });
    */

});