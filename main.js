/* --- 1. SET UP INICIAL (Simulación de BD) --- 
const prod1 = new Producto(1, "Smartphone", 10000, 10); 
const clienteAna = new Cliente(1, "Ana López", "ana@mail.com", false);
const promoVerano = { porcentaje: 5, esValido: () => true }; // Mock de Descuento 

// --- 2. INICIO DEL FLUJO DE COMPRA --- 
const ordenAna = new OrdenCabecera(101, new Date(), clienteAna); 
ordenAna.descuento = promoVerano; // Aplica cupón 

// --- 3. SELECCIÓN DE PRODUCTOS (Validación de Stock) --- 
let cantDeseada = 2; 
if (prod1.hayStock(cantDeseada)) { 
  ordenAna.agregarDetalle(new OrdenDetalle(1, prod1, cantDeseada)); 
  prod1.reducirStock(cantDeseada); // Restamos el inventario 
  } else { 
    console.log(`Error: No hay stock para ${prod1.nombre}`); 
  } 
    
// --- 4. CIERRE Y FACTURACIÓN --- 
ordenAna.calcularTotal(); 
ordenAna.estado = "pagado"; 

// --- 5. EMISIÓN DEL TICKET --- 
console.log("=== TICKET DE COMPRA ==="); 
console.log(`Cliente: ${ordenAna.cliente.nombre}`); 
console.log(`Subtotal: $${ordenAna.subtotal}`); 
console.log(`Descuento aplicado: $${ordenAna.descuentoMonto}`); 
console.log(`TOTAL A PAGAR: $${ordenAna.total}`);


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
}*/


/*
const { Cliente } = require("./Cliente");
const { Cupon } = require("./Cupon");
const { Producto } = require("./Producto");
const Pedido = require("./Pedido"); 
const { crearTicket } = require("./Ticket");
const { Detalle_Pedido } = require("./DetallePedido");

let producto1; 

try {
    // 1. Creamos los objetos
    // Corregido: Usamos id_cliente como espera el constructor de Cliente.js
    const cliente1 = new Cliente(1, "Ignacio Vidal", "ignacio@mail.com", "minorista", "Consumidor Final", "20-12345678-9", "CABA");
    
    producto1 = new Producto(101, "Mouse Gamer", 10, 25000);
    
    const cupon1 = new Cupon("DESC10", 10, "2026-12-31", 100, 1);

    // 2. Iniciamos el pedido
    const pedido1 = new Pedido(5001, cliente1.id_cliente, cupon1.id_cupon);

    // 3. Validamos stock y agregamos el producto
    const cantidadAComprar = 2;
    if (producto1.hayStock(cantidadAComprar)) {
        // Corregido: id_producto (con guion bajo) para coincidir con Producto.js
        const detalle = new Detalle_Pedido(
            pedido1.id_pedido, 
            1, 
            producto1.id_producto, 
            cantidadAComprar, 
            producto1.precio
        );
        pedido1.agregarDetalle(detalle);
        producto1.reducirStock(cantidadAComprar);
    }

    // 4. Aplicamos el cupón (asumiendo 0 usos previos del cliente)
    pedido1.actualizarTotales(cupon1, 0);

    // 5. Finalizamos el pago
    pedido1.setEstado("pagado");

    // 6. Generamos el Ticket
    if (pedido1.estado === "pagado") {
        const nuevoTicket = crearTicket({
            id_ticket: 900,
            tipo_factura: "B",
            CAE: "CAE1234567890"
        }, pedido1);

        console.log("====================================");
        console.log("PROCESO EXITOSO");
        console.log(`Cliente: ${cliente1.nombre}`);
        console.log(`Producto: ${producto1.descripcion}`);
        console.log(`Total a cobrar: $${pedido1.total}`);
        console.log(`Ticket Nro: ${nuevoTicket.id_ticket}`);
        console.log("====================================");
    }

} catch (error) {
    console.error("====================================");
    console.error("ERROR DETECTADO:", error.message);
    if (producto1) {
        console.log(`Estado final del producto: ${producto1.descripcion} - Stock: ${producto1.stock}`);
    }
    console.error("====================================");
}

*/

const { Cliente } = require("./Cliente");
const { Producto } = require("./Producto");
const { Cupon } = require("./Cupon");
const Pedido = require("./Pedido");
const { Detalle_Pedido } = require("./DetallePedido");
const { crearTicket } = require("./Ticket");

console.log("========== INICIO DE PRUEBAS ==========\n");

let producto1;
let producto2;

try {
  // =========================
  // DATOS BASE
  // =========================
  const cliente1 = new Cliente(
    1,
    "Ignacio Vidal",
    "ignacio@mail.com",
    "corporativo",
    "Responsable Inscripto",
    "20-12345678-9",
    "CABA"
  );

  producto1 = new Producto(101, "Mouse Gamer", 10, 25000);
  producto2 = new Producto(102, "Teclado Mecanico", 5, 40000);

  const cupon1 = new Cupon("DESC10", 10, "2026-12-31", 100, 1);

  console.log("Stock inicial:");
  console.log(`${producto1.descripcion}: ${producto1.stock}`);
  console.log(`${producto2.descripcion}: ${producto2.stock}`);
  console.log("\n----------------------------------\n");

  // =========================
  // PEDIDO 1 - PAGADO
  // =========================
  console.log("PEDIDO 1 - CASO PAGADO\n");

  const pedido1 = new Pedido(5001, cliente1.id_cliente, cupon1.id_cupon);

  const cantidadMouse = 2;
  const cantidadTeclado = 1;

  if (producto1.hayStock(cantidadMouse)) {
    const detalle1 = new Detalle_Pedido(
      pedido1.id_pedido,
      1,
      producto1.id_producto,
      cantidadMouse,
      producto1.precio
    );
    pedido1.agregarDetalle(detalle1);
    producto1.reducirStock(cantidadMouse);
  } else {
    throw new Error("No hay stock suficiente de Mouse Gamer.");
  }

  if (producto2.hayStock(cantidadTeclado)) {
    const detalle2 = new Detalle_Pedido(
      pedido1.id_pedido,
      2,
      producto2.id_producto,
      cantidadTeclado,
      producto2.precio
    );
    pedido1.agregarDetalle(detalle2);
    producto2.reducirStock(cantidadTeclado);
  } else {
    throw new Error("No hay stock suficiente de Teclado Mecanico.");
  }

  // aplica cupón válido con 0 usos previos del cliente
  pedido1.actualizarTotales(cupon1, 0);
  pedido1.setEstado("pagado");

  const ticket1 = crearTicket(
    {
      id_ticket: 9001,
      tipo_factura: "A",
      CAE: "CAE1234567890"
    },
    pedido1
  );

  console.log("Cliente:", cliente1.nombre);
  console.log("Estado del pedido:", pedido1.estado);
  console.log("Subtotal: $" + pedido1.subtotal);
  console.log("Descuento: $" + pedido1.descuentoMonto);
  console.log("Total: $" + pedido1.total);
  console.log("Ticket generado:", ticket1.id_ticket);

  console.log("\nStock luego del pedido pagado:");
  console.log(`${producto1.descripcion}: ${producto1.stock}`);
  console.log(`${producto2.descripcion}: ${producto2.stock}`);

  console.log("\n----------------------------------\n");

  // =========================
  // PEDIDO 2 - CANCELADO
  // =========================
  console.log("PEDIDO 2 - CASO CANCELADO\n");

  const pedido2 = new Pedido(5002, cliente1.id_cliente, null);

  const cantidadPedido2 = 1;

  if (producto1.hayStock(cantidadPedido2)) {
    const detalle3 = new Detalle_Pedido(
      pedido2.id_pedido,
      1,
      producto1.id_producto,
      cantidadPedido2,
      producto1.precio
    );
    pedido2.agregarDetalle(detalle3);
    producto1.reducirStock(cantidadPedido2);
    pedido2.setEstado("reservado");
  } else {
    throw new Error("No hay stock suficiente para el segundo pedido.");
  }

  console.log("Estado antes de cancelar:", pedido2.estado);
  console.log("Subtotal pedido 2: $" + pedido2.subtotal);
  console.log("Total pedido 2: $" + pedido2.total);

  console.log("\nStock antes de cancelar:");
  console.log(`${producto1.descripcion}: ${producto1.stock}`);
  console.log(`${producto2.descripcion}: ${producto2.stock}`);

  // en este código actual la cancelación y reposición se hacen manualmente
  pedido2.setEstado("cancelado");
  producto1.aumentarStock(cantidadPedido2);

  console.log("\nPedido cancelado correctamente.");
  console.log("Estado después de cancelar:", pedido2.estado);

  console.log("\nStock luego de cancelar:");
  console.log(`${producto1.descripcion}: ${producto1.stock}`);
  console.log(`${producto2.descripcion}: ${producto2.stock}`);

  console.log("\n========== FIN DE PRUEBAS ==========");
} catch (error) {
  console.error("Ocurrió un error:", error.message);

  if (producto1) {
    console.log(`Stock actual ${producto1.descripcion}: ${producto1.stock}`);
  }

  if (producto2) {
    console.log(`Stock actual ${producto2.descripcion}: ${producto2.stock}`);
  }
}