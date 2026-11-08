import { GameInstance } from "./game-instance.js";
import { createSeededRandom } from "./game.js";

export const MAX_OPPONENTS = 3;
export const AI_DIFFICULTIES = ["beginner", "intermediate", "expert"];

/** Organise la partie humaine et ses adversaires sans partager leur état de jeu. */
export class GameManager {
    constructor({ opponents = 0, seed = 0, difficulty = "beginner" } = {}) {
        if (!Number.isInteger(opponents) || opponents < 0 || opponents > MAX_OPPONENTS) {
            throw new RangeError("Le nombre d'adversaires doit être compris entre 0 et 3.");
        }
        if (!Number.isInteger(seed)) {
            throw new TypeError("La graine doit être un entier.");
        }
        if (!AI_DIFFICULTIES.includes(difficulty)) {
            throw new RangeError("La difficulté doit être beginner, intermediate ou expert.");
        }

        this.humanPlayerIndex = 0;
        this.players = Array.from({ length: opponents + 1 }, (_, index) => {
            const role = index === this.humanPlayerIndex ? "human" : "opponent";
            return {
                index,
                role,
                game: new GameInstance({ seed: (seed + index) >>> 0 }),
                difficulty: role === "opponent" ? difficulty : null,
                aiRandom: role === "opponent"
                    ? createSeededRandom((seed + Math.imul(index, 0x9E3779B9)) >>> 0)
                    : null,
            };
        });
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
