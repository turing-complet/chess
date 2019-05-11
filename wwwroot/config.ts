const INITIAL_STATE = {
    "a1": "wr", "b1": "wk", "c1": "wb", "d1": "wq", "e1": "wK", "f1": "wb", "g1": "wk", "h1": "wr",
    "a8": "br", "b8": "bk", "c8": "bb", "d8": "bq", "e8": "bK", "f8": "bb", "g8": "bk", "h8": "br",
    "a2": "wp", "b2": "wp", "c2": "wp", "d2": "wp", "e2": "wp", "f2": "wp", "g2": "wp", "h2": "wp", 
    "a7": "bp", "b7": "bp", "c7": "bp", "d7": "bp", "e7": "bp", "f7": "bp", "g7": "bp", "h7": "bp"
}

let GAME_API = window.location.origin + '/api/game/'

export { INITIAL_STATE, GAME_API };