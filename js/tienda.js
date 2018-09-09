// Creo el elemento del libro vacío
function crearElemento() {
	// Creo elementos
	var a = document.createElement("a");
	var article = document.createElement("article");
	var img = document.createElement("img");
	var div = document.createElement("div");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var p3 = document.createElement("p");
	// Agrego clases a los elementos
	article.classList.add("libro");
	div.classList.add("card-body");
	img.classList.add("img-libro");
	p1.classList.add("nombre-libro");
	p1.classList.add("card-text");	
	p2.classList.add("autor");
	p3.classList.add("precio");
	// Uno todos los elementos para crear un Optimus Prime de elementos
	div.appendChild(p1);
	div.appendChild(p2);
	div.appendChild(p3);
	article.appendChild(img);
	article.appendChild(div);
	a.appendChild(article);

	return a;
}

// variable global para usar como index
var i = 0;

// Llamo a los libros de scifi
function scifi() {
	firebase.auth().onAuthStateChanged(user => {
		var géneros = firebase.database().ref('géneros2/ciencia ficción y fantasía');
		géneros.on("child_added", function(snapshot, prevChildKey) {
			var género = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("libros-scifi");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('nombre-libro');
			var a = document.getElementsByClassName('autor');		
			var p = document.getElementsByClassName('precio');		
			var img = document.getElementsByClassName('img-libro');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = género.título.substring(0,25);
			a[i].innerText = género.autor;
			p[i].innerText = "$" + género.precio;		
			img[i].src = género.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});	
}

// Llamo a los libros de misterio y suspenso
function misterio() {
	firebase.auth().onAuthStateChanged(user => {
		var géneros = firebase.database().ref('géneros2/misterio y suspenso');
		géneros.on("child_added", function(snapshot, prevChildKey) {
			var género = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("libros-misterio");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('nombre-libro');
			var a = document.getElementsByClassName('autor');		
			var p = document.getElementsByClassName('precio');		
			var img = document.getElementsByClassName('img-libro');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = género.título.substring(0,22);
			a[i].innerText = género.autor;
			p[i].innerText = "$" + género.precio;		
			img[i].src = género.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});	
}

// Llamo a los libros de informática y tecnología
function ficción() {
	firebase.auth().onAuthStateChanged(user => {
		var géneros = firebase.database().ref('géneros2/ficción y literatura');
		géneros.on("child_added", function(snapshot, prevChildKey) {
			var género = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("libros-ficción");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('nombre-libro');
			var a = document.getElementsByClassName('autor');		
			var p = document.getElementsByClassName('precio');		
			var img = document.getElementsByClassName('img-libro');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = género.título.substring(0,25);
			a[i].innerText = género.autor;
			p[i].innerText = "$" + género.precio;		
			img[i].src = género.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});	
}

// Llamo a los libros de novela romántica
function romántica() {
	firebase.auth().onAuthStateChanged(user => {
		var géneros = firebase.database().ref('géneros2/novela romántica');
		géneros.on("child_added", function(snapshot, prevChildKey) {
			var género = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("libros-novela-romántica");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('nombre-libro');
			var a = document.getElementsByClassName('autor');		
			var p = document.getElementsByClassName('precio');		
			var img = document.getElementsByClassName('img-libro');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = género.título.substring(0,23);
			a[i].innerText = género.autor;
			p[i].innerText = "$" + género.precio;		
			img[i].src = género.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});		
}

function cargarLibrosTienda() {
	romántica(),
	scifi(),
	misterio(),
	informática()
}