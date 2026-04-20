**Reglas de Negocio**


•	El sistema debe registrar clientes con los siguientes datos: id_cliente, nombre, email, tipo_cliente, condicion_IVA, CUIT/CUIL y direccion.
•	Un cliente puede realizar muchos pedidos, pero cada pedido pertenece a un solo cliente.
•	Cada pedido debe registrarse con un identificador único, fecha_creacion, estado y campos de auditoría como created_at y updated_at.
•	El estado de un pedido debe permitir conocer su situación dentro del sistema. Los valores posibles pueden ser, por ejemplo: pendiente, reservado, pagado o cancelado.
•	Un pedido puede tener asociado un cupón de descuento, aunque también puede existir sin cupón.
•	Un cupón debe registrarse con su identificador, porcentaje de descuento, fecha de vencimiento, límite global de uso y límite de uso por cliente.
•	Un cupón solo puede aplicarse si se encuentra vigente, no superó su límite global y el cliente no excedió su límite individual de uso.
•	Un pedido debe contener uno o más detalles de pedido, ya que allí se registran los productos seleccionados.
•	Cada detalle de pedido pertenece a un único pedido.
•	Cada detalle de pedido debe estar asociado a un único producto.
•	Un producto puede aparecer en muchos detalles de pedido distintos.
•	Cada producto debe registrarse con id_producto, descripcion, stock y precio_actual.
•	La cantidad solicitada de un producto en un detalle de pedido debe ser mayor a cero.
•	Un producto solo puede agregarse a un pedido si el stock disponible es suficiente.
•	Cuando un producto se incorpora a un pedido pendiente o confirmado, el sistema debe reservar o descontar stock de forma consistente para evitar sobreventa.
•	Si un pedido pasa a estado cancelado, el sistema debe reponer automáticamente el stock previamente reservado o descontado.
•	En cada detalle de pedido debe almacenarse el precio_unitario_historico del producto al momento de la compra, para conservar el precio histórico y evitar que una modificación posterior altere pedidos ya realizados.
•	El subtotal de cada detalle de pedido se calcula multiplicando la cantidad por el precio_unitario_historico.
•	El total del pedido se obtiene sumando los subtotales de todos sus detalles y aplicando, en caso de corresponder, descuentos corporativos y/o el descuento del cupón.
•	Un ticket solo puede emitirse si el pedido se encuentra previamente cerrado o marcado como pagado.
•	Cada ticket debe registrar, como mínimo, id_ticket, id_pedido, fecha_emision, tipo_factura, total, CAE y sus propios campos de auditoría.
•	El tipo de factura del ticket debe determinarse en función de la condición de IVA del cliente y de la disponibilidad de su CUIT/CUIL.

