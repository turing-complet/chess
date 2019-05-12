import { save_game, load_game } from "./api.js"
import { Game } from "./game.js";

window.onload = function() {

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    load_game(id!).then(function (game: Game) {
        currentGame = game
    }).then(function() {
        render(currentGame)
    });

    // render(currentGame);
}

var currentGame: Game;
let blackLosses: string[] = []
let whiteLosses: string[] = []

function render(currentGame: Game) {
    console.log("Rendering board")
    init_board();
    set_pieces(currentGame.state)
    setLosses();
    init_handlers()
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

function set_pieces(state: Map<string, string>) {
    state.forEach((v, k) => {
        setPiece(v, k)
    })
}

function setPiece(piece: string, position: string) {
    const el = document.getElementById(position)
    if (!el) {
        const msg = "Element null at position: " + position
        console.log(msg)
        throw new Error(msg)
    }
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
        const img = document.getElementById(data);

        const prevLocation = (img!.parentNode! as any).id
        if (prevLocation == cell.id) {
            return false
        }

        if (cell.childElementCount > 0) {
            capture(cell.id);
        }

        currentGame.deleteAt(prevLocation);

        const piece = img!.id.substring(0, 2);
        currentGame.setPiece(cell.id, piece);
        save_game(currentGame)
        render(currentGame);
    }
}

function capture(position: string) {
    const piece = currentGame.state.get(position)!
    console.log("position: " + position)
    console.log("piece: " + piece)
    if (piece[0] == "w") {
        whiteLosses.push(piece)
    } else {
        blackLosses.push(piece)
    }
    currentGame.deleteAt(position)
}

window.onbeforeunload = function() {
//   return "There are unsaved changes. Leave now?";
};