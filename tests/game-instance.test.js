import { describe, expect, it } from "vitest";
import { createGame, movePiece } from "../src/core/game.js";
import { GameInstance } from "../src/core/game-instance.js";

describe("GameInstance", () => {
    it("crée des grilles et des pièces indépendantes", () => {
        const first = new GameInstance({ seed: 1 });
        const second = new GameInstance({ seed: 2 });
        const secondInitialGrid = second.grid.map(row => [...row]);
        const secondInitialX = second.currentPiece.x;

        first.grid[19][0] = 1;
        first.move(-1);

        expect(second.grid).toEqual(secondInitialGrid);
        expect(second.grid[19][0]).toBe(0);
        expect(second.currentPiece.x).toBe(secondInitialX);
        expect(first.grid).not.toBe(second.grid);
        expect(first.currentPiece).not.toBe(second.currentPiece);
    });

    it("conserve un score indépendant par instance", () => {
        const first = new GameInstance({ seed: 1 });
        const second = new GameInstance({ seed: 2 });
        first.state.score = 300;

        expect(first.score).toBe(300);
        expect(second.score).toBe(0);
    });

    it("utilise un générateur seedable propre à chaque instance", () => {
        const first = new GameInstance({ seed: 42 });
        const repeated = new GameInstance({ seed: 42 });
        const other = new GameInstance({ seed: 43 });

        expect(first.currentPiece.type).toBe(repeated.currentPiece.type);
        expect(first.nextPieceType).toBe(repeated.nextPieceType);
        expect(first.state.random).not.toBe(repeated.state.random);
        expect(first.state.random).not.toBe(other.state.random);
    });

    it("expose le déplacement, la rotation et les deux types de descente", () => {
        const instance = new GameInstance({ seed: 1 });
        const initialX = instance.currentPiece.x;
        const initialY = instance.currentPiece.y;

        expect(instance.move(-1)).toBe(instance);
        expect(instance.currentPiece.x).toBe(initialX - 1);
        expect(instance.rotate()).toBe(instance);
        expect(instance.softDrop()).toBe(instance);
        expect(instance.currentPiece.y).toBe(initialY + 1);
        expect(instance.tick()).toBe(instance);
        expect(instance.currentPiece.y).toBe(initialY + 2);
    });

    it("laisse le fonctionnement de createGame et des fonctions solo inchangé", () => {
        const soloGame = createGame({ seed: 123 });
        const instance = new GameInstance({ seed: 123 });

        expect(instance.currentPiece.type).toBe(soloGame.currentPiece.type);
        expect(instance.nextPieceType).toBe(soloGame.nextPieceType);

        const originalX = soloGame.currentPiece.x;
        movePiece(soloGame, -1);
        expect(soloGame.currentPiece.x).toBe(originalX - 1);
        expect(instance.currentPiece.x).not.toBe(soloGame.currentPiece.x);
    });

    it("accepte un générateur injecté sans le partager par défaut", () => {
        const random = () => 0.4;
        const instance = new GameInstance({ random });
        const other = new GameInstance({ seed: 9 });

        expect(instance.state.random).toBe(random);
        expect(instance.currentPiece.type).toBe("T");
        expect(other.state.random).not.toBe(random);
    });
});
