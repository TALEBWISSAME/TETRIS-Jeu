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
