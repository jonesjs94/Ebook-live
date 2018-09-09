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
	article.classList.add("libro-deseo");
	div.classList.add("card-body-deseo");
	img.classList.add("img-libro");
	p1.classList.add("card-text-deseo");	
	p2.classList.add("autor-deseo");
	p3.classList.add("precio-libro-deseo");
	p3.classList.add("active");
	a.href= "libro.html";
	// Uno todos los elementos para crear un Optimus Prime de elementos
	div.appendChild(p1);
	div.appendChild(p2);
	div.appendChild(p3);
	article.appendChild(img);
	article.appendChild(div);
	a.appendChild(article);

	return a;
}

function crearLibros() {
	firebase.auth().onAuthStateChanged(user => {
		// Me refiero al usuario logueado
		var userId = firebase.auth().currentUser.uid;

		var géneros = firebase.database().ref('users/' + userId + '/lista de deseos');
		géneros.on("child_added", function(snapshot, prevChildKey) {
			var deseos = snapshot.val();
			// Creo los elementos con la función y los agrego a su contenedor de libros
			var iniciar = document.getElementById("deseos");
			iniciar.appendChild(crearElemento());
			// Llamo a las clases y trabajo sobre sus index, ya que getElementsByClassName devuelve un ARRAY
			var t = document.getElementsByClassName('card-text-deseo');
			var a = document.getElementsByClassName('autor-deseo');		
			var p = document.getElementsByClassName('precio-libro-deseo');		
			var img = document.getElementsByClassName('img-libro');		
			// Escribo la referencia de la base de datos en el elemento
			t[i].innerText = deseos.título.substring(0,25);
			a[i].innerText = deseos.autor;
			p[i].innerText = "$" + deseos.precio;		
			img[i].src = deseos.url;
			// Sumo 1 a la "i" que se usa como index de getElementsByClassName
			i++;
		});
	});	
}

