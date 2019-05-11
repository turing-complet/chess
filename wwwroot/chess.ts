import { list_games } from "./api.js";
import { INITIAL_STATE, GAME_API } from "./config.js";

window.onload = function () {
    init();
}

function init() {
    const start = document.getElementById("start-game")
    start!.addEventListener('click', newGame)
    populate_game_list()
}

function newGame() {
    fetch(GAME_API, {
        headers: {
            "content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ "state": INITIAL_STATE })
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
            lst!.appendChild(li)
        }
    });
}
