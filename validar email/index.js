// Selecione os elementos
const emailInput = document.querySelector("#emailInput");
const emailForm = document.querySelector("#emailForm");
const resultMessage = document.querySelector("#resultMessage");

// Um evento que ativa após a submissão do form 
emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value

    // validar e-mail

    const isValid = validateEmail(email);

    if (isValid) {
        resultMessage.textContent = "E-mail válido";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "E-mail inválido";
        resultMessage.style.color = "red";
    }
});

    //Função de validar e-mail
    const validateEmail = (email) => {
        // Padrão: TEXTO@TEXTO.TEXTO
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
};