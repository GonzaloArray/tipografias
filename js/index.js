document.addEventListener("DOMContentLoaded", iniciarApp);

const comenzar = document.querySelector("#comenzar");
const formAsk = document.querySelector(".form__ask");
const checkRadio = document.querySelector("#check");
const notActive = document.querySelector("#noActive");

const objInfo = [
    {
        title: "Pregunta 1",
        ask: "¿Roboto es una tipografia que tiene serifas?",
        button1: "Si",
        button2: "No",
        name: "pregunta1",
        check: "check1",
        buttonId: "radio1",
        buttonId2: "radio2",
        id: 1,
    },
    {
        title: "Pregunta 2",
        ask: "¿Es Comic Sans una de las fuentes más usadas en impresion editorial?",
        button1: "Si",
        button2: "No",
        name: "pregunta2",
        check: "check2",
        buttonId: "radio3",
        buttonId2: "radio4",
        id: 2,
    },
    {
        title: "Pregunta 3",
        ask: "¿Una fuente Sans Serif es lo mismo que una fuente palo seco?",
        button1: "Si",
        button2: "No",
        name: "pregunta3",
        check: "check3",
        buttonId: "radio5",
        buttonId2: "radio6",
        id: 3,
    },
    {
        title: "Pregunta 4",
        ask: "¿Futura fue una tipografia diseñada por un tipografo alemán?",
        button1: "Si",
        button2: "No",
        name: "pregunta4",
        check: "check4",
        buttonId: "radio7",
        buttonId2: "radio8",
        id: 4,
    },
]

function iniciarApp() {
    domRenderAsk();
    checkRadio.addEventListener("submit", totalCuestion)

    const activar = localStorage.getItem('activar');

    if (activar == "si") {
        notActive.classList.remove("not-active")
        return
    }
}

const domRenderAsk = () => {

    objInfo.forEach(pregunta => {

        const { title, check, ask, button1, button2, buttonId, buttonId2 } = pregunta;

        const askModal = document.createElement("div");
        askModal.className = "col-6 d-flex justify-content-center align-items-center"
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
    const valueCheck = trueCheck.map(check => check.value)

    resolveQuestion(valueCheck);
}

const resolveQuestion = (response) => {

    const valor = response.reduce((acc, prev, indice) => {
        acc[indice] = prev.toLowerCase();
        return acc
    }, {});

    const arrayResponse = [valor];

    validationResponse(arrayResponse);
}

const validationResponse = (valid) => {
    valid.forEach(resp => {
        console.log(resp)
        if (resp[0] == "si" && resp[1] == "si" && resp[2] == "no" && resp[3] == "no") {
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
    })
}