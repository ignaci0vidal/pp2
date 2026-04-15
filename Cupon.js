class Cupon {
    constructor(id_cupon, descuento, vencimiento, limite_stock){
        this.id_cupon=id_cupon;
        this.descuento= descuento;
        this.vencimiento=vencimiento;
        this.limite_stock=limite_stock;
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
    */

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
}