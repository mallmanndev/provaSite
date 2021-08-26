
const bootsAlert = (type, message) => {
    const alertEl = document.getElementById("bootstrap-alert");

    alertEl.className = type === "error" ? "alert alert-danger" : "alert alert-success"
    alertEl.innerText = message;
    alertEl.style.display = "block";
}

const clearAlert = () => {
    const alertEl = document.getElementById("bootstrap-alert");

    alertEl.style.display = "none";
}

const validateRequired = (field) => {
    if (!field.value) {
        field.focus();
        field.classList.add("is-invalid")
        bootsAlert("error", `O campo ${field.getAttribute("data-name")} é obrigatório!`);
        throw new Error(`O campo ${field.getAttribute("data-name")} é obrigatório!`)
    }

    field.classList.remove("is-invalid")
}

const validateLen = (field, len) => {
    if (field.value.length < len) {
        field.focus();
        field.classList.add("is-invalid")
        bootsAlert("error", `O campo ${field.getAttribute("data-name")} deve que ter no mínimo ${len} caracteres!`);
        throw new Error(`O campo ${field.getAttribute("data-name")} deve que ter no mínimo ${len} caracteres!`)
    }

    field.classList.remove("is-invalid")
}

const validateData = (fields) => {
    const { nome, email, cidade, mensagem } = fields

    try {
        [nome, email, cidade, mensagem].map((item) => validateRequired(item));
        [{ field: nome, len: 6 }, { field: cidade, len: 4 }]
            .map((item) => validateLen(item.field, item.len))
    } catch (err) {
        console.log(err)
        return;
    }

    bootsAlert("success", "Informações validadas com sucesso!");
}

window.onload = () => {
    const form = document.getElementById('contato_form');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateData(e.target)
    })

    form.addEventListener("reset", (e) => {
        clearAlert();
    })
}