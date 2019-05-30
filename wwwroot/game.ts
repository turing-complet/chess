class Game {
    
    id: string;
    state: Map<string, string>;
    isWhiteTurn: boolean;
    whiteLosses: string[];
    blackLosses: string[];

    constructor(id: string, state: Map<string, string>, isWhiteTurn: boolean, whiteLosses: string[], blackLosses: string[]) {
        this.id = id;
        this.state = state;
        this.isWhiteTurn = isWhiteTurn;
        this.whiteLosses = whiteLosses;
        this.blackLosses = blackLosses;
    }

    public move(from: string, to: string) {
        if (this.state.get(to)){
            this.capture(to)
        }
        const piece = this.state.get(from)!
        this.deleteAt(from)
        this.setPiece(to, piece)
    }

    private capture(position: string): void {
        const piece = this.state.get(position)!
        if (piece[0] == "w") {
            this.whiteLosses.push(piece)
        } else {
            this.blackLosses.push(piece)
        }
        this.deleteAt(position)
    }

    public toJson() {
        return JSON.stringify({
            "id": this.id,
            "state": this.mapToObject(this.state),
            "isWhiteTurn": this.isWhiteTurn,
            "whiteLosses": this.whiteLosses,
            "blackLosses": this.blackLosses
        });
    }

    private mapToObject(map: Map<string, string>) {
        let o: { [index:string] : string } = {};
        map.forEach((value, key) => {
          o[key] = value;
        });
        return o;
    }

    private deleteAt(position: string): void {
        this.state.delete(position);
    }

    public setPiece(position: string, piece: string): void {
        this.state.set(position, piece);
    }      
}

export { Game };