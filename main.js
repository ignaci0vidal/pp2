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
        console.log("✅ PROCESO EXITOSO");
        console.log(`Cliente: ${cliente1.nombre}`);
        console.log(`Producto: ${producto1.descripcion}`);
        console.log(`Total a cobrar: $${pedido1.total}`);
        console.log(`Ticket Nro: ${nuevoTicket.id_ticket}`);
        console.log("====================================");
    }

} catch (error) {
    console.error("====================================");
    console.error("❌ ERROR DETECTADO:", error.message);
    if (producto1) {
        console.log(`Estado final del producto: ${producto1.descripcion} - Stock: ${producto1.stock}`);
    }
    console.error("====================================");
}

