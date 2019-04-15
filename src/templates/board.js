window.onload = function() {
    initialize();
    init_handlers();
}

let startPosition = {
    "wp": ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    "bp": ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    "wb": ["c1", "f1"],
    "bb": ["c8", "f8"],
    "wk": ["b1", "g1"],
    "bk": ["b8", "g8"],
    "wr": ["a1", "h1"],
    "br": ["a8", "h8"],
    "wq": ["d1"],
    "bq": ["d8"],
    "wK": ["e1"],
    "bK": ["e8"]
};

function initialize() {
    Object.keys(startPosition).forEach(function(piece) {
        startPosition[piece].forEach (function (pos) {
            setPiece(piece, pos)
        })
    })
}

function init_handlers() {
    const tab = document.getElementById("board-id")
    const cells = tab.getElementsByTagName("td")
    for (let cell of cells){
        cell.addEventListener('drop', drop_handler(cell));
        cell.addEventListener('dragover', dragover_handler);
    }
}

function setPiece(piece, position) {
    const el = document.getElementById(position)
    const img = new Image()
    img.id = piece + position
    img.src = `img/${piece}.svg`
    img.addEventListener('dragstart', drag_image_handler)
    el.appendChild(img)
}

function drag_image_handler(ev) {
    const dt = event.dataTransfer;
    dt.setData("text/plain", ev.target.id);
}

function dragover_handler(ev) {
    ev.preventDefault();
}

function drop_handler(cell) {
    return function (ev)
    {
        ev.preventDefault();
        if (cell.childElementCount > 0) {
            return false
        }
        const data = ev.dataTransfer.getData("text/plain");
        cell.appendChild(document.getElementById(data));
    }
}

window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
};