document.addEventListener('DOMContentLoaded', startApp);

const formulario = document.querySelector('#formulario');
const buscador = document.querySelector('#buscador');
const toShowCard = document.querySelector('.toShowCard');

const root = document.querySelector("#root");

function startApp() {
    consultApi()

}

const consultApi = async () => {
    const url = '/tipos.json';

    const resolve = await fetch(url);
    const datos = await resolve.json();

    if (toShowCard !== null) {
        toShow(datos);
    }

    if (root !== null) {
        renderDetails(datos)
    }
}

function toShow(date) {

    const recomend = date.slice(0, 4);

    // limpiarHTML();

    recomend.forEach(element => {
        const { nombre, origen, varibales, url_local, id } = element;


        // Voy a crear las cards
        const divContainer = document.createElement('div');
        divContainer.classList.add('col-md-3', 'col-12');
        divContainer.innerHTML = /* html */`
            <a class="bg-light rounded-2 py-2 px-2 nav-link" target="_blank" href="./details.html?id=${id}">
                <h2 class="fs-5">${nombre}</h2>
                <p>${origen}</p>
            </a>
        `;
        toShowCard.appendChild(divContainer);

    });
}

function limpiarHTML() {
    const toShowCard = document.querySelector('.toShowCard');
    toShowCard.textContent = "";
}


function renderDetails(data) {

    let cadenaParametrosUrl = location.search;
    let parametros = new URLSearchParams(cadenaParametrosUrl)
    let id = parametros.get('id');

    const valorBuscado = data.find(tipo => tipo.id == id);

    mostrarDetails(valorBuscado);
}

function mostrarDetails(tipo) {
    console.log(tipo)
    const { nombre, origen, varibales, descr, url_local } = tipo;
    const divCard = document.createElement('div');
    divCard.className = 'container';
    divCard.innerHTML = `
    <div class="row d-flex align-items-center text-light">
        <div class="col-6 ${url_local}">
            <h1 class="fs-1 ${url_local}">${nombre}</h1>
            <p class="fw-bold">Creado por: <span class="fw-light">Juan Pablo del Peral.</span></p>
        </div>
        <div class="col-2">
            <h2 class="fs-4">Clasificación</h2>
            <p class="${url_local}">${origen}</p>
        </div>
        <div class="col-2">
            <h2 class="fs-4">Uso</h2>
            <p>Editorial</p>
        </div>
        <div class="col-2">
            <h2 class="fs-4">Fundidora</h2>
            <p class="${url_local}">Huerta Tipografica</p>
        </div>
    </div>
    `;

    root.appendChild(divCard);
}

