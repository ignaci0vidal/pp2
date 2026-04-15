class Pedido {
    constructor(id_Cliente, id_cupon = null, estado_pedido = 'pendiente', fecha = new Date(), id_pedido = null) {
        this.id_pedido = id_pedido;
        this.id_Cliente = id_Cliente;
        this.id_cupon = id_cupon;
        this.fecha = fecha;
        this.estado_pedido = estado_pedido;
    }

    // --- MÉTODOS CRUD ESTÁTICOS ---

    // CREATE: Registrar la cabecera del pedido
    static async create(pool, pedido) {
        const query = `
            INSERT INTO pedidos (id_cliente, id_cupon, estado, fecha)
            VALUES ($1, $2, $3, $4)
            RETURNING id_pedido;
        `;
        const values = [
            pedido.id_Cliente, 
            pedido.id_cupon, 
            pedido.estado_pedido, 
            pedido.fecha
        ];
        const res = await pool.query(query, values);
        return res.rows[0].id_pedido;
    }

    // READ: Obtener un pedido por su ID (incluyendo el total calculado)
    static async getById(pool, id_pedido) {
        const query = 'SELECT * FROM pedidos WHERE id_pedido = $1';
        const res = await pool.query(query, [id_pedido]);
        
        if (res.rows.length === 0) return null;
        
        const p = res.rows[0];
        return new Pedido(p.id_cliente, p.id_cupon, p.estado, p.fecha, p.id_pedido);
    }

    // READ ALL: Obtener todos los pedidos de un cliente
    static async getByCliente(pool, id_cliente) {
        const query = 'SELECT * FROM pedidos WHERE id_cliente = $1 ORDER BY fecha DESC';
        const res = await pool.query(query, [id_cliente]);
        return res.rows.map(p => new Pedido(p.id_cliente, p.id_cupon, p.estado, p.fecha, p.id_pedido));
    }

    // UPDATE: Cambiar el estado (Ej: de 'pendiente' a 'pagado')
    // Regla de negocio: Solo se emite ticket si el estado es 'pagado'
    static async updateEstado(pool, id_pedido, nuevoEstado) {
        const estadosValidos = ['pendiente', 'pagado', 'cancelado'];
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error("Estado no válido");
        }

        const query = 'UPDATE pedidos SET estado = $1 WHERE id_pedido = $2 RETURNING *';
        const res = await pool.query(query, [nuevoEstado, id_pedido]);
        return res.rows[0];
    }

    // DELETE: Eliminar un pedido
    // Nota: Por integridad referencial, esto suele borrar también los detalles si usaste ON DELETE CASCADE
    static async delete(pool, id_pedido) {
        const query = 'DELETE FROM pedidos WHERE id_pedido = $1';
        await pool.query(query, [id_pedido]);
        return { success: true, message: `Pedido ${id_pedido} eliminado` };
    }
}