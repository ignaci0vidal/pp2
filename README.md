# PP2 - Sistema de Gestión de Ventas

Trabajo práctico de la materia **Desarrollo de sistemas de información orientados a la gestión y apoyo de decisiones**.

## Integrantes
- Vidal, Ignacio
- Demartini, Pablo
- Corral, Lucia
- Hernandez, Ignacio
- Guisande, Carla

## Descripción
Este proyecto modela un sistema básico de gestión de ventas, contemplando clientes, productos, pedidos, cupones, detalle de pedido y tickets.

El objetivo principal es representar mediante código las reglas de negocio definidas en el trabajo práctico, incluyendo:
- registro de clientes
- creación de pedidos
- validación de stock
- aplicación de cupones
- cálculo de subtotales y total final
- cambio de estados del pedido
- emisión de ticket
- reposición de stock ante cancelación

## Estructura del proyecto
- `Cliente.js`: definición de clientes
- `Producto.js`: definición de productos y control de stock
- `Cupon.js`: definición y validación de cupones
- `DetallePedido.js`: detalle de productos incluidos en un pedido
- `Pedido.js`: gestión de pedidos, estados y cálculo de totales
- `Ticket.js`: generación de tickets
- `main.js`: casos de prueba del sistema
- `ReglasNegocio.md`: reglas de negocio del trabajo
- `der.png`: diagrama entidad-relación

## Tecnologías utilizadas
- JavaScript
- Node.js

## Cómo ejecutar el proyecto
1. Clonar el repositorio:
   git clone https://github.com/ignaci0vidal/pp2.git
   
2. Ingresar a la carpeta del proyecto: 
   cd pp2
   
3. Ejecutar el archivo principal:
   node main.js

