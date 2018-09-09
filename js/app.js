// Agrega un libro a Iniciar
function libroIniciar() {
	// Creo elementos
	var a = document.createElement("div");
	var article = document.createElement("article");
	var img = document.createElement("img");
	var div = document.createElement("div");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var p4 = document.createElement("span");

	// Agrego clases a los elementos
	article.classList.add("libro");
	div.classList.add("card-body");
	img.classList.add("img-libro");
	p1.classList.add("nombre-libro");
	p1.classList.add("card-text");	
	p2.classList.add("autor");
	p4.classList.add("direct");
	a.classList.add("contLibro")
	a.setAttribute("onClick", "obtenerId(this.id)");	

	// Uno todos los elementos para crear un Optimus Prime de elementos
	div.appendChild(p1);
	div.appendChild(p2);
	a.appendChild(p4);
	article.appendChild(img);
	article.appendChild(div);
	a.appendChild(article);

	// Añado a Optimus Prime a la sección Iniciar 
	return a;
};

var i = 0
function librosComprados() {
	// Observador
	firebase.auth().onAuthStateChanged(user => {
	    // Selecciono el usuario conectado
  		var userId = firebase.auth().currentUser.uid;
  		// Obtengo ruta del libro
  		var libros = firebase.database().ref().child('users/' + userId + '/comprado');
  		libros.on("child_added", function(snapshot, prevChildKey) {
  			var l = snapshot.val().ruta;
  			// Motivos de desarrollo
  			console.log(l);
  			firebase.database().ref(l).on("child_added", function(snapshot, prevChildKey) {
  				var valor = snapshot.val();
  				
  				var iniciar = document.getElementById("contenedor-iniciar");
				iniciar.appendChild(libroIniciar());
				var a = document.getElementsByClassName('autor');		
				var t = document.getElementsByClassName('nombre-libro');
				var div = document.getElementsByClassName('contLibro');// Genero una clase a los div solo para agregarles ids		
				var img = document.getElementsByClassName('img-libro');		
				var r = document.getElementsByClassName('direct');


				t[i].innerText = valor.título.substring(0,25);
				a[i].innerText = valor.autor;
				div[i].setAttribute("id", i);	
				img[i].src = valor.url;
				r[i].innerText = valor.ruta;
				i++;
  			});

  		});
		
	});		
}

// obtengo el ID para despues cargar los datos cuando lo redirijo al libro.html
function obtenerId(clicked_id) {
	firebase.auth().onAuthStateChanged(user => {
		// Refiero al usuario logueado
		var userId = firebase.auth().currentUser.uid;
		// Obtengo la ruta que generé en la base de datos y que guardé previamente en un span
		var ruta = document.getElementById(clicked_id).childNodes[0].innerText;

		// Guardo la ruta en el user para después llamarla
		firebase.database().ref().child('users/' + userId + '/libro').set({ libro_actual: ruta })
		.then(function(){
			// Accedo a la key "comprado" para ver si esta comprado o no. False es no-comprado, true es comprado.
			var ruta2 = ruta.slice(24, 28);
			var compra = firebase.database().ref(ruta + ruta2 + '/comprado');
			compra.on("value", function(snapshot){
				var c = snapshot.val();
				console.log(c)
				if(c == true) {
					//redirijo al html del libro sin comprar
					window.location.replace("libroComprado.html");
					console.log("true");
				}
				else {
					console.log("false");
					//redirijo al html del libro comprado
					window.location.replace("libro.html");
				}
			});	
		});
		console.log(ruta);
	});		
}



// Agrega un libro a Iniciar
function libroTienda() {
	// Creo elementos
	var a = document.createElement("a");
	var article = document.createElement("article");
	var img = document.createElement("img");
	var div = document.createElement("div");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");

	// Agrego clases a los elementos
	article.classList.add("libro");
	div.classList.add("card-body");
	img.classList.add("img-libro");
	p1.classList.add("nombre-libro");
	p1.classList.add("card-text");	
	p2.classList.add("autor");

	// Uno todos los elementos para crear un Optimus Prime de elementos
	div.appendChild(p1);
	div.appendChild(p2);
	article.appendChild(img);
	article.appendChild(div);
	a.appendChild(article);

	// Añado a Optimus Prime a la sección Iniciar 
	var iniciar = document.getElementById("contenedor-iniciar");
	iniciar.appendChild(a);
};

