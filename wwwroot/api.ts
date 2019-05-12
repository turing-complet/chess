
import {GAME_API, INITIAL_STATE} from "./config.js";
import { Game } from "./game.js";

function list_games() {
    return fetch(GAME_API)
        .then(function(response: Response) {
            return response.json();
        })
}

function load_game(id: string) {
    return fetch(GAME_API + id)
        .then(function(response: Response) {
            return response.json();
        }).then(function(json) {
            return new Game(json.id, new Map(Object.entries(json.state)), true, [])
        })
}

function new_game() {
    fetch(GAME_API, {
        headers: {
            "content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ "state": INITIAL_STATE })
    })
}

function save_game(game: Game) {
    console.log("saving game: " + game.id + ", " + game.toJson())
    fetch(GAME_API + game.id, {
        headers: {
            "content-type": "application/json"
        },
        method: 'PUT',
        body: game.toJson()
    })
}

export { list_games, load_game, save_game, new_game };