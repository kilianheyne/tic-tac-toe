const board = [null, null, null, null, null, null, null, null, null];

// Achtung - dieses Projekt ist in starker Zusammenarbeit mit ChatGPT entstanden. :)
// Als Test für Prompt Engineering

function init() {
    render();
}

function render() {
    const container = document.getElementById("game-container");

    let html = "<table>";
    for (let row = 0; row < 3; row++) {
        html += "<tr>";
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const cellValue = board[index];
            html += `<td onclick="handleClick(${index})">${
                cellValue !== null ? cellValue : ""
            }</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    container.innerHTML = html;
}

let currentPlayer = "o";

function handleClick(index) {
    if (board[index] !== null) return; // Zelle ist schon belegt

    board[index] = currentPlayer;

    // Zelle im DOM direkt aktualisieren:
    const table = document.getElementById("game-container").getElementsByTagName("table")[0];
    const cell = table.getElementsByTagName("td")[index];
    cell.innerHTML = currentPlayer === "o" ? generateCircleSVG() : generateCrossSVG();

    // Spieler wechseln
    currentPlayer = currentPlayer === "o" ? "x" : "o";
}


function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle
                cx="35"
                cy="35"
                r="30"
                stroke="#00B0EF"
                stroke-width="6"
                fill="none"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4"
                style="animation: drawCircle 0.5s ease-out forwards;"
            />
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100">
            <line
                x1="25" y1="25" x2="75" y2="75"
                stroke="#FF5A5F"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="70.71"
                stroke-dashoffset="70.71"
                style="animation: drawCross 0.3s ease-out forwards"
            />
            <line
                x1="75" y1="25" x2="25" y2="75"
                stroke="#FF5A5F"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="70.71"
                stroke-dashoffset="70.71"
                style="animation: drawCross 0.3s ease-out 0.15s forwards"
            />
        </svg>
    `;
}

