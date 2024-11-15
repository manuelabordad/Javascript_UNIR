//Javascript

const detectarPalindromo = () => {
	const input = document.getElementById("palindromo").value;
	const limpiarInput = input.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""); //eliminar todos los caracteres que no sean letras
	const alRevesInput = limpiarInput.split("").reverse().join("");
	const resultado =
		limpiarInput === alRevesInput ? "Es un palíndromo" : "No es un palindromo";
	document.getElementById("resultadoPalindromo").innerText = resultado;
};

const encontrarMayor = () => {
	const num1 = parseFloat(document.getElementById("num1").value);
	const num2 = parseFloat(document.getElementById("num2").value);

	const resultado =
		num1 > num2 ? "El numero 1 es mayor" : "El numero 2 es mayor";

	document.getElementById("resultadoNumeroMayor").innerText = resultado;
};
const encontrarVocales = () => {
	const frase = document.getElementById("fraseVocales").value.toLowerCase();
	const vocales = frase.match(/[aeiou]/g);
	const resultado = vocales
		? `Vocales: ${[...new Set(vocales)].join(", ")}` //Almacenar las vocales encontradas sin repetición
		: "No hay vocales";
	console.log("vocales", resultado);
	document.getElementById("resultadoVocales").innerText = resultado;
};
const contarVocales = () => {
	const frase = document
		.getElementById("contarVocalesFrase")
		.value.toLowerCase();
	console.log(frase);
	const contadorVocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };

	for (let char of frase) {
		if (contadorVocales.hasOwnProperty(char)) {
			contadorVocales[char]++; // si el caracter es una vocal se incrementa el conteo de esa vocal
		}
	}

	const resultado = `Vocales: ${Object.entries(contadorVocales)
		.map(([vocal, conteo]) => `${vocal}:${conteo}`)
		.join(", ")}`; // convierte el objeto en un array de pares y luego convierte esos pares en string

	document.getElementById("resultadoContarVocales").innerText = resultado;
};

//Ajax (fecth)

//mostar URL cuando se carga la pagina
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("url").value = window.location.href;
});

const fetchButton = document.getElementById("mostarContenidos");
fetchButton.addEventListener("click", async () => {
	const url = document.getElementById("url").value;
	const estadoDiv = document.getElementById("estado");
	const contenidoDiv = document.getElementById("contenido");
	const headersDiv = document.getElementById("headers");
	const codigoEstadoDiv = document.getElementById("codigoEstado");

	estadoDiv.textContent = "Cargando...";

	try {
		//Realizar la petición con Fetch que es una forma mas actualizada
		const respuesta = await fetch(url);

		//Actualizar el estado
		if (respuesta.ok) {
			estadoDiv.textContent = "Completada";
		} else {
			estadoDiv.textContent = `Error: ${respuesta.status}`;
		}

		//Mostrar el contenido
		const contenido = await respuesta.text();
		contenidoDiv.textContent = contenido;

		//Mostrar las cabeceras
		const headers = Array.from(respuesta.headers.entries())
			.map(([key, value]) => `${key}: ${value}`)
			.join("\n");
		headersDiv.textContent = headers;

		//Mostrar el código de estado
		codigoEstadoDiv.textContent = `Código: ${respuesta.status} (${respuesta.statusText})`;
	} catch (error) {
		estadoDiv.textContent = "Error en la petición";
		contenidoDiv.textContent = "No se pudo cargar el contenido";
		codigoEstadoDiv.textContent = "Sin respuesta del servidor";
		headersDiv.textContent = "";
		console.error(error);
	}
});
