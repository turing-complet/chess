from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def start():
    if request.method == 'POST':
        # new game id, save pgn, send email
        pass
    else:
        return render_template('new_game.html')


@app.route('/games/<uuid:gameid>')
def game(gameid):
    # load pgn for game, convert to board dict, pass to game template
    return render_template('board.html')


@app.route('/game/<uuid:gameid>/move', methods=['POST'])
def process_move(gameid):
    pass


@app.route('/games')
def list_games():
    pass


if __name__ == '__main__':
    print('this is main')
    app.run(debug=True, host='0.0.0.0')
