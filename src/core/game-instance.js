import {
    createGame,
    movePiece,
    rotatePiece,
    softDrop,
    tick,
} from "./game.js";
import { canPlacePiece } from "./grid.js";

/** Représente une partie indépendante en s'appuyant sur le moteur de jeu existant. */
export class GameInstance {
    constructor({ seed = 0, random } = {}) {
        this.state = random === undefined
            ? createGame({ seed })
            : createGame({ seed, random });
    }

    get grid() {
        return this.state.grid;
    }

    get currentPiece() {
        return this.state.currentPiece;
    }

    get nextPieceType() {
        return this.state.nextPieceType;
    }

    get score() {
        return this.state.score;
    }

    get linesCleared() {
        return this.state.linesCleared;
    }

    get level() {
        return this.state.level;
    }

    get dropIntervalMs() {
        return this.state.dropIntervalMs;
    }

    get status() {
        return this.state.status;
    }

    /** Déplace la pièce active d'une case à gauche ou à droite. */
    move(direction) {
        movePiece(this.state, direction);
        return this;
    }

    /** Tourne la pièce active d'un quart de tour horaire si le placement est possible. */
    rotate() {
        rotatePiece(this.state);
        return this;
    }

    /** Fait descendre la pièce d'une case avec la descente accélérée. */
    softDrop() {
        softDrop(this.state);
        return this;
    }

    /** Effectue une étape de descente automatique. */
    tick() {
        tick(this.state);
        return this;
    }

    /** Verrouille un placement final légal en laissant le moteur appliquer les règles. */
    playPlacement(placement) {
        if (this.state.status !== "playing") {
            return this;
        }
        if (
            !placement
            || !Array.isArray(placement.matrix)
            || !Number.isInteger(placement.x)
            || !Number.isInteger(placement.y)
            || !canPlacePiece(this.state.grid, placement.matrix, placement.x, placement.y)
            || canPlacePiece(this.state.grid, placement.matrix, placement.x, placement.y + 1)
        ) {
            throw new Error("Le placement doit être une position finale légale.");
        }

        Object.assign(this.state.currentPiece, {
            matrix: placement.matrix.map(row => [...row]),
            x: placement.x,
            y: placement.y,
        });
        tick(this.state);
        return this;
    }
}
