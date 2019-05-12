class Game {
    
    id: string;
    state: Map<string, string>;
    isWhiteTurn: boolean;
    losses: string[];

    constructor(id: string, state: Map<string, string>, isWhiteTurn: boolean, losses: string[]) {
        this.id = id;
        this.state = state;
        this.isWhiteTurn = isWhiteTurn;
        this.losses = losses;
    }
    
    public deleteAt(position: string) {
        this.state.delete(position);
    }

    public setPiece(position: string, piece: string) {
        this.state.set(position, piece);
    }

    public toJson() {
        return JSON.stringify({
            "id": this.id,
            "state": this.mapToObject(this.state),
            "isWhiteTurn": this.isWhiteTurn,
            "losses": this.losses
        });
    }

    private mapToObject(map: Map<string, string>) {
        let o: { [index:string] : string } = {};
        map.forEach((value, key) => {
          o[key] = value;
        });
        return o;
      }
      
}

export { Game };