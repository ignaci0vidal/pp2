class Pedido {
    constructor(id_pedido, id_cliente, id_cupon = null) {
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_cupon = id_cupon;
        this.detalles = []; // Array para guardar los productos del pedido
        this.estado = "pendiente"; // Estado inicial según reglas de negocio
        this.fecha_creacion = new Date().toISOString();
        this.subtotal = 0;
        this.descuentoMonto = 0;
        this.total = 0;
    }

    // El método que te faltaba:
    agregarDetalle(detalle) {
        this.detalles.push(detalle);
        this.actualizarTotales();
    }

    // Lógica para calcular subtotal, descuento y total
    actualizarTotales(cuponObjeto = null) {
        // Sumamos los subtotales de cada detalle
        this.subtotal = this.detalles.reduce((acc, det) => acc + det.subtotal, 0);
        
        // Si hay un cupón y es válido, calculamos el descuento
        if (cuponObjeto && typeof cuponObjeto.esValido === 'function' && cuponObjeto.esValido()) {
            this.descuentoMonto = (this.subtotal * cuponObjeto.descuento) / 100;
        } else {
            this.descuentoMonto = 0;
        }

        this.total = this.subtotal - this.descuentoMonto;
    }

    // Mantén tus Getters abajo si los necesitas
    getIdPedido() { return this.id_pedido; }
    getEstado() { return this.estado; }
}

// No olvides exportarla correctamente al final del archivo
class PedidoManager { 
    /* tu código de manager aquí */ 
}

module.exports = { Pedido, PedidoManager };