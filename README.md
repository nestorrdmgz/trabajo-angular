# Apunta tu material

El proyecto "Apunta tu material" surge como respuesta a la falta de digitalización en los procedimientos operativos de los cuerpos de emergencia en el municipio de Las Palmas de Gran Canaria, y se reconoce la necesidad de extender esta iniciativa a todo el archipiélago canario. A diario, estos profesionales se ven limitados por la dependencia del papel en lugar de aprovechar plenamente las capacidades que ofrece la tecnología.

Nuestra iniciativa busca ser un primer paso significativo hacia la modernización y optimización de los procesos operativos de los servicios de emergencia. Entendemos que la informatización de estos procesos no solo mejorará la eficiencia interna de los cuerpos de emergencia, sino que también tendrá un impacto positivo en la calidad y la velocidad de respuesta ante situaciones críticas.

"Apunta tu material" consiste en una plataforma que te permite crear listas de material antes de cada servicio y registrar la entrega al finalizar, todo con un sencillo botón. Pero eso no es todo. En futuras actualizaciones, podrás acceder a un historial completo de tus entregas, detallando la fecha y hora de cada una. Pero, ¿crees que ahí termina todo? ¡Ni mucho menos! También estamos implementando un sistema de usuarios supervisores que podrán visualizar todas tus entregas del último mes. Además, si surge algún problema con algún material durante tu servicio, podrás abrir una incidencia que tu supervisor podrá revisar para estar al tanto del asunto. ¿Y qué sucede si llega nuevo material? Será tan sencillo como que tu supervisor lo agregue. Claro, por ahora todos pueden agregarlo, pero esto cambiará pronto para evitar cualquier inconveniente.

## Firebase

Para este proyecto estamos usando dos coleciones las cuales tienen la siguiente estructura:
- productos
  - [ID del producto]
    - nombre: [nombre del producto]
    - num: [cantidad del producto]
    - url: [foto del producto]
    
En esta colección, cada documento representa un producto individual. Cada producto tiene un nombre, una cantidad asociada y una URL que apunta a una foto del producto.


- usuarios
  - [ID del usuario]
    - dni: [dni del usuario]
    - name: [nombre del usuario]
    - password: [contraseña del usuario]
    - id: [id del usuario]
    - carrito
      - [nombre del producto en el carrito]: [cantidad del producto en el carrito]
      - [nombre del producto en el carrito]: [cantidad del producto en el carrito]

En esta colección, cada documento representa un usuario individual. Cada usuario tiene un DNI, un nombre, una contraseña y un ID único. Además, cada usuario tiene un campo "carrito" que almacena los productos que ha añadido al carrito. Dentro del campo "carrito", cada documento representa un producto en el carrito, con su nombre y la cantidad correspondiente.
