document.addEventListener("DOMContentLoaded", inciarApp)

let fav = []

const toShowCard = document.querySelector('.toShowCard');

function inciarApp() {

    fav = [...JSON.parse(localStorage.getItem('favoritos'))] || [];

    mostrarFav(fav)
}

function mostrarFav(fav) {

    if (fav.length == 0) {
        const parrafo = document.createElement('div');
        parrafo.className = "bg-dark py-4 text-center fw-bold text-light rounded"
        parrafo.innerHTML = /* html */`
            <p>No agrego ninguna tipografia aún, vaya por una pequeño tipografo</p>
            <a href="../html/catalogo.html" class="nav-link btn btn-success d-inline py-2 px-3 my-2">Ir a catalogo...</a>
        `;

        toShowCard.appendChild(parrafo);
    }

    fav.forEach((element) => {

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
        `;
        toShowCard.appendChild(divContainer);

    });
}