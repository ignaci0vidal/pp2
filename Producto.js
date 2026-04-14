class Producto {
  constructor(idProducto, descripcion, stock, precio) {
    this.idProducto = idProducto;
    this.descripcion = descripcion;
    this.stock = stock;
    this.precio = precio;
  }

  hayStock(cantidad) {
    return this.stock >= cantidad;
  }

  
}
