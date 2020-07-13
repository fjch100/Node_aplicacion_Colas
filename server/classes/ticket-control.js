const fs = require('fs');

class Ticket {
    constructor(number, escritorio) {
        this.number = number;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ultimos4 = data.ultimos4;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }
        console.log('JSON-data-file', data);
        console.log('Data server Ultimo:', this.ultimo);
        console.log('Data server Hoy:', this.hoy);
        console.log('Data server ultimos4:', this.ultimos4);
    };

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarArchivo();
        return this.ultimo;
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets por atender';
        }
        let numeroTicket = this.tickets[0].number;
        this.tickets.shift(); //elimino el primero
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket) // colocamos el ticket de primero
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // elimina el ultimo(quinto) ticket 
        }
        console.log('ultimos 4: ', this.ultimos4);
        this.guardarArchivo();
        //return numeroTicket;
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.guardarArchivo();
        console.log('Se ha inicializado el sistema');
    }

    guardarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let dataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', dataString);
    }

}
module.exports = {
    TicketControl
}