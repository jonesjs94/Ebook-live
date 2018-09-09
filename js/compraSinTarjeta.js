
// Payment.formatCardNumber(document.getElementById('cardNumber'));
// Payment.formatCardCVC(document.getElementById('numCVV'));
// Payment.formatCardExpiry(document.getElementById('expiración'));

function escribirDatosTarjeta(nombreTarjeta, cardNumber, numCVV, expiración) {
  	// Selecciono el usuario conectado
  	var userId = firebase.auth().currentUser.uid;
	// Tomo los datos de los elementos de la tarjeta
	var nombreTarjeta = document.getElementById('nombreTarjeta').value;
	var cardNumber = document.getElementById('cardNumber').value;
	var	expiración = document.getElementById('expiración').value;
	var	numCVV = document.getElementById('numCVV').value;

	// Guardo la tarjeta en la base de datos 
	firebase.database().ref().child('users/' + userId + '/tarjetas/' + '/tarjeta01').set(
	{
	  usuario: nombreTarjeta,
	  número_de_la_tarjeta: cardNumber,
	  número_CVV: numCVV,
	  expiración: expiración
	})
	.then(function(){
	//mensaje de éxito
	comprado()
	document.getElementById('aviso').style.visibility= "visible";
	document.getElementById('aviso').style.color= "#4EB24D";
	document.getElementById('aviso').innerHTML= "¡Todo salió genial!";	
	setTimeout(function(){ window.location.replace("principal.html"); }, 2000);
	});
};

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

