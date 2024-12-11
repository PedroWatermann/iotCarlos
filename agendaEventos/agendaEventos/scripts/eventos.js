window.onload = () => {
    const link = window.location.href;
    alert(link);
    if (link.includes("addEventos.html")) {
        const eventos = document.querySelector("#eventos");
        eventos.classList.add("page");
    }
};