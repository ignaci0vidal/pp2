class Cupon {
    constructor(id_cupon, porcentaje_descuento, fecha_vencimiento, limite_uso_global, limite_uso_por_cliente) {
        this.id_cupon = id_cupon;
        this.descuento = porcentaje_descuento;
        this.vencimiento = new Date(fecha_vencimiento); // Aseguramos objeto Date
        this.limite_stock = limite_uso_global;
        this.limite_uso_por_cliente = limite_uso_por_cliente;
        this.usos_actuales = 0; // Contador interno
    }

    // --- Getters ---
    getIdCupon() { return this.id_cupon; }
    getDescuento() { return this.descuento; }
    getVencimiento() { return this.vencimiento; }

    // --- Métodos de Lógica de Negocio ---

    /**
     * Verifica si el cupón aún puede ser utilizado
     */
    esValido() {
        const ahora = new Date();
        const tieneStock = this.usos_actuales < this.limite_stock;
        const noExpirado = ahora <= this.vencimiento;
        
        return tieneStock && noExpirado;
    }

    /**
     * Calcula el descuento aplicado a un monto total
     * @param {number} montoTotal 
     */
    aplicarDescuento(montoTotal) {
        if (!this.esValido()) {
            console.error("El cupón no es válido o ha expirado.");
            return montoTotal;
        }
        const ahorro = (montoTotal * this.descuento) / 100;
        return montoTotal - ahorro;
    }

    /**
     * Incrementa el contador de uso global
     */
    registrarUso() {
        if (this.usos_actuales < this.limite_stock) {
            this.usos_actuales++;
            return true;
        }
        return false;
    }

    // --- Setters con validación ---
    setDescuento(nuevoPorcentaje) {
        if (nuevoPorcentaje > 0 && nuevoPorcentaje <= 100) {
            this.descuento = nuevoPorcentaje;
        }
    }

    setVencimiento(nuevaFecha) {
        this.vencimiento = new Date(nuevaFecha);
    }
}

module.exports = Cupon;

const listadoCupones = [];

const crearCupon = (datos) => {
    const nuevo = new Cupon(
        datos.id_cupon, 
        datos.porcentaje, 
        datos.vencimiento, 
        datos.stock, 
        datos.limiteCliente
    );
    listadoCupones.push(nuevo);
    return nuevo;
};

const obtenerCuponPorId = (id) => listadoCupones.find(c => c.id_cupon === id);

const actualizarStockCupon = (id, nuevoStock) => {
    const cupon = obtenerCuponPorId(id);
    if (cupon) {
        cupon.limite_stock = nuevoStock;
        return true;
    }
    return false;
};

const eliminarCupon = (id) => {
    const index = listadoCupones.findIndex(c => c.id_cupon === id);
    if (index !== -1) return listadoCupones.splice(index, 1);
    return null;
};

module.exports = {
    Cupon,
    crearCupon,
    obtenerCuponPorId,
    actualizarStockCupon,
    eliminarCupon
};


/* class Cupon {
    constructor(id_cupon, porcentaje_descuento, fecha_vencimiento, limite_uso_global, limite_uso_por_cliente) {
         this.id_cupon = id_cupon;
         this.descuento = porcentaje_descuento;
         this.vencimiento = fecha_vencimiento;
         this.limite_stock = limite_uso_global;
         this.limite_uso_por_cliente = limite_uso_por_cliente;
         // Opcional: para controlar usos actuales
         // this.usos_actuales = 0;
         // Opcional: para controlar estado activo/inactivo
         // this.estado = 'activo';
/*
    SUGERENCIAS PARA REVISAR CON EL GRUPO
    ------------------------------------
    1) En las reglas de negocio se habla de "límite de uso o disponibilidad".
       Capaz conviene renombrar "limite_stock" por "limite_uso",
       porque suena más correcto para un cupón.

       Ejemplo:
       this.limite_uso = limite_uso;

    2) Si quieren controlar cuántas veces ya se usó el cupón,
       podrían agregar un atributo que NO está en el DER actual:

       this.usos_actuales = 0;

    3) Si el cliente debe ingresar un código de cupón en la compra,
       quizás falte un atributo como:

       this.codigo = codigo;

    4) Si quieren guardar si el cupón está activo/inactivo además del vencimiento,
       podría agregarse:

       this.estado = estado;
    

    }

    getIdcupon(){
        return this.id_cupon;
    }
    getDescuento(){
        return this.descuento;
    }       
    getVencimiento(){
        return this.vencimiento;
    }
    getLimiteStock(){
        return this.limite_stock;
    }       
    
    setDescuento(descuento) {
      this.descuento = descuento;
    }

    setVencimiento(vencimiento) {
       this.vencimiento = vencimiento;
    }

    setLimiteStock(limite_stock) {
       this.limite_stock = limite_stock;
    }

    /*
  --POSIBLES METODOS
  ------------------------------------------------
  Estas operaciones salen de las reglas de negocio,
  pero NO necesariamente del DER.

  1) Validar si el cupón sigue vigente:
  
  estaVigente(fechaActual) {
    return new Date(fechaActual) <= new Date(this.vencimiento);
  }

  2) Validar si no superó el límite de uso:
     Esto solo tendría sentido si agregan "usos_actuales".

  tieneDisponibilidad() {
    return this.usos_actuales < this.limite_stock;
  }

  3) Validar si el cupón puede aplicarse:
  
  esValido(fechaActual) {
    return this.estaVigente(fechaActual) && this.tieneDisponibilidad();
  }
  */
