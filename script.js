function construyeCatalogo(cantidadElementos, destino) {
		let itemCatalogo = ''; 

		contenedor = document.getElementsByClassName(destino); 
		imagenProducto = 'balon-nike|maleta-deportiva|reloj-inteligente|balon-wilson|pesas|candado-bicicleta|guantes-box|set-beisbol|raqueta|set-balones|'; 
        descripcionProducto = 'Balón Nike|Maleta Deportiva|Reloj Inteligente|Balón Wilson|Pesas|Candado para Bicicleta|Guantes para Box|Set de Béisbol|Raqueta|Set de Balones|'; 
        precioProducto = '350.00|1,200.00|3,500.00|300.00|876.00|240.00|780.00|999.00|450.00|999.00|'; 
		
		precioMatriz = precioProducto.split('|'); 
		descripcionMatriz = descripcionProducto.split('|'); 
		imagenMatriz = imagenProducto.split('|');

		for (c = 0; c <= (cantidadElementos - 1); c++) {
            itemConstruccion = '<div class="item">';
            itemConstruccion += '  <span class="titulo-item">' + descripcionMatriz[c] +'</span> ';
            itemConstruccion += '  <img src="img/' + imagenMatriz[c] + '.jpg" alt="' + descripcionMatriz[c] +'" class="img-item"> ';
            itemConstruccion += '  <span class="precio-item">$' + precioMatriz[c] + '</span>';
            itemConstruccion += '  <button class="boton-item" onclick="agregarAlCarritoClicked(event)">Agregar Producto</button> ';
            itemConstruccion += '</div> ';

            itemCatalogo += itemConstruccion;

            
        }

		contenedor.innerHTML = itemCatalogo;

        console.log(contenedor.innerHTML);
}

//Función que controla el botón de agregar al carrito
function agregarAlCarritoClicked(event){
    //traigo al componente que disparó al evento, en este caso, el botón
    var button = event.target;
    //traigo al padre del botón
    var item = button.parentElement;
    //una vez que traigo al padre, traigo el nombre de artículo, su precio e imagen
    var articulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //agrego el item al carrito
    agregarItemAlCarrito(articulo, precio, imagenSrc);

    //actualizo el carrito para hacerlo visible
    mostrarCarrito();
}

//Función para agregar un item al carrito
function agregarItemAlCarrito(articulo, precio, imagenSrc){
    //creamos un nuevo elemento de tipo div
    var item = document.createElement('div');
    //le añadimos una clase de tipo item (<div class="item">)
    item.classList.add = ('item');
    //obtenemos el contenedor del carrito
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //obtenemos los nombres de todos los elementos que están dentro del carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==articulo){
            alert("El artículo ya se encuentra en el carrito");
            return;
        }
    }

    //generamos el contenido del item del carrito
    var itemCarritoContenido = '<div class="carrito-item">';
    itemCarritoContenido += '  <img src="' + imagenSrc + '" width="80px" alt="">';
    itemCarritoContenido += '  <div class="carrito-item-detalles">';
    itemCarritoContenido += '    <span class="carrito-item-titulo">' + articulo + '</span>';
    itemCarritoContenido += '    <div class="selector-cantidad">';
    itemCarritoContenido += '      <i class="fa-solid fa-minus restar-cantidad" onclick="restarCantidad(event)"></i>';
    itemCarritoContenido += '      <input type="text" value="1" class="carrito-item-cantidad" disabled>';
    itemCarritoContenido += '      <i class="fa-solid fa-plus sumar-cantidad" onclick="sumarCantidad(event)"></i>';
    itemCarritoContenido += '    </div>';
    itemCarritoContenido += '    <span class="carrito-item-precio">' + precio + '</span>';
    itemCarritoContenido += '  </div>';
    itemCarritoContenido += '  <button class="btn-eliminar" onclick="eliminarItemCarrito(event)">';
    itemCarritoContenido += '    <i class="fa-solid fa-trash"></i>';
    itemCarritoContenido += '  </button>';
    itemCarritoContenido += '</div>';

    //agregamos el contenido del carrito al div del item que creamos
    item.innerHTML = itemCarritoContenido;
    
    //agregamos el item al carrito
    itemsCarrito.append(item);

    //Actualizamos total
    actualizarTotalCarrito();
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    //traemos todos los items del carrito
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    //definimos el total en cero
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        //obtenemos el precio del elemento
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos símbolos de moneda
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace(',',''));
        //obtenemos la cantidad del item
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        //obtenemos el valor de la cantidad
        var cantidad = cantidadItem.value;
        //realizamos la operación precio por cantidad
        total = total + (precio * cantidad);
    }
    //redondeo
    total = Math.round(total * 100)/100;

    //actualizamos el total del carrito
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("mx") + ".00";

}

//Función para mostrar el carrito
function mostrarCarrito(){
    //obtenemos el componente principal del carrito
    var carrito = document.getElementsByClassName('carrito')[0];
    //actualizamos su estilo en la característica de margin-right a 0
    //originalmente se encuentra en -100%
    carrito.style.marginRight = '0';
    //mostramos el componente con opacidad = 1
    carrito.style.opacity = '1';

    //obtenemos el contenedor de los items de la tiendida
    var items =document.getElementsByClassName('contenedor-items')[0];
    //actualizamos su largo al 60& para que quepa el carrito
    items.style.width = '60%';
}

//Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    //obtenemos el contenedor de items del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    //si no tiene hijos
    if(carritoItems.childElementCount==0){
        //obtenemos el contenedor principal del carrito
        var carrito = document.getElementsByClassName('carrito')[0];

        //lo recorremos actualizando el estilo del carrito
        carrito.style.marginRight = '-100%';
        //lo ocultamos reduciendo su opacidad a 0
        carrito.style.opacity = '0';
        
        //obtenemos el contenedor de los items de la tiendita
        var items =document.getElementsByClassName('contenedor-items')[0];
        //actualizamos su estilo de largo al 100%, que ocupe la totalidad de la pantalla
        items.style.width = '100%';
    }
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    //obtengo el botón que disparó el evento
    var buttonClicked = event.target;
    //obtengo al padre del botón
    var selector = buttonClicked.parentElement;
    //obtengo la cantidad actual que tiene el item en ese momento
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    //le añado 1 a la cantidad actual
    cantidadActual++;
    //actualizo el componente de la cantidad actual
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //como la cantidad del item se vio afectada, recalculamos el precio final
    actualizarTotalCarrito();
}

//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    //obtengo el botón que disparó el evento
    var buttonClicked = event.target;
    //obtengo al padre del botón
    var selector = buttonClicked.parentElement;
    //obtengo la cantidad actual que tiene el item en ese momento
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    //le quito 1 a la cantidad actual
    cantidadActual--;
    if(cantidadActual>=1){
        //actualizo el componente de la cantidad actual
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        //como la cantidad del item se vio afectada, recalculamos el precio final
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    //obtengo el botón que disparó el evento
    var buttonClicked = event.target;
    //elimino al padre del botón, el div carrito-item
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente función controla si quedan elementos en el carrito
    //Si no quedan, elimino el carrito
    ocultarCarrito();
}

//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
