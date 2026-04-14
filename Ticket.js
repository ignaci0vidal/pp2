class Ticket {
    constructor(parameters) {
        
   this.idTicket = idTicket;

   this.tipoFactura = tipoFactura;

   this.cae= cae;

   this.idPedido = idPedido;
    }
    estaValidado()
    {
        return this.cae !== null && this.cae !== undefined;
    }
}
