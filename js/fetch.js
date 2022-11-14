document.addEventListener('DOMContentLoaded', startApp);

const formulario = document.querySelector('#formulario');
const buscador = document.querySelector('#buscador');
const toShowCard = document.querySelector('.toShowCard');

function startApp() {
    consultApi()
    formulario.addEventListener('submit', showData);
}
function showData(e) {
    e.preventDefault();

    consultApi();
}
function consultApi() {
    const url = '/tipos.json';

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(date => {
            toShow(date);
        })
        .catch(err => { console.log(err); });
}

function toShow(date) {
    const arrayObj = ["alegreya", "rubik", "josefinsans", "montserrat"];

    limpiarHTML();

    date.forEach(element => {
        const { nombre, origen, varibales, url_local } = element;

        // Voy a crear las cards
        const divContainer = document.createElement('div');
        divContainer.classList.add('col-md-3', 'col-12');

        //Card Body
        const bodyCard = document.createElement('div');
        bodyCard.classList.add('card-body', 'bg-light', 'p-5', 'rounded');

        // Title
        const titleCard = document.createElement('a');
        titleCard.href = `./${url_local}.html`;
        titleCard.className = `${url_local} fs-4 card-title nav-link`
        titleCard.textContent = nombre;

        const parrafoCard = document.createElement('p');
        parrafoCard.textContent = origen

        const variablesCard = document.createElement('p');
        variablesCard.textContent = `${varibales} variables`;

        // Dentro de la card
        bodyCard.appendChild(titleCard);
        bodyCard.appendChild(parrafoCard);
        bodyCard.appendChild(variablesCard);

        // Dentro del elemento padre
        divContainer.appendChild(bodyCard);

        if (buscador.value !== "" && buscador.value === url_local) {
            toShowCard.appendChild(divContainer);
        } else if(buscador.value === ""){
            toShowCard.appendChild(divContainer);
        } else if(arrayObj[0] !== buscador.value && arrayObj[1] !== buscador.value && arrayObj[2]  !== buscador.value && arrayObj[3] !== buscador.value){
                const parrafoError = document.createElement("p");
                parrafoError.classList.add('fs-1');
                parrafoError.innerHTML = `Tipografia no encontrada`;

                toShowCard.appendChild(parrafoError);
        }
    });
}

function limpiarHTML() {
    const toShowCard = document.querySelector('.toShowCard');
    toShowCard.textContent = "";
}
