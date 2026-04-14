class Ticket {
  constructor(id_ticket, tipoFactura, cae, id_pedido) {
    this.id_ticket = id_ticket;
    this.tipoFactura = tipoFactura;
    this.cae = cae;
    this.id_pedido = id_pedido;
    
    // Propiedades adicionales para los cálculos
    this.subtotal = 0;
    this.descuentoTotal = 0;
    this.totalFinal = 0;
    this.estado = "Pendiente";
  }

  //Calcular subtotal con descuentos aplicados
  calcularTotales(montoBase, esCorporativo, tieneCupon) {
    let porcentajeDescuento = 0;

    if (esCorporativo) {
      porcentajeDescuento += 0.10; // 10%
    }
    
    if (tieneCupon) {
      porcentajeDescuento += 0.05; // 5%
    }

    this.subtotal = montoBase;
    this.descuentoTotal = montoBase * porcentajeDescuento;
    this.totalFinal = this.subtotal - this.descuentoTotal;
    
    return this.totalFinal;
  }

  //Confirmar pedido y método de pago
  confirmarDatos(metodoPago) {
    console.log(`Pedido ${this.id_pedido} confirmado con: ${metodoPago}`);
    this.metodoPago = metodoPago;
  }

  // Procesar pago
  procesarPago() {
    console.log("Procesando pago de: $" + this.totalFinal);
    this.estado = "Pagado";
  }

  // Emitir ticket / comprobante
  emitirComprobante() {
    if (this.estado !== "Pagado") {
      return "Error: No se puede emitir ticket sin confirmar el pago.";
    }
    
    return {
      nroTicket: this.id_ticket,
      tipo: this.tipoFactura,
      cae: this.cae,
      total: this.totalFinal,
      mensaje: "Venta completada con éxito"
    };
  }
}
