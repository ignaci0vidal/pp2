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
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
    // Método para cambiar el estado cumpliendo con la regla de auditoría
    setEstado(nuevoEstado) {
        const estadosValidos = ["pendiente", "reservado", "pagado", "cancelado"];
        
        if (estadosValidos.includes(nuevoEstado)) {
            this.estado = nuevoEstado;
            // Regla de negocio: Actualizar siempre el campo updated_at
            this.updated_at = new Date().toISOString();
        } else {
            console.error("Estado no válido");
        }
    }   

    // El método para agregar detalle
    agregarDetalle(detalle) {
        this.detalles.push(detalle);
        this.actualizarTotales();
    }

    actualizarTotales(cuponObjeto = null, usosDelCliente = 0) {
        this.subtotal = this.detalles.reduce((acc, det) => acc + det.subtotal, 0);
        
        // Pasamos usosDelCliente para que el cupón valide el límite individual
        if (cuponObjeto && typeof cuponObjeto.esValido === 'function' && cuponObjeto.esValido(usosDelCliente)) {
            this.descuentoMonto = (this.subtotal * cuponObjeto.getDescuento()) / 100;
        } else {
            this.descuentoMonto = 0;
        }

        this.total = this.subtotal - this.descuentoMonto;
        this.updated_at = new Date().toISOString();
    }

    // Mantén tus Getters abajo si los necesitas
    getIdPedido() { return this.id_pedido; }
    getEstado() { return this.estado; }
}

// No olvides exportarla correctamente al final del archivo
class PedidoManager { 
    /* tu código de manager aquí */ 
}

module.exports = Pedido;