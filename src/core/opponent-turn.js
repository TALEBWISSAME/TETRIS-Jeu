import { findLegalPlacements } from "./ai.js";
import { PIECES } from "./piece.js";

/**
 * Exécute une rotation, un déplacement horizontal ou une descente par appel.
 * Si une action est bloquée, le moteur fait descendre la pièce avant un nouvel essai.
 * Le moteur vérifie les collisions et verrouille la pièce lorsqu'elle ne peut plus descendre.
 * @param {object} player Joueur adverse avec son instance et sa difficulté.
 * @param {{piece: object|null, placement: object|null}} turn État du placement en cours.
 * @returns {object} État de la partie après la commande.
 * @throws {Error} Si la décision de l'IA ne correspond à aucun placement légal.
 */
export function advanceOpponentTurn(player, turn) {
    const game = player.game;
    if (game.status !== "playing") {
        return game.state;
    }

    const currentPiece = game.currentPiece;
    if (turn.piece !== currentPiece) {
        const nextPiece = Object.hasOwn(PIECES, game.nextPieceType)
            ? PIECES[game.nextPieceType]
            : undefined;
        const decision = player.aiPlayer.decide(
            game.grid,
            currentPiece.matrix,
            nextPiece,
        );
        if (!decision) {
            throw new Error("L'IA n'a trouvé aucun placement légal pour une partie en cours.");
        }
        const placement = findLegalPlacements(game.grid, currentPiece.matrix).find(
            candidate => candidate.rotation === decision.rotation
                && candidate.x === decision.colonne,
        );
        if (!placement) {
            throw new Error("La décision de l'IA ne correspond à aucun placement légal.");
        }

        turn.piece = currentPiece;
        turn.placement = { ...placement, remainingRotations: placement.rotation };
    }

    const placement = turn.placement;
    if (placement.remainingRotations > 0) {
        const previousMatrix = currentPiece.matrix;
        game.rotate();
        if (currentPiece.matrix !== previousMatrix) {
            placement.remainingRotations--;
            return game.state;
        }
    } else if (currentPiece.x !== placement.x) {
        const previousX = currentPiece.x;
        game.move(Math.sign(placement.x - currentPiece.x));
        if (currentPiece.x !== previousX) {
            return game.state;
        }
    }

    game.tick();
    if (game.currentPiece !== currentPiece) {
        turn.piece = null;
        turn.placement = null;
    }
    return game.state;
}
