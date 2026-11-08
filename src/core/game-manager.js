import { GameInstance } from "./game-instance.js";

export const MAX_OPPONENTS = 3;

/** Organise la partie humaine et ses adversaires sans partager leur état de jeu. */
export class GameManager {
    constructor({ opponents = 0, seed = 0 } = {}) {
        if (!Number.isInteger(opponents) || opponents < 0 || opponents > MAX_OPPONENTS) {
            throw new RangeError("Le nombre d'adversaires doit être compris entre 0 et 3.");
        }
        if (!Number.isInteger(seed)) {
            throw new TypeError("La graine doit être un entier.");
        }

        this.humanPlayerIndex = 0;
        this.players = Array.from({ length: opponents + 1 }, (_, index) => ({
            index,
            role: index === this.humanPlayerIndex ? "human" : "opponent",
            game: new GameInstance({ seed: (seed + index) >>> 0 }),
        }));
    }

    get humanPlayer() {
        return this.players[this.humanPlayerIndex];
    }

    get opponents() {
        return this.players.filter(player => player.role === "opponent");
    }

    get games() {
        return this.players.map(player => player.game);
    }
}
