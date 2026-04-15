Reglas de Negocio


El sistema debe registrar clientes con los siguientes datos: id_cliente, nombre, email, tipo_cliente, condicion_IVA y direccion.

Un cliente puede realizar muchos pedidos, pero cada pedido pertenece a un solo cliente.

Cada pedido debe registrarse con un identificador único, una fecha y un estado.

El estado de un pedido debe permitir conocer su situación dentro del sistema. Los valores posibles pueden ser, por ejemplo: pendiente, pagado o cancelado.

Un pedido puede tener asociado un cupón de descuento, aunque también puede existir sin cupón.

Un cupón debe registrarse con su identificador, porcentaje de descuento, fecha de vencimiento y límite de uso o disponibilidad.

Un cupón solo puede aplicarse si se encuentra vigente y si no superó su límite de uso.

Un pedido debe contener uno o más detalles de pedido, ya que allí se registran los productos seleccionados.

Cada detalle de pedido pertenece a un único pedido.

Cada detalle de pedido debe estar asociado a un único producto.

Un producto puede aparecer en muchos detalles de pedido distintos.

Cada producto debe registrarse con id_producto, descripcion, stock y precio.

La cantidad solicitada de un producto en un detalle de pedido debe ser mayor a cero.

Un producto solo puede agregarse a un pedido si el stock disponible es suficiente.

Cuando un producto se incorpora a un pedido confirmado, el sistema debe descontar la cantidad correspondiente del stock.

En cada detalle de pedido debe almacenarse el precio_unitario del producto al momento de la compra, para conservar el precio histórico y evitar que una modificación posterior en el precio del producto altere pedidos ya realizados. Esto además queda alineado con la guía, que marca el precio histórico como requisito clave.

El subtotal de cada detalle de pedido se calcula multiplicando la cantidad por el precio_unitario.

El total del pedido se obtiene sumando los subtotales de todos sus detalles y aplicando, en caso de corresponder, el descuento del cupón.

Un pedido pagado puede generar un ticket.

Cada ticket debe estar asociado a un único pedido.

El ticket debe registrar, como mínimo, id_ticket, id_pedido, tipo_factura, total y CAE.

No puede emitirse un ticket si el pedido no fue previamente cerrado o marcado como pagado.
