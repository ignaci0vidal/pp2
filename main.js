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
const { Pedido } = require("./Pedido");
const { Ticket, crearTicket } = require("./Ticket");
const { Detalle_Pedido } = require("./DetallePedido");

try {
    // 1. Setup
    const cliente1 = new Cliente(1, "Ignacio Vidal", "ignacio@mail.com", "minorista", "Consumidor Final", "20-12345678-9", "CABA");
    const producto1 = new Producto(101, "Mouse Gamer", 10, 25000);
    const cupon1 = new Cupon("DESC10", 10, "2026-12-31", 100, 1);

    // 2. Crear Pedido
    const pedido1 = new Pedido(5001, cliente1.getIdCliente(), cupon1.id_cupon);

    // 3. Agregar Productos (Regla: Validar Stock)
    const cantidadAComprar = 2;
    if (producto1.hayStock(cantidadAComprar)) {
        const detalle = new Detalle_Pedido(pedido1.id_pedido, 1, producto1.idProducto, cantidadAComprar, producto1.precio);
        pedido1.agregarDetalle(detalle);
        
        // Regla: Descontar stock al confirmar
        producto1.reducirStock(cantidadAComprar);
    }

    // 4. Calcular Totales con Cupón
    pedido1.actualizarTotales(cupon1);

    // 5. Pago y Emisión de Ticket
    pedido1.estado = "pagado";

    if (pedido1.estado === "pagado") {
        const nuevoTicket = crearTicket({
            id_ticket: 900,
            id_pedido: pedido1.id_pedido,
            fecha_emision: new Date().toISOString(),
            tipo_factura: "B",
            total: pedido1.total,
            CAE: "CAE1234567890"
        });

        console.log("Pedido realizado con éxito");
        console.log(`Cliente: ${cliente1.nombre}`);
        console.log(`Total: $${pedido1.total} (Ahorro: $${pedido1.descuentoMonto})`);
        console.log("--- TICKET GENERADO ---");
        console.log(`Ticket ID: ${nuevoTicket.id_ticket} - CAE: ${nuevoTicket.CAE}`);
    }

} catch (error) {
    console.error("Error en el proceso:", error.message);
    console.log(`Stock restante de ${producto1.descripcion}: ${producto1.stock} unidades.`);
} 

