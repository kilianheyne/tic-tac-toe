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
            html += `<td data-index="${index}">${
                cellValue !== null ? cellValue : ""
            }</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    container.innerHTML = html;
}
