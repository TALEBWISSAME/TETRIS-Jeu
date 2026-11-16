import { describe, expect, it, vi } from "vitest";
import { GameManager } from "../src/core/game-manager.js";
import { advanceOpponentTurn } from "../src/core/opponent-turn.js";
import { canPlacePiece, createGrid, GRID_HEIGHT, GRID_WIDTH } from "../src/core/grid.js";
import { PIECES, rotate } from "../src/core/piece.js";

describe("déplacements progressifs des adversaires", () => {
    it.each(["beginner", "intermediate", "expert"])(
        "exécute un seul mouvement par étape pour l'IA %s avant le verrouillage",
        difficulty => {
            const manager = new GameManager({ opponents: 1, difficulty, seed: 44 });
            const opponent = manager.opponents[0];
            const game = opponent.game;
            const turn = { piece: null, placement: null };
            const firstPiece = game.currentPiece;
            const decide = vi.spyOn(opponent.aiPlayer, "decide");
            let steps = 0;

            while (game.currentPiece === firstPiece && steps < GRID_HEIGHT + GRID_WIDTH + 4) {
                const previousX = firstPiece.x;
                const previousY = firstPiece.y;
                const previousMatrix = firstPiece.matrix;
                manager.advanceOpponent(opponent, turn);
                steps++;

                if (game.currentPiece === firstPiece) {
                    const changedCoordinates = Number(firstPiece.x !== previousX)
                        + Number(firstPiece.y !== previousY)
                        + Number(firstPiece.matrix !== previousMatrix);
                    expect(changedCoordinates).toBe(1);
                    expect(Math.abs(firstPiece.x - previousX)).toBeLessThanOrEqual(1);
                    expect(firstPiece.y - previousY).toBeLessThanOrEqual(1);
                    expect(canPlacePiece(game.grid, firstPiece.matrix, firstPiece.x, firstPiece.y))
                        .toBe(true);
                }
            }

            expect(game.currentPiece).not.toBe(firstPiece);
            expect(decide).toHaveBeenCalledTimes(1);
            expect(game.grid.flat().filter(cell => cell === 1)).toHaveLength(4);
            expect(turn).toEqual({ piece: null, placement: null });
        },
    );

    it("déplace la pièce d'une seule colonne avec move() à chaque étape", () => {
        const manager = new GameManager({ opponents: 1 });
        const opponent = manager.opponents[0];
        const game = opponent.game;
        game.currentPiece.matrix = PIECES.O.map(row => [...row]);
        game.currentPiece.x = 3;
        const decide = vi.spyOn(opponent.aiPlayer, "decide")
            .mockReturnValue({ rotation: 0, colonne: 7 });
        const move = vi.spyOn(game, "move");
        const tick = vi.spyOn(game, "tick");
        const turn = { piece: null, placement: null };

        for (const x of [4, 5, 6, 7]) {
            manager.advanceOpponent(opponent, turn);
            expect(game.currentPiece.x).toBe(x);
            expect(game.currentPiece.y).toBe(0);
        }
        expect(move).toHaveBeenCalledTimes(4);
        expect(move.mock.calls).toEqual([[1], [1], [1], [1]]);
        expect(tick).not.toHaveBeenCalled();

        manager.advanceOpponent(opponent, turn);
        expect(game.currentPiece.y).toBe(1);
        expect(tick).toHaveBeenCalledTimes(1);
        expect(decide).toHaveBeenCalledTimes(1);
    });

    it.each([1, 2, 3])("effectue %i quart(s) de tour avec rotate(), un par étape", rotations => {
        const manager = new GameManager({ opponents: 1 });
        const opponent = manager.opponents[0];
        const game = opponent.game;
        game.currentPiece.matrix = PIECES.T.map(row => [...row]);
        game.currentPiece.x = 3;
        vi.spyOn(opponent.aiPlayer, "decide").mockReturnValue({ rotation: rotations, colonne: 3 });
        const rotatePiece = vi.spyOn(game, "rotate");
        const move = vi.spyOn(game, "move");
        const tick = vi.spyOn(game, "tick");
        const turn = { piece: null, placement: null };
        let expectedMatrix = PIECES.T;

        for (let step = 0; step < rotations; step++) {
            expectedMatrix = rotate(expectedMatrix);
            manager.advanceOpponent(opponent, turn);
            expect(game.currentPiece.matrix).toEqual(expectedMatrix);
            expect(game.currentPiece.x).toBe(3);
            expect(game.currentPiece.y).toBe(0);
        }
        expect(rotatePiece).toHaveBeenCalledTimes(rotations);
        expect(move).not.toHaveBeenCalled();
        expect(tick).not.toHaveBeenCalled();

        manager.advanceOpponent(opponent, turn);
        expect(game.currentPiece.y).toBe(1);
        expect(tick).toHaveBeenCalledTimes(1);
    });

    it.each(["beginner", "intermediate", "expert"])(
        "ne traverse pas un mur pour atteindre une destination légale avec l'IA %s",
        difficulty => {
            const manager = new GameManager({ opponents: 1, difficulty });
            const opponent = manager.opponents[0];
            const game = opponent.game;
            game.currentPiece.matrix = PIECES.T.map(row => [...row]);
            game.currentPiece.x = 3;
            for (const row of game.grid) {
                row[6] = 1;
            }
            // La destination est libre, mais le mur interdit le premier pas vers elle.
            expect(canPlacePiece(game.grid, game.currentPiece.matrix, 7, 0)).toBe(true);
            const decide = vi.spyOn(opponent.aiPlayer, "decide")
                .mockReturnValue({ rotation: 0, colonne: 7 });
            const move = vi.spyOn(game, "move");
            const firstPiece = game.currentPiece;
            const turn = { piece: null, placement: null };
            let steps = 0;

            while (game.currentPiece === firstPiece && steps < GRID_HEIGHT + 1) {
                advanceOpponentTurn(opponent, turn);
                expect(firstPiece.x).toBe(3);
                expect(firstPiece.matrix).toEqual(PIECES.T);
                steps++;
            }

            expect(move).toHaveBeenCalled();
            expect(decide).toHaveBeenCalledTimes(1);
            expect(game.currentPiece).not.toBe(firstPiece);
            expect(game.grid.every(row => row[6] === 1)).toBe(true);
            expect(game.grid.every(row => row.slice(7).every(cell => cell === 0))).toBe(true);
            expect(game.grid.flat().filter(cell => cell === 1)).toHaveLength(GRID_HEIGHT + 4);
            expect(turn).toEqual({ piece: null, placement: null });
        },
    );

    it("descend sous un obstacle avant de réessayer le déplacement horizontal", () => {
        const manager = new GameManager({ opponents: 1 });
        const opponent = manager.opponents[0];
        const game = opponent.game;
        game.currentPiece.matrix = PIECES.T.map(row => [...row]);
        game.currentPiece.x = 3;
        game.grid[1][6] = 1;
        vi.spyOn(opponent.aiPlayer, "decide").mockReturnValue({ rotation: 0, colonne: 7 });
        const turn = { piece: null, placement: null };

        manager.advanceOpponent(opponent, turn);
        expect(game.currentPiece.x).toBe(3);
        expect(game.currentPiece.y).toBe(1);
        manager.advanceOpponent(opponent, turn);
        expect(game.currentPiece.x).toBe(4);
        expect(game.currentPiece.y).toBe(1);
        expect(game.grid[1][6]).toBe(1);
    });

    it("respecte une rotation refusée par le moteur et verrouille la forme initiale", () => {
        const manager = new GameManager({ opponents: 1 });
        const opponent = manager.opponents[0];
        const game = opponent.game;
        game.currentPiece.matrix = PIECES.T.map(row => [...row]);
        game.currentPiece.x = 3;
        game.grid[2][4] = 1;
        vi.spyOn(opponent.aiPlayer, "decide").mockReturnValue({ rotation: 1, colonne: 7 });
        const rotatePiece = vi.spyOn(game, "rotate");
        const firstPiece = game.currentPiece;

        manager.advanceOpponent(opponent, { piece: null, placement: null });

        expect(rotatePiece).toHaveBeenCalledTimes(1);
        expect(firstPiece.matrix).toEqual(PIECES.T);
        expect(firstPiece.x).toBe(3);
        expect(game.currentPiece).not.toBe(firstPiece);
        expect(game.grid[0][4]).toBe(1);
        expect(game.grid[1].slice(3, 6)).toEqual([1, 1, 1]);
        expect(game.grid.flat().filter(cell => cell === 1)).toHaveLength(5);
    });

    it("utilise le moteur pour verrouiller une pièce et supprimer une ligne", () => {
        const manager = new GameManager({ opponents: 1, difficulty: "intermediate", seed: 7 });
        const opponent = manager.opponents[0];
        const game = opponent.game;
        game.state.grid = createGrid();
        game.state.grid[GRID_HEIGHT - 1] = Array(GRID_WIDTH).fill(1);
        game.state.grid[GRID_HEIGHT - 1][GRID_WIDTH - 1] = 0;
        game.currentPiece.matrix = [[1]];
        game.currentPiece.x = 0;
        game.currentPiece.y = 0;
        const firstPiece = game.currentPiece;
        const turn = { piece: null, placement: null };
        let steps = 0;

        while (game.currentPiece === firstPiece && steps < GRID_HEIGHT + GRID_WIDTH) {
            manager.advanceOpponent(opponent, turn);
            steps++;
        }

        expect(game.currentPiece).not.toBe(firstPiece);
        expect(game.linesCleared).toBe(1);
        expect(game.score).toBe(100);
        expect(game.grid[GRID_HEIGHT - 1]).toEqual(Array(GRID_WIDTH).fill(0));
    });
});
