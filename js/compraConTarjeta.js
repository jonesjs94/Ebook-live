var ruta;

function verTarjeta() {
	// Observador
	firebase.auth().onAuthStateChanged(user => {
		// Si hay un usuario logueado ejecuto el IF 
		  if (user) { 
		  	// Refiero al usuario conectado 
	    	var userId = firebase.auth().currentUser.uid;
	    	// Refiero a la carpeta de los datos
	    	var leerTarjeta = firebase.database().ref('users/' + userId + '/tarjetas/');
	    	// Leo los "hijos" de la tarjeta y los escribo en sus campos a través de sus ids
	    	leerTarjeta.on("child_added", function(snapshot, prevChildKey) {
	        	var tarjeta = snapshot.val();
	        	$('#nombreTarjeta').append(tarjeta.usuario);
	        	$('#cardNumber').append(tarjeta.número_de_la_tarjeta);
	        	$('#expiración').append(tarjeta.expiración);
	      	});	  	
		};
	});
};

function escribirCVV(numCVV) {
	// Observador
	firebase.auth().onAuthStateChanged(user => {
		// Si hay un usuario logueado ejecuto el IF 
		  if (user) { 
  			// Selecciono el usuario conectado
  			var userId = firebase.auth().currentUser.uid;
			// Tomo los datos del CVV de la tarjeta
			var	cvvIngresado = document.getElementById('numCVV').value;
	    	// Refiero a la carpeta de los datos para obtener el CVV almacenado
	    	var leerNumCVV = firebase.database().ref('users/' + userId + '/tarjetas/tarjeta01/número_CVV');
	    	// Obtengo el valor del CVV almacenado
	    	leerNumCVV.on("value", function(snapshot){
	    		var cvvAlmacenado = snapshot.val();
	    		// Si el número CVV ingresado es igual al número CVV almacenado
		    	if (cvvIngresado == cvvAlmacenado) {
		    		// Notifico del éxito
					document.getElementById('aviso').style.visibility= "visible";
					document.getElementById('aviso').style.color= "#4EB24D";
					document.getElementById('aviso').innerHTML= "¡Todo salió genial!";	
					comprado()
		    		// Redirijo a la biblioteca
		    		setTimeout(function(){ window.location.replace("libroComprado.html"); }, 2000);
		    	} 	
		    	else {
		    		// Notifico del error
		    		document.getElementById('aviso').style.visibility= "visible";
		    		document.getElementById('aviso').style.color= "red";
					document.getElementById('aviso').innerHTML= "CVV mal escrito";	
		    	}
	    	});
		};
	});
};

// Esta función guarda el libro comprado en la base de datos del user
function comprado() {
	// Observador
	firebase.auth().onAuthStateChanged(user => {
	    // Selecciono el usuario conectado
  		var userId = firebase.auth().currentUser.uid;
  		// Obtengo ruta del libro
  		var libro = firebase.database().ref('users/' + userId + '/libro/libro_actual');
  		libro.on("value", function(snapshot){
  			ruta = snapshot.val();
  			// firebase.database().ref(ruta).child().update( {comprado: true} );
  			// redirigir()
  			firebase.database().ref().child('users/' + userId + '/comprado').push({ ruta: ruta });
  			// accedo al libro y cambio comprado por "true". Anteriormente era "false"
  			var ruta2 = ruta.slice(24, 28);
			var compra = firebase.database().ref(ruta + ruta2);
			compra.update( {comprado: true} )
  			// Motivos de desarrollo
  			console.log(compra);

  		});
	
	});		
}


