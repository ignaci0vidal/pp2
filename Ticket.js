class Ticket {
  constructor(id_ticket, id_pedido, fecha_emision, tipo_factura, total, CAE, created_at, updated_at) {
    this.id_ticket = id_ticket;
    this.id_pedido = id_pedido;
    this.fecha_emision = fecha_emision;
    this.tipo_factura = tipo_factura;
    this.total = total;
    this.CAE = CAE;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  // --- Getters ---
  getIdTicket() { return this.id_ticket; }
  getIdPedido() { return this.id_pedido; }
  getTotal() { return this.total; }
  getCAE() { return this.CAE; }

  // --- Setters ---
  setTotal(nuevoTotal) {
    if (nuevoTotal >= 0) {
      this.total = nuevoTotal;
      this.updated_at = new Date().toISOString();
    }
  }

  setTipoFactura(nuevoTipo) {
    this.tipo_factura = nuevoTipo;
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Ticket;

const tickets = [];

function crearTicket(datos) {
  const nuevoTicket = new Ticket(
    datos.id_ticket,
    datos.id_pedido,
    datos.fecha_emision,
    datos.tipo_factura,
    datos.total,
    datos.CAE
  );
  tickets.push(nuevoTicket);
  return nuevoTicket;
}

function obtenerTicket(id_ticket) {
  return tickets.find(ticket => ticket.getIdTicket() === id_ticket);
}

function actualizarTotal(id_ticket, nuevoTotal) {
  const ticket = obtenerTicket(id_ticket);
  if (ticket) {
    ticket.setTotal(nuevoTotal);
    return ticket;
  }
  return null;
}

function eliminarTicket(id_ticket) {
  const index = tickets.findIndex(ticket => ticket.getIdTicket() === id_ticket);
  if (index !== -1) {
    tickets.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  crearTicket,
  obtenerTicket,
  actualizarTotal,
  eliminarTicket
};


