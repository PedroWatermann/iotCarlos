<?php
$id = $_GET["id"] ?? 0;
$titulo = $_GET["titulo"] ?? 'Undefined';

if ($id < 0) {
    echo"
        <script>
            alert('Deseja mesmo excluir o evento $titulo?');
        </script>
    ";
} else if ($id >= 1) {
    header(header: "Location: editEventos.php?id=$id");
} else if (empty($id)) {
    header(header: "Location: addEventos.html");
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda de Eventos</title>
    <link rel="stylesheet" href="styles/eventos.css">
    <link rel="shortcut icon" href="icons/calendar.ico" type="image/x-icon">
</head>

<body>
    <header>
        <img src="images/calendar.png" alt="Logo do site">

        <h1>Agenda de Eventos</h1>
        <nav>
            <ul>
                <li><a href="index.html">Início</a></li>
                <li><a href="calendario.html">Calendário</a></li>
                <li><a href="eventos.php" id="eventos">Eventos</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <form>
            <label for="title">Título: </label>
            <input type="text" name="title" id="title" required>

            <label for="description">Descrição:</label>
            <textarea name="description" id="description" rows="4"></textarea>

            <div class="date-time-container">
                <div class="date-time-item"> 
                    <label for="date">Data</label> 
                    <input type="date" id="date" name="date" required> 
                    </div>
                <div class="date-time-item"> 
                    <label for="time">Hora</label> 
                    <input type="time" id="time" name="time"> 
                </div>
            </div>

            <button type="submit">Cadastrar</button>

            <div class="informacao">
                <p class="info">são obrigatórios!</p>
                <p class="info">Itens com</p>
            </div>
        </form>
    </main>

    <aside>
        <h3>Contato:</h3>
        <a href="https://github.com/pedrowatermann" target="_blank">
            <p>&#64;pedrowatermann</p>
        </a>
    </aside>
    <footer>
        <p>&copy; 2024 Watermann, P. Todos os direitos reservados.</p>
    </footer>

    <script src="scripts/eventos.js"></script>
</body>

</html>