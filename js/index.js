document.addEventListener("DOMContentLoaded", iniciarApp);

const comenzar = document.querySelector("#comenzar");
const formAsk = document.querySelector(".form__ask");
const checkRadio = document.querySelector("#check");
const notActive = document.querySelector("#noActive");


// Pregunstas y respuesta
let preguntas = [];

function iniciarApp() {
    cuestionarioJson();
    checkRadio.addEventListener("submit", totalCuestion);

    const activar = localStorage.getItem('activar');

    if (activar == "si") {
        notActive.classList.remove("not-active")
        return
    }
}
// Fetch
const cuestionarioJson = async () => {
    try {
        const url = "./cuestionario.json"
        const response = await fetch(url);
        const cuestionario = await response.json();

        domRenderAsk(cuestionario)
        preguntas = [...cuestionario]

    } catch (error) {
        console.log(error)
    }
}

const domRenderAsk = (preguntas) => {

    preguntas.forEach(pregunta => {

        const { title, check, ask, button1, button2, buttonId, buttonId2 } = pregunta;

        const askModal = document.createElement("div");
        askModal.className = "col-12 col-sm-6 d-flex justify-content-center align-items-center"
        askModal.innerHTML = /* html */ `
            <div class="my-4 w-75">
                <h2 class="fs-5 text-primary">${title}</h2>
                <p>${ask}</p>
                <div class="d-flex justify-content-center">
                    <input type="radio" class="btn-check button-left" name="${check}" id="${buttonId}" autocomplete="off" value="${button1}">
                    <label class="btn btn-light py-3 px-5 button-left fw-bold w-100" for="${buttonId}">${button1}</label>

                    <input type="radio" class="btn-check button-right" name="${check}" id="${buttonId2}" autocomplete="off" value="${button2}">
                    <label class="btn btn-light py-3 px-5 button-right w-100 fw-bold" for="${buttonId2}">${button2}</label>
                </div>
            </div>
        `;

        formAsk.appendChild(askModal);
    });
}

const totalCuestion = (e) => {
    e.preventDefault();


    const inputCheck = document.querySelectorAll("input[type='radio']");
    const check = [...inputCheck, inputCheck];
    const trueCheck = check.filter(inputCheck => inputCheck.checked);
    const valueCheck = trueCheck.map((check, index) => {

        if (check.value.toLowerCase() == preguntas[index].response) {
            return preguntas[index].response
        }
    }).filter(element => element !== undefined);

    formSuccess(valueCheck)
}

const formSuccess = (valor) => {

    if (valor.length == preguntas.length) {
        Swal.fire({
            icon: 'success',
            title: 'Buen Trabajo!',
            text: 'Ya se habilito la seccion de Catálogo, disfrute!',
            footer: '<a href="./html/catalogo.html">Ingrese al Catalogo</a>',
        })
        notActive.classList.remove("not-active")
        localStorage.setItem('activar', 'si');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops... Sigue intentando pequeño Tipografo',
            text: 'Something went wrong!',
        })
    }

}