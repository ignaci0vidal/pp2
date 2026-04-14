const Cliente = require("./Cliente");
const Cupon = require("./Cupon");
const Producto = require("./Producto");
const Pedido = require("./Pedido");
const Ticket = require("./Ticket");

try {
  const cliente1 = new Cliente(
    1,
    "Ignacio Vidal",
    "ignacio@mail.com",
    "minorista",
    "Consumidor Final",
    "CABA"
  );

  const cupon1 = new Cupon(

  );

  const producto1 = new Producto(1, "Mouse", 10, 25000);
  const producto2 = new Producto(2, "Teclado", 5, 40000);

  const pedido1 = new Pedido(
    
  );

  const ticket1 = new Ticket(
    
  );


  console.log("Pedido realizado con exito");
  console.log("Cliente:", cliente1.nombre);
  console.log("Estado del pedido:", pedido1.estado);
  console.log("Subtotal: $" + pedido1.subtotal);
  console.log("Descuento: $" + pedido1.descuentoMonto);
  console.log("Total: $" + pedido1.total);

  console.log("\n--- TICKET ---");
  console.log(ticket1.imprimir());

} catch (error) {
  console.log("Ocurrio un error:", error.message);
}