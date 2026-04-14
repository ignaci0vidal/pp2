class Cliente {
  constructor(idCliente, nombre, email, tipoCliente, condicionIVA, direccion) {
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.email = email;
    this.tipoCliente = tipoCliente;
    this.condicionIVA = condicionIVA;
    this.direccion = direccion;
  }

  esCorporativo() {
    return this.tipoCliente.toLowerCase() === "corporativo";
  }
  
};


