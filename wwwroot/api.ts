
import {GAME_API} from "./config.js";

function list_games() {
    return fetch(GAME_API)
        .then(function(response) {
            return response.json();
          })
}

function load_game(id: string) {
    return fetch(GAME_API + id)
        .then(function(response) {
            return response.json();
          })
}

function save_game(state: object) {
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

export { list_games, load_game, save_game };