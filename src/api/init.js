//dirección para obtener el listado en formato json:
const pokeapi_URL = "https://pokeapi.co/api/v2/";

//acá esta la url para tener la sección de ability
const ability_URL = "https://pokeapi.co/api/v2/ability/";

//acá esta la url para tener la sección de pokemon
const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";

//acá esta la url para tener la sección de region
const region_URL = "https://pokeapi.co/api/v2/region/";



//función para mostrar el spinner de carga:
function showSpinner(){
  document.getElementById("spinner-wrapper").style.display = "block"; 
}

//función para ocultar el spinner de carga:
function hideSpinner(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//función que realiza el fetch() a la url recibida y devuelve un objeto con los datos y el estado de la respuesta:
function getJSONData(url){
    let result = {};
    showSpinner(); 
    return fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner(); 
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner(); 
        return result;
    });
}


function fetchData() {
  const seleccionado = document.querySelector(".form-select");
  const valorSeleccionado = seleccionado.value;

  let apiUrl = "";

  switch (valorSeleccionado) {
    case "1":
      apiUrl = pokemon_URL;
      break;
    case "2":
      apiUrl = ability_URL;
      break;
    case "3":
      apiUrl = region_URL;
      break;
    default:
      return;
  }

  getJSONData(apiUrl)
    .then((result) => {
      if (result.status === "ok") {
        const listaData = result.data.results;
        const muestraContainer = document.querySelector(".container-muestra");
        muestraContainer.innerHTML = "";

        listaData.forEach((item) => {
          const listaItems = document.createElement("div");
          listaItems.classList.add("list-item");
          listaItems.innerHTML = `
            <strong>Name:</strong> ${item.name}<br>
            <strong>URL:</strong> <a href="${item.url}" target="_blank">${item.url}</a>
            <hr>
          `;
          muestraContainer.appendChild(listaItems);
        });
      } else {
        console.error("Error:", result.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}