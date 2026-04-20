class Pedido {
    constructor( id_pedido, id_cliente, id_cupon, fecha_creacion, estado, created_at, updated_at ) {
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_cupon = id_cupon;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    getIdPedido() {
        return this.id_pedido;
    }

    getIdCliente() {
        return this.id_cliente;
    }

    getIdCupon() {
        return this.id_cupon;
    }

    getFechaCreacion() {
        return this.fecha_creacion;
    }

    getEstado() {
        return this.estado;
    }

    getCreatedAt() {
        return this.created_at;
    }

    getUpdatedAt() {
        return this.updated_at;
    }
}

class PedidoManager {
    constructor() {
        this.pedidos = [];
    }

    // 1. CREATE: Agregar un nuevo pedido
    create(pedido) {
        if (!(pedido instanceof Pedido)) {
            throw new Error("El objeto no es una instancia de Pedido");
        }
        this.pedidos.push(pedido);
        console.log(`Pedido ${pedido.id_pedido} creado con éxito.`);
        return pedido;
    }

    // 2. READ: Obtener todos o uno solo por ID
    findAll() {
        return this.pedidos;
    }

    findById(id) {
        const pedido = this.pedidos.find(p => p.id_pedido === id);
        return pedido || null;
    }

    // 3. UPDATE: Actualizar datos de un pedido existente
    update(id, nuevosDatos) {
        const index = this.pedidos.findIndex(p => p.id_pedido === id);
        
        if (index !== -1) {
            // Mantenemos la identidad del objeto y actualizamos sus propiedades
            this.pedidos[index] = { 
                ...this.pedidos[index], 
                ...nuevosDatos, 
                updated_at: new Date().toISOString() // Actualización automática de fecha
            };
            return this.pedidos[index];
        }
        return null;
    }

    // 4. DELETE: Eliminar un pedido
    delete(id) {
        const index = this.pedidos.findIndex(p => p.id_pedido === id);
        if (index !== -1) {
            const eliminado = this.pedidos.splice(index, 1);
            return eliminado[0];
        }
        return null;
    }
}