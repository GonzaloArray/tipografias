document.addEventListener('DOMContentLoaded', startApp);

const alegreya = document.querySelector('.alegreya');
const rubik = document.querySelector('.rubik');
const montserrat = document.querySelector('.montserrat');
const josefinsans = document.querySelector('.josefinsans');
function startApp() {
    consultApi()
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
            enviarDatos(date);
        })
        .catch(err => { console.log(err); });
}

function enviarDatos(date) {
    date.map(element => {
        const { nombre, origen, url_local } = element;

        const informacion = document.createElement('div');
        informacion.innerHTML = `
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
        </div>`;

        if (alegreya !== null) {
            if (alegreya.className == url_local) {
                alegreya.appendChild(informacion);
            }
        }else if(rubik !== null){
            if (rubik.className == url_local) {
                rubik.appendChild(informacion);
            }
        } else if(montserrat !== null){
            if (montserrat.className == url_local) {
                montserrat.appendChild(informacion);
            }
        } else if(josefinsans !== null){
            if (josefinsans.className == url_local) {
                josefinsans.appendChild(informacion);
            }
        }
    });
}