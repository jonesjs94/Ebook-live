
function registrar() {
	if(firebase.auth().currentUser) { firebase.auth().signOut(); };
	// Tomo datos
	var email = document.getElementById('email').value;
	var contraseña = document.getElementById('contraseña').value;
	
	// Registro al usuario con los datos obetnidos
	firebase.auth().createUserWithEmailAndPassword(email, contraseña)
	//Infomo de un error a la consola	
	.catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	// Escribir mensaje de error en consola
	console.log(errorCode);
  	console.log(errorMessage);
  	//mensaje de error HTML
	document.getElementById('avisoRegistro').style.visibility= "visible";
	document.getElementById('avisoRegistro').style.color= "#CA0202";
  	document.getElementById('avisoRegistro').innerHTML= errorMessage;
	})
	.then(function(){
		enviarDatos()
	//mensaje de éxito
	document.getElementById('avisoRegistro').style.visibility= "visible";
	document.getElementById('avisoRegistro').style.color= "#4EB24D";
	document.getElementById('avisoRegistro').innerHTML= "¡Tu cuenta ha sido creada con éxito!";	
	setTimeout(function(){ window.location.replace("principal.html"); }, 2000);
	});
};

function entrar() {
	//Si hay un usuario conectado lo desconecto
	if(firebase.auth().currentUser) { firebase.auth().signOut(); };
	// Tomo datos
	var email = document.getElementById('email').value;
	var contraseña = document.getElementById('contraseña').value;
	// Conectar al usuario con los datos obetnidos
	firebase.auth().signInWithEmailAndPassword(email, contraseña)
	//Infomo de un error a la consola	
	.catch(function(error) {
		 var errorCode = error.code;
		 var errorMessage = error.message;
		// ... escribir mensaje de error en consola
		console.log(errorCode);
	  	console.log(errorMessage);
	  	//mensaje de error HTML
		document.getElementById('avisoLogueo').style.visibility= "visible";
		document.getElementById('avisoLogueo').style.color= "#CA0202";
	  	document.getElementById('avisoLogueo').innerHTML= errorMessage;
	})
	.then(function(){	
	//Si hay un usuario logueado, se redirije hacia la página principal  		
		if(firebase.auth().currentUser) {
		 window.location.replace("principal.html"); 
		}	
	});
};

function enviarDatos() {
	var email = document.getElementById('email').value;
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;

	// Esto va a la base de datos
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('users/' + uid).set({
		// Guardo los datos principales en el database
		nombre: nombre,
		email: email,
		apellido: apellido,
	}).then(function(){
		//Se carga en la consola 
		console.log("datos guardados en firebase")});	
};


// Observador para detectar cambios en la sesión de usuarios
function observador() {
	// Llamo a la función que detecta cambios en la sesión
	firebase.auth().onAuthStateChanged(function(user) {
		// Si hay un usuario logeado...
		if (user) {
		console.log("activo");
		var displayName = user.displayName;
		var email = user.email;
			// Muestro en consola los datos del usuario
			console.log(user);
			// Y muestro si el correo está verificado
			console.log(user.emailVerified);
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;
		}
		// Si no hay ningún usuario logeado...
		else {
		console.log("inactivo");
		}
	});	
};

observador()