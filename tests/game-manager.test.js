import { describe, expect, it } from "vitest";
import { GameManager } from "../src/core/game-manager.js";

describe("GameManager", () => {
    it("crée une partie solo avec un joueur humain", () => {
        const manager = new GameManager({ seed: 12 });

        expect(manager.players).toHaveLength(1);
        expect(manager.humanPlayer).toBe(manager.players[0]);
        expect(manager.humanPlayer.role).toBe("human");
        expect(manager.opponents).toHaveLength(0);
        expect(manager.games).toHaveLength(1);
    });

    it.each([1, 2, 3])("crée une partie avec %i adversaire(s)", opponents => {
        const manager = new GameManager({ opponents, seed: 12 });

        expect(manager.players).toHaveLength(opponents + 1);
        expect(manager.humanPlayer.index).toBe(0);
        expect(manager.humanPlayer.role).toBe("human");
        expect(manager.opponents).toHaveLength(opponents);
        expect(manager.opponents.every(player => player.role === "opponent")).toBe(true);
    });

    it.each([-1, 1.5, 4, NaN, "2", null])(
        "refuse le nombre d'adversaires invalide %s",
        opponents => {
            expect(() => new GameManager({ opponents })).toThrow(RangeError);
        },
    );

    it("donne à chaque partie un état et un générateur indépendants", () => {
        const manager = new GameManager({ opponents: 2, seed: 25 });
        const [human, opponent1, opponent2] = manager.games;

        human.grid[19][0] = 1;
        human.currentPiece.x -= 1;
        human.state.score = 500;

        expect(opponent1.grid[19][0]).toBe(0);
        expect(opponent2.grid[19][0]).toBe(0);
        expect(opponent1.currentPiece.x).not.toBe(human.currentPiece.x);
        expect(opponent1.score).toBe(0);
        expect(opponent2.score).toBe(0);
        expect(new Set(manager.games.map(game => game.state.random)).size).toBe(3);
    });

    it("reproduit les mêmes graines de joueur et d'adversaires pour une graine initiale donnée", () => {
        const first = new GameManager({ opponents: 3, seed: 2026 });
        const second = new GameManager({ opponents: 3, seed: 2026 });
        const firstPieces = first.players.map(({ game }) => [
            game.currentPiece.type,
            game.nextPieceType,
        ]);
        const secondPieces = second.players.map(({ game }) => [
            game.currentPiece.type,
            game.nextPieceType,
        ]);

        expect(firstPieces).toEqual(secondPieces);
        expect(first.players.map(({ game }) => game.state.random))
            .not.toEqual(second.players.map(({ game }) => game.state.random));
    });

    it("refuse une graine non entière", () => {
        expect(() => new GameManager({ seed: 2.5 })).toThrow(TypeError);
    });
});
