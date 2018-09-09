// Creo el elemento del libro vacío
function crearElemento() {
	// Creo elementos
	var a = document.createElement("div");
	var article = document.createElement("article");
	var img = document.createElement("img");
	var div = document.createElement("div");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var p3 = document.createElement("p");
	var p4 = document.createElement("span");
	// Agrego clases a los elementos
	article.classList.add("libro-nov");
	div.classList.add("card-body");
	img.classList.add("img-libro-nov");
	p1.classList.add("nombre-libro-nov");	
	p2.classList.add("autor-nov");
	p3.classList.add("precio-libro");
	p4.classList.add("direct");
	a.classList.add("classParaId")
	a.setAttribute("onClick", "obtenerId(this.id)");

	// Uno todos los elementos para crear un Optimus Prime de elementos
	div.appendChild(p1);
	div.appendChild(p2);
	div.appendChild(p3);
	a.appendChild(p4);
	article.appendChild(img);
	article.appendChild(div);
	a.appendChild(article);

	return a;
}

// Variables globales para cada carpeta de género alojada en la base de datos
var arte = firebase.database().ref('géneros2/arte y diversión'),
    autoayuda = firebase.database().ref('géneros2/autoayuda'),
	biografías = firebase.database().ref('géneros2/biografías y memorias'),
	scifi = firebase.database().ref('géneros2/ciencia ficción y fantasía'),
	ficción = firebase.database().ref('géneros2/ficción y literatura'),
	finanzas = firebase.database().ref('géneros2/finanzas e inversión'),
	historia = firebase.database().ref('géneros2/historia'),
	informática = firebase.database().ref('géneros2/informática y tecnología'),
	infantiles = firebase.database().ref('géneros2/libros infantiles'),
	misterio = firebase.database().ref('géneros2/misterio y suspenso'),
	romántica = firebase.database().ref('géneros2/novela romántica'),
	espiritualidad = firebase.database().ref('géneros2/religión y espiritualidad');

// variable global para usar como index
var i = 0;

// Llamo a los libros de scifi
function crearLibro() {
	firebase.auth().onAuthStateChanged(user => {
		var html = document.getElementById("h1").innerHTML;
		switch(html) {
			case "Arte y diversión":
			var categoría = arte; 
			break;
			case "Autoayuda":
			var categoría = autoayuda; 
			break;
			case "Biografías y memorias":
			var categoría = biografías; 
			break;
			case "Ciencia ficción y fantasía":
			var categoría = scifi; 
			break;
			case "Ficción y literatura":
			var categoría = ficción; 
			break;
			case "Finanzas e inversión":
			var categoría = finanzas; 
			break;
			case "Historia":
			var categoría = historia; 
			break;
			case "Informática y tecnología":
			var categoría = informática; 
			break;
			case "Libro infantiles":
			var categoría = infantiles; 
			break;
			case "Misterio y suspenso":
			var categoría = misterio; 
			break;
			case "Novela romántica":
			var categoría = romántica; 
			break;
			case "Religión y espiritualidad":
			var categoría = espiritualidad; 
			break;
		}


		// Uso la referencia a la base de datos y llamo a su contenido
		categoría.on("child_added", function(snapshot, prevChildKey) {
			var género = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("contenedor-libro");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('nombre-libro-nov');
			var a = document.getElementsByClassName('autor-nov');		
			var p = document.getElementsByClassName('precio-libro');
			var r = document.getElementsByClassName('direct');
			var div = document.getElementsByClassName('classParaId');// Genero una clase a los div solo para agregarles ids		
			var img = document.getElementsByClassName('img-libro-nov');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = género.título.substring(0,30);
			a[i].innerText = género.autor;
			p[i].innerText = "$" + género.precio;	
			r[i].innerText = género.ruta;
			// Genero ids únicos para cada contenedor de libros
			div[i].setAttribute("id", i);	
			img[i].src = género.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});	
}

function guardarLibro(cliqued_id) {
	firebase.auth().onAuthStateChanged(user => {
		// Refiero al usuario logueado
		var userId = firebase.auth().currentUser.uid;
		// Obtengo la ruta que generé en la base de datos y que guardé previamente en un span
		var ruta = document.getElementById(clicked_id).childNodes[0].innerText;
		var libro = firebase.database().ref(ruta);

		libro.on("value", function(snapshot) {
		var dato = snapshot.val();
			
		});

});}

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


// span abajo del div, sin id. el div va a tener el id. obtengo el div con el onclick y el this. obtenido el div
// uso el .child del jquery y obtengo la ruta del span.
