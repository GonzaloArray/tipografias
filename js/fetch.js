document.addEventListener('DOMContentLoaded', startApp);

const formulario = document.querySelector('#formulario');
const buscador = document.querySelector('#buscador');
const toShowCard = document.querySelector('.toShowCard');

const root = document.querySelector("#root");

let tipos = [];
let fav = [];


function startApp() {
    consultApi();


    formulario.addEventListener("submit", filtrarInfo);
    fav = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (fav.length > 0) {

        
    }
}

const consultApi = async () => {
    try {
        const url = '/tipos.json';

        const resolve = await fetch(url);
        const datos = await resolve.json();

        if (toShowCard !== null) {
            toShow(datos);
            tipos = [...datos];
        }

        if (root !== null) {
            renderDetails(datos)
        }
    } catch (error) {
        console.log(error);
    }
}

function toShow(date) {

    limpiarHTML();

    if (date.length == 0) {

        const parrafo = document.createElement('p');
        parrafo.className = "mt-2 bg-danger text-center py-2 text-light fw-bold"
        parrafo.textContent = "Tipografia no encontrada"

        toShowCard.appendChild(parrafo);
        return
    }

    date.forEach((element) => {

        const { nombre, origen, varibales, url_local, id } = element;

        // Voy a crear las cards
        const divContainer = document.createElement('div');
        divContainer.classList.add('col-md-3', 'col-6', 'my-2', 'position-relative');
        divContainer.innerHTML = /* html */`
            <a class="bg-light rounded-2 py-2 px-2 nav-link position-relative ${url_local}" target="_blank" href="./details.html?id=${id}">
                <h2 class="fs-5">${nombre}</h2>
                <p>${origen}</p>
                <p>Variables: ${varibales}</p>
            </a>
            <button class="position-absolute z-index top-0 end-0 btn btn-sm me-4" onclick="addFav(${id})">
                <img src="../img/corazon-outline.svg" class="buttonFav heart" id="${id}" alt="${nombre}"/>
            </button>
        `;
        toShowCard.appendChild(divContainer);

        favoriteIcon()

    });
}

function renderDetails(data) {

    let cadenaParametrosUrl = location.search;
    let parametros = new URLSearchParams(cadenaParametrosUrl)
    let id = parametros.get('id');

    const valorBuscado = data.find(tipo => tipo.id == id);

    mostrarDetails(valorBuscado);
}

function mostrarDetails(tipo) {

    const { nombre, origen, varibales, descr, url_local } = tipo;
    const divCard = document.createElement('div');
    divCard.className = 'container';
    divCard.innerHTML = /* html */`
    <section class="row d-flex align-items-center text-light">
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
    </section>
    `;

    root.appendChild(divCard);
}

const filtrarInfo = (e) => {
    e.preventDefault();

    const buscado = tipos.filter(tipo => tipo.nombre.toLowerCase().includes(buscador.value.toLowerCase()));

    toShow(buscado);
    buscador.value = "";
}

const addFav = (id) =>{
    const favorito = tipos.find(fav => fav.id == id);
    const index = fav.findIndex(item => item.id == id)

    console.log(fav.some(item => item.id == id))


    if (fav.some(item => item.id == id)) {
        if (index === -1) return

        fav.splice(index, 1)
        event.target.src = "../img/corazon-outline.svg"
    } else {
        fav.push(favorito)
        event.target.src = "../img/corazon.svg"
    }
    localStorage.setItem('favoritos', JSON.stringify(fav));
}

const favoriteIcon = () => {
    const favoriteIcon = document.querySelectorAll('.heart')

    favoriteIcon.forEach(item => {
        if (fav.some(f => f.id == item.id)) {
            item.src = "../img/corazon.svg";
        }
    })
}

// Limpiar html
function limpiarHTML() {
    const toShowCard = document.querySelector('.toShowCard');
    toShowCard.textContent = "";
}
