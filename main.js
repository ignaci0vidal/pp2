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
*/

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