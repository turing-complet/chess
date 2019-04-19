window.onload = function() {
    render();
    // init_handlers();
}

let state = {
    "a1": "wr", "b1": "wk", "c1": "wb", "d1": "wq", "e1": "wK", "f1": "wb", "g1": "wk", "h1": "wr",
    "a8": "br", "b8": "bk", "c8": "bb", "d8": "bq", "e8": "bK", "f8": "bb", "g8": "bk", "h8": "br",
    "a2": "wp", "b2": "wp", "c2": "wp", "d2": "wp", "e2": "wp", "f2": "wp", "g2": "wp", "h2": "wp", 
    "a7": "bp", "b7": "bp", "c7": "bp", "d7": "bp", "e7": "bp", "f7": "bp", "g7": "bp", "h7": "bp"
}

let blackLosses = []
let whiteLosses = []

function render() {
    console.log("Rendering board")
    init_board();
    console.log(state)
    Object.keys(state).forEach(function(position) {
        setPiece(state[position], position)
    })
    setLosses();
    init_handlers()
}

function init_board() {
    table = document.getElementById("board-id")
    table.innerHTML = ''
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (i = 8; i >= 1; i--) {
        row = table.insertRow()
        // row.id = i
        row.classList.add("chessboard")
        letters.forEach(function(col) {
            c = row.insertCell()
            c.id = col + i // a + 6, for example
            c.classList.add("chessboard")
        })  
    }
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

function newImage(piece) {
    const img = new Image()
    img.src = `img/${piece}.svg`
    return img
}

function setLosses() {
    bl = document.getElementById("black-loss")
    wl = document.getElementById("white-loss")

    // console.log("Clear loss area")
    bl.childNodes.forEach(function(c) { c.remove() })
    wl.childNodes.forEach(function(c) { c.remove() })

    console.log("blackLosses: " + blackLosses)
    blackLosses.forEach(function(p) {
        bl.appendChild(newImage(p))
    })

    console.log("whiteLosses: " + whiteLosses)
    whiteLosses.forEach(function(p) {
        wl.appendChild(newImage(p))
    })
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
            capture(cell.id);
        }
        const data = ev.dataTransfer.getData("text/plain");
        const img = document.getElementById(data);
        delete state[img.parentNode.id]

        piece = img.id.substring(0, 2)
        state[cell.id] = piece
        render();
    }
}

function capture(position) {
    const piece = state[position]
    console.log("position: " + position)
    console.log("piece: " + piece)
    if (piece[0] == "w") {
        whiteLosses.push(piece)
    } else {
        blackLosses.push(piece)
    }
    delete state[position]
}

function validate(p1, p2) {
    return true;
}


window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
};