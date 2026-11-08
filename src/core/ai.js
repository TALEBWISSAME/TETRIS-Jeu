import { canPlacePiece, GRID_WIDTH } from "./grid.js";
import { rotate } from "./piece.js";

/** Énumère les positions finales accessibles d'une pièce sans modifier la grille. */
export function findLegalPlacements(grid, piece) {
    canPlacePiece(grid, piece, 0, 0);

    const placements = [];
    const seenOrientations = new Set();
    let matrix = piece.map(row => [...row]);

    for (let rotation = 0; rotation < 4; rotation++) {
        const orientation = JSON.stringify(matrix);
        if (!seenOrientations.has(orientation)) {
            seenOrientations.add(orientation);

            for (let x = 1 - matrix.length; x < GRID_WIDTH; x++) {
                if (!canPlacePiece(grid, matrix, x, 0)) {
                    continue;
                }

                let y = 0;
                while (canPlacePiece(grid, matrix, x, y + 1)) {
                    y++;
                }
                placements.push({
                    rotation,
                    matrix: matrix.map(row => [...row]),
                    x,
                    y,
                });
            }
        }
        matrix = rotate(matrix);
    }

    return placements;
}

/** Choisit un placement légal au hasard avec un générateur injectable. */
export function chooseBeginnerPlacement(grid, piece, random = Math.random) {
    if (typeof random !== "function") {
        throw new TypeError("Le générateur aléatoire doit être une fonction.");
    }

    const placements = findLegalPlacements(grid, piece);
    if (placements.length === 0) {
        return null;
    }

    const value = random();
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value >= 1) {
        throw new RangeError("Le générateur aléatoire doit retourner un nombre entre 0 inclus et 1 exclu.");
    }
    return placements[Math.floor(value * placements.length)];
}
