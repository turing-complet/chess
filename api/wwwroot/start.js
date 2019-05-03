window.onload = function() {
    init();
}

function init() {
    const start = document.getElementById("start-game")
    start.addEventListener('click', newGame)
}

let state = {
    "a1": "wr", "b1": "wk", "c1": "wb", "d1": "wq", "e1": "wK", "f1": "wb", "g1": "wk", "h1": "wr",
    "a8": "br", "b8": "bk", "c8": "bb", "d8": "bq", "e8": "bK", "f8": "bb", "g8": "bk", "h8": "br",
    "a2": "wp", "b2": "wp", "c2": "wp", "d2": "wp", "e2": "wp", "f2": "wp", "g2": "wp", "h2": "wp", 
    "a7": "bp", "b7": "bp", "c7": "bp", "d7": "bp", "e7": "bp", "f7": "bp", "g7": "bp", "h7": "bp"
}

function newGame() {
    const url = window.location.origin + '/api/game'
    fetch(url, {
        headers: {
            "content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({"state": state})
    })// loading animation //.then(response => window.location.href = gameUrl(response.json().id))
}

function gameUrl(id) {
    return window.location.origin + '/api/game/' + id
}