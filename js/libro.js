// Variable global para asignar la ruta el libro
var ruta = ""

function cargarLibro() {
	firebase.auth().onAuthStateChanged(user => {
		// Referencia del usuario actual
		var userId = firebase.auth().currentUser.uid;
		// Referencia de la ruta del libro previamente abierto
		var rutaLibro = firebase.database().ref('users/' + userId + '/libro/libro_actual');
		// Asigno el valor de la referencia a la variable ruta para obtener la ubicación del archivo cliqueado
		rutaLibro.on("value", function(snapshot) {
			ruta = snapshot.val();
			contenidoLibro()
			// uso la varibla global para acceder a la referencia de la base de datos del libro cliqueado
			// var libro = firebase.database().ref(ruta); 
			// libro.on("child_added", snapshot => {
			// var dato.innerText = snapshot.val();


		})
})};	


// Escribe el contenido del libro en el HTML
function contenidoLibro() {
	var libro = firebase.database().ref().child(ruta);
	libro.on("child_added", function(snapshot) {
		var dato = snapshot.val();
		// Selecciono elementos y escribo los datos
		$('#título').append(dato.título);
		$('#autor').append(dato.autor);
		$('#botón-compra').append('$' + dato.precio);
		$('#fecha-lanzamiento').append(dato.publicado);
		$('#descripción-libro').append(dato.descripción);
		$('#descripción-autor').append(dato.acerca);
		document.getElementById('portada-libro').src = dato.url;
	})
}


function compraLibro() {
	// Observador
	firebase.auth().onAuthStateChanged(user => {
		// Si hay un usuario logueado ejecuto el IF 
		  if (user) { 
  			// Selecciono el usuario conectado
  			var userId = firebase.auth().currentUser.uid;
	    	// Refiero a la carpeta de los datos para obtener el CVV almacenado
	    	var leerNumCVV = firebase.database().ref('users/' + userId + '/tarjetas/tarjeta01/número_CVV');
	    	// Obtengo el valor del CVV almacenado
	    	leerNumCVV.on("value", function(snapshot){
	    		var cvvAlmacenado = snapshot.val();
	   	    	//Si el cvv está guardado, el html se dirije a "CompraConTarjeta", sino va a "CompraSinTarjeta" 
	   	    	if (cvvAlmacenado != undefined) {
	   	    		setTimeout(function(){ window.location = 'compraConTarjeta.html'; }, 1000);
	   	    	}
	   	    	else {
	   	    		setTimeout(function(){ window.location = 'compraSinTarjeta.html'; }, 1000);
	   	    	}
	   	    	})
	    }
	})
}

