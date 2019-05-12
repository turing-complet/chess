import { list_games, new_game } from "./api.js";

window.onload = function () {
    init();
}

function init() {
    const start = document.getElementById("start-game")
    start!.addEventListener('click', new_game)
    populate_game_list()
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
