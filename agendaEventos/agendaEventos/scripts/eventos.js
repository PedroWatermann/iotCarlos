const link = window.location.href;
window.onload = () => {
    if (link.includes("eventos")) {
        const eventos = document.querySelector("#eventos");
        eventos.classList.add("page");
    }
};