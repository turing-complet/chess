window.onload = function() {
    init();
}

GAME_API = window.location.origin + '/api/game/'

function init() {
    const start = document.getElementById("start-game")
    start.addEventListener('click', newGame)
    populate_game_list()
}

let state = {
    "a1": "wr", "b1": "wk", "c1": "wb", "d1": "wq", "e1": "wK", "f1": "wb", "g1": "wk", "h1": "wr",
    "a8": "br", "b8": "bk", "c8": "bb", "d8": "bq", "e8": "bK", "f8": "bb", "g8": "bk", "h8": "br",
    "a2": "wp", "b2": "wp", "c2": "wp", "d2": "wp", "e2": "wp", "f2": "wp", "g2": "wp", "h2": "wp", 
    "a7": "bp", "b7": "bp", "c7": "bp", "d7": "bp", "e7": "bp", "f7": "bp", "g7": "bp", "h7": "bp"
}

function newGame() {
    fetch(GAME_API, {
        headers: {
            "content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({"state": state})
    })// loading animation //.then(response => window.location.href = gameUrl(response.json().id))
}

function populate_game_list() {
    const lst = document.getElementById('game-list-id')
    list_games().then(function (json) {
        for (var gameid of json) {
            let a = document.createElement("a");
            let li = document.createElement("li");
            a.innerText = gameid
            a.href = window.location.origin + '/board.html?id=' + gameid
            li.appendChild(a)
            lst.appendChild(li)
        }
    });
}

function list_games() {
    return fetch(GAME_API)
        .then(function(response) {
            return response.json();
          })
}