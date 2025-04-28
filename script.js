let board = [null, null, null, null, null, null, null, null, null];

const winningCombinations = [
    [0, 1, 2], // erste Reihe
    [3, 4, 5], // zweite Reihe
    [6, 7, 8], // dritte Reihe
    [0, 3, 6], // erste Spalte
    [1, 4, 7], // zweite Spalte
    [2, 5, 8], // dritte Spalte
    [0, 4, 8], // Diagonale \
    [2, 4, 6], // Diagonale /
];

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
            html += `<td id="cell-${index}" data-index="${index}" onclick="handleClick(${index})">${
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

    checkGameStatus(); // <-- Spielstand prüfen
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

function checkGameStatus() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Gewinner anzeigen
            document.getElementById("game-status").innerText = `${board[a].toUpperCase()} hat gewonnen! 🎉`;
            document.getElementById("restart-button").style.display = "block";

            // Linienpositionen berechnen
            const positions = [
                { x: 16, y: 16 }, { x: 50, y: 16 }, { x: 84, y: 16 },
                { x: 16, y: 50 }, { x: 50, y: 50 }, { x: 84, y: 50 },
                { x: 16, y: 84 }, { x: 50, y: 84 }, { x: 84, y: 84 },
            ];

            drawWinningLine(positions[a], positions[c]);
            return;
        }
    }

    if (!board.includes(null)) {
        document.getElementById("game-status").innerText = "Unentschieden! 😅";
        document.getElementById("restart-button").style.display = "block";
    }
}
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "o";
    document.getElementById("game-status").innerText = "";
    document.getElementById("restart-button").style.display = "none";
    
    const winningLine = document.querySelector(".winning-line");
    if (winningLine) {
        winningLine.remove();
    }

    render();
}

function drawWinningLine(start, end) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    svg.classList.add("winning-line-svg");

    line.setAttribute("x1", start.x + "%");
    line.setAttribute("y1", start.y + "%");
    line.setAttribute("x2", end.x + "%");
    line.setAttribute("y2", end.y + "%");

    svg.appendChild(line);
    document.getElementById("game-container").appendChild(svg);
}
