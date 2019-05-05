window.onload = function() {
    render();
    // init_handlers();
}

GAME_API = window.location.origin + '/api/game/'

let state = {
    "a1": "wr", "b1": "wk", "c1": "wb", "d1": "wq", "e1": "wK", "f1": "wb", "g1": "wk", "h1": "wr",
    "a8": "br", "b8": "bk", "c8": "bb", "d8": "bq", "e8": "bK", "f8": "bb", "g8": "bk", "h8": "br",
    "a2": "wp", "b2": "wp", "c2": "wp", "d2": "wp", "e2": "wp", "f2": "wp", "g2": "wp", "h2": "wp", 
    "a7": "bp", "b7": "bp", "c7": "bp", "d7": "bp", "e7": "bp", "f7": "bp", "g7": "bp", "h7": "bp"
}

let stack = [state]

let blackLosses = []
let whiteLosses = []

function render() {
    console.log("Rendering board")
    init_board();
    console.log(state)

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    load_game(id).then(function(json) {
        set_pieces(json.state)
    })
    setLosses();
    init_handlers()
}

function load_game(id) {
    return fetch(GAME_API + id)
        .then(function(response) {
            return response.json();
          })
}

function set_pieces(state) {
    Object.keys(state).forEach(function(position) {
        console.log(JSON.stringify(state))
        setPiece(state[position], position)
    })
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
    img.src = `images/${piece}.svg`
    img.addEventListener('dragstart', drag_image_handler)
    el.appendChild(img)
}

function newImage(piece) {
    const img = new Image()
    img.src = `images/${piece}.svg`
    return img
}

function setLosses() {
    bl = document.getElementById("black-loss")
    wl = document.getElementById("white-loss")

    // console.log("Clear loss area")
    while (bl.firstChild) { bl.removeChild(bl.firstChild) }
    while (wl.firstChild) { wl.removeChild(wl.firstChild) }

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
        
        const data = ev.dataTransfer.getData("text/plain");
        const img = document.getElementById(data);

        if (img.parentNode.id == cell.id) {
            console.log("Cannot capture self")
            return false
        }

        if (cell.childElementCount > 0) {
            capture(cell.id);
        }

        delete state[img.parentNode.id]

        piece = img.id.substring(0, 2)
        state[cell.id] = piece
        save_game(state)
        render();
    }
}

function save_game(state) {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    fetch(GAME_API + id, {
        headers: {
            "content-type": "application/json"
        },
        method: 'PUT',
        body: JSON.stringify({"id": id, "state": state})
    })
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


window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
};