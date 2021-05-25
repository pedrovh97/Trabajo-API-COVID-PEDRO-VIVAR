let url1 = 'https://covid-api.mmediagroup.fr/v1/cases';
let url2 = 'https://covid-api.mmediagroup.fr/v1/cases?country=';
let url3 = 'https://covid-api.mmediagroup.fr/v1/cases?country=Spain';


const selectCategorias = document.getElementById('categorias');
const contenedorDatosExtremadura = document.getElementById("contenedor-datos-extremadura");
const contagiados = document.getElementById("contagiados");
const altas = document.getElementById("altas");
const fallecidos = document.getElementById("fallecidos");
const fechaActualizacion = document.getElementById("fecha-actualizacion-fecha");

const continente = document.getElementsByClassName("continente-país");
const contagiadosPaís = document.getElementsByClassName("contagiados-país");
const altasPaís = document.getElementsByClassName("altas-país");
const fallecidosPaís = document.getElementsByClassName("fallecidos-país");

async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

function recargarListadatos(datos){

	obtenerJSON(url3).then(json => {

		const datoElement = document.createElement("div");
		datoElement.classList.add("contenedor-datos");
    datoElement.innerHTML = `
      <h2 class="contagiados">Contagiados: ${json.Extremadura.confirmed}</h2>
      <h2 class="altas">Altas: ${json.Extremadura.recovered}</h2>
      <h2 class="fallecidos">Fallecidos: ${json.Extremadura.deaths}</h2>
    `;
	});
}

obtenerJSON(url3).then(json => { 

	const selectCategorias = document.getElementById("categorias");

		var valor = `Contagiados: ` + json.Extremadura.confirmed;
		var opcion = document.createElement('option');
		opcion.appendChild( document.createTextNode(valor) );
		opcion.value = valor;
		selectCategorias.appendChild(opcion);

		var valor = `Altas: ` + json.Extremadura.recovered;
		var opcion2 = document.createElement('option');
		opcion2.appendChild( document.createTextNode(valor) );
		opcion2.value = valor;
		selectCategorias.appendChild(opcion2);

		var valor = `Fallecidos: ` + json.Extremadura.deaths;
		var opcion3 = document.createElement('option');
		opcion3.appendChild( document.createTextNode(valor) );
		opcion3.value = valor;
		selectCategorias.appendChild(opcion3);


	filtrarPorCategoria();

});

function filtrarPorCategoria(){

	var categoria = selectCategorias.value;

	obtenerJSON(url3 + categoria).then(json => { 
		console.log(json);
		recargarListadatos(json);
	});
}

obtenerJSON(url3).then(json => {

		contagiados.innerText = "Contagiados: " + json.Extremadura.confirmed;
		altas.innerText ="Altas: " + json.Extremadura.recovered;
		fallecidos.innerText ="Fallecidos: " + json.Extremadura.deaths;
		fechaActualizacion.innerText = json.Extremadura.updated;
	})

	obtenerJSONpaís();

function obtenerJSONpaís(){
	const pais = ['Spain', 'France', 'Portugal', 'US', 'China', 'Italy'];
var i;
	for ( i = 0; i < pais.length ; i++) {

		obtenerJSON(url2+pais[i]).then(json => {

			numeroPais=pais.indexOf(json.All.country);
				continente[numeroPais].innerText = "Continente: " + json.All.continent;
				contagiadosPaís[numeroPais].innerText = "Contagiados: " + json.All.confirmed;
				altasPaís[numeroPais].innerText = "Altas: " + json.All.recovered;
				fallecidosPaís[numeroPais].innerText = "Fallecidos: " + json.All.deaths;
		})
	}
};