import { describe, expect, it } from "vitest";
import { findLegalPlacements } from "../src/core/ai.js";
import { canPlacePiece, createGrid, GRID_HEIGHT, GRID_WIDTH } from "../src/core/grid.js";
import { createGame } from "../src/core/game.js";
import { PIECES } from "../src/core/piece.js";

describe("énumération des placements légaux", () => {
    it("trouve des placements valides et au plus bas sur une grille vide", () => {
        const grid = createGrid();
        const placements = findLegalPlacements(grid, PIECES.T);

        expect(placements.length).toBeGreaterThan(0);
        for (const { matrix, x, y } of placements) {
            expect(canPlacePiece(grid, matrix, x, y)).toBe(true);
            expect(canPlacePiece(grid, matrix, x, y + 1)).toBe(false);
        }
    });

    it("inclut les placements qui touchent les bords gauche et droit", () => {
        const placements = findLegalPlacements(createGrid(), [[1]]);

        expect(placements.map(placement => placement.x)).toEqual(
            Array.from({ length: GRID_WIDTH }, (_, x) => x),
        );
        expect(placements.every(placement => placement.y === GRID_HEIGHT - 1)).toBe(true);
    });

    it("respecte les collisions avec les blocs déjà présents", () => {
        const grid = createGrid();
        grid[GRID_HEIGHT - 1][4] = 1;

        const placements = findLegalPlacements(grid, [[1]]);
        const atColumnFour = placements.filter(placement => placement.x === 4);

        expect(atColumnFour).toHaveLength(1);
        expect(atColumnFour[0].y).toBe(GRID_HEIGHT - 2);
        expect(placements.every(({ x, y }) => grid[y][x] === 0)).toBe(true);
    });

    it("énumère les rotations distinctes et élimine celles des pièces symétriques", () => {
        const squarePlacements = findLegalPlacements(createGrid(), PIECES.O);
        const teePlacements = findLegalPlacements(createGrid(), PIECES.T);

        expect([...new Set(squarePlacements.map(placement => placement.rotation))]).toEqual([0]);
        expect([...new Set(teePlacements.map(placement => placement.rotation))]).toEqual([0, 1, 2, 3]);
        expect(teePlacements.every(({ matrix }) => matrix.length === 3)).toBe(true);
    });

    it("ne modifie ni la grille ni la matrice fournie", () => {
        const game = createGame({ seed: 123 });
        const gridBefore = game.grid.map(row => [...row]);
        const pieceBefore = game.currentPiece.matrix.map(row => [...row]);

        const placements = findLegalPlacements(game.grid, game.currentPiece.matrix);

        expect(placements.length).toBeGreaterThan(0);
        expect(game.grid).toEqual(gridBefore);
        expect(game.currentPiece.matrix).toEqual(pieceBefore);
    });

    it("retourne une liste vide lorsque la grille est bloquée", () => {
        const grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(1));

        expect(findLegalPlacements(grid, PIECES.T)).toEqual([]);
    });
});
