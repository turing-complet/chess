import { save_game, load_game } from "./api.js"
import { INITIAL_STATE } from "./config.js";

window.onload = function() {
    render();
    // init_handlers();
}

let stack: object[] = [INITIAL_STATE]

let state = INITIAL_STATE
let blackLosses: string[] = []
let whiteLosses: string[] = []

function render() {
    console.log("Rendering board")
    init_board();
    console.log(state)

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    load_game(id!).then(function(json) {
        set_pieces(json.state)
    })
    setLosses();
    init_handlers()
}

function set_pieces(state: object) {
    Object.keys(state).forEach(function(position) {
        console.log(JSON.stringify(state))
        setPiece((state as any)[position], position)
    })
}


function init_board() {
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("board-id")
    table!.innerHTML = ''
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    for (var i = 8; i >= 1; i--) {
        let row = table!.insertRow()
        // row.id = i
        row.classList.add("chessboard")
        letters.forEach(function(col) {
            let c = row.insertCell()
            c.id = col + i // a + 6, for example
            c.classList.add("chessboard")
        })  
    }
}

function init_handlers() {
    const tab = document.getElementById("board-id")
    const cells = tab!.getElementsByTagName("td")
    for (let cell of cells){
        cell.addEventListener('drop', drop_handler(cell));
        cell.addEventListener('dragover', dragover_handler);
    }
}

function setPiece(piece: string, position: string) {
    const el = document.getElementById(position)
    const img = new Image()
    img.id = piece + position
    img.src = `images/${piece}.svg`
    img.addEventListener('dragstart', drag_image_handler)
    el!.appendChild(img)
}

function newImage(piece: string) {
    const img = new Image()
    img.src = `images/${piece}.svg`
    return img
}

function setLosses() {
    let bl = document.getElementById("black-loss")
    let wl = document.getElementById("white-loss")

    // console.log("Clear loss area")
    while (bl!.firstChild) { bl!.removeChild(bl!.firstChild) }
    while (wl!.firstChild) { wl!.removeChild(wl!.firstChild) }

    console.log("blackLosses: " + blackLosses)
    blackLosses.forEach(function(p) {
        bl!.appendChild(newImage(p))
    })

    console.log("whiteLosses: " + whiteLosses)
    whiteLosses.forEach(function(p) {
        wl!.appendChild(newImage(p))
    })
}

function drag_image_handler(ev: DragEvent) {
    const dt = ev!.dataTransfer;
    dt!.setData("text/plain", (ev!.target! as any).id);
}

function dragover_handler(ev: DragEvent) {
    ev.preventDefault();
}

function drop_handler(cell: HTMLTableCellElement) {
    return function (ev: DragEvent)
    {
        ev.preventDefault();
        
        const data = ev!.dataTransfer!.getData("text/plain");
        console.log("finding img: " + data)
        const img = document.getElementById(data);

        if ((img!.parentNode! as any).id == cell.id) {
            console.log("Cannot capture self")
            return false
        }

        if (cell.childElementCount > 0) {
            capture(cell.id);
        }

        delete (state as any)[(img!.parentNode! as any).id];

        const piece = img!.id.substring(0, 2);
        (state as any)[cell.id] = piece
        save_game(state)
        render();
    }
}

function capture(position: string) {
    const piece = (state as any)[position]
    console.log("position: " + position)
    console.log("piece: " + piece)
    if (piece[0] == "w") {
        whiteLosses.push(piece)
    } else {
        blackLosses.push(piece)
    }
    delete (state as any)[position]
}


window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
};