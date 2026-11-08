import { describe, expect, it, vi } from "vitest";
import {
    chooseBeginnerPlacement,
    chooseIntermediatePlacement,
    findLegalPlacements,
} from "../src/core/ai.js";
import { canPlacePiece, createGrid, GRID_HEIGHT, GRID_WIDTH } from "../src/core/grid.js";
import { createGame, createSeededRandom } from "../src/core/game.js";
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

describe("IA Débutant", () => {
    it("choisit un placement légal", () => {
        const grid = createGrid();
        const piece = PIECES.T;
        const placement = chooseBeginnerPlacement(grid, piece, () => 0.5);

        expect(placement).not.toBeNull();
        expect(canPlacePiece(grid, placement.matrix, placement.x, placement.y)).toBe(true);
        expect(canPlacePiece(grid, placement.matrix, placement.x, placement.y + 1)).toBe(false);
    });

    it("reproduit son choix avec la même graine", () => {
        const grid = createGrid();
        const first = chooseBeginnerPlacement(grid, PIECES.L, createSeededRandom(321));
        const repeated = chooseBeginnerPlacement(grid, PIECES.L, createSeededRandom(321));

        expect(repeated).toEqual(first);
    });

    it("peut choisir des placements différents selon le tirage aléatoire", () => {
        const grid = createGrid();
        const first = chooseBeginnerPlacement(grid, PIECES.T, () => 0);
        const last = chooseBeginnerPlacement(grid, PIECES.T, () => 0.999999);

        expect(last).not.toEqual(first);
    });

    it("retourne null sans consommer le générateur lorsqu'aucun placement n'est possible", () => {
        const blockedGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(1));
        const random = vi.fn(() => 0.5);

        expect(chooseBeginnerPlacement(blockedGrid, PIECES.T, random)).toBeNull();
        expect(random).not.toHaveBeenCalled();
    });

    it("ne modifie ni la grille ni la pièce fournie", () => {
        const game = createGame({ seed: 678 });
        const gridBefore = game.grid.map(row => [...row]);
        const pieceBefore = game.currentPiece.matrix.map(row => [...row]);

        const placement = chooseBeginnerPlacement(
            game.grid,
            game.currentPiece.matrix,
            createSeededRandom(9),
        );

        expect(placement).not.toBeNull();
        expect(game.grid).toEqual(gridBefore);
        expect(game.currentPiece.matrix).toEqual(pieceBefore);
    });

    it("refuse les générateurs absents ou les tirages hors de l'intervalle valide", () => {
        expect(() => chooseBeginnerPlacement(createGrid(), PIECES.T, null)).toThrow(TypeError);
        expect(() => chooseBeginnerPlacement(createGrid(), PIECES.T, () => 1)).toThrow(RangeError);
    });
});

describe("IA Intermédiaire", () => {
    it("choisit un placement légal", () => {
        const grid = createGrid();
        const placement = chooseIntermediatePlacement(grid, PIECES.T);

        expect(placement).not.toBeNull();
        expect(canPlacePiece(grid, placement.matrix, placement.x, placement.y)).toBe(true);
    });

    it("préfère compléter une ligne", () => {
        const grid = createGrid();
        grid[GRID_HEIGHT - 1] = Array(GRID_WIDTH).fill(1);
        grid[GRID_HEIGHT - 1][4] = 0;

        const placement = chooseIntermediatePlacement(grid, [[1]]);

        expect(placement.x).toBe(4);
    });

    it("évite d'augmenter la hauteur maximale lorsqu'une colonne moins haute est disponible", () => {
        const grid = createGrid();
        for (let y = GRID_HEIGHT - 5; y < GRID_HEIGHT; y++) {
            grid[y][0] = 1;
        }

        const placement = chooseIntermediatePlacement(grid, [[1]]);

        expect(placement.x).toBe(1);
        expect(placement.y).toBe(GRID_HEIGHT - 1);
    });

    it("pénalise les trous créés par un placement", () => {
        const grid = createGrid();
        grid[GRID_HEIGHT - 2][0] = 1;

        const placement = chooseIntermediatePlacement(grid, [[1]]);

        expect(placement.x).toBe(1);
        expect(placement.y).toBe(GRID_HEIGHT - 1);
    });

    it("résout les égalités de façon déterministe", () => {
        const first = chooseIntermediatePlacement(createGrid(), [[1]]);
        const repeated = chooseIntermediatePlacement(createGrid(), [[1]]);

        expect(first).toEqual(repeated);
        expect(first.x).toBe(0);
    });

    it("reproduit la décision pour une même grille et une même pièce", () => {
        const grid = createGrid();
        grid[GRID_HEIGHT - 1][3] = 1;
        const first = chooseIntermediatePlacement(grid, PIECES.S);

        expect(chooseIntermediatePlacement(grid, PIECES.S)).toEqual(first);
    });

    it("ne modifie ni la grille ni la pièce d'origine", () => {
        const game = createGame({ seed: 246 });
        const gridBefore = game.grid.map(row => [...row]);
        const pieceBefore = game.currentPiece.matrix.map(row => [...row]);

        const placement = chooseIntermediatePlacement(game.grid, game.currentPiece.matrix);

        expect(placement).not.toBeNull();
        expect(game.grid).toEqual(gridBefore);
        expect(game.currentPiece.matrix).toEqual(pieceBefore);
    });

    it("retourne null lorsqu'aucun placement n'est possible", () => {
        const blockedGrid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(1));

        expect(chooseIntermediatePlacement(blockedGrid, PIECES.T)).toBeNull();
    });
});
