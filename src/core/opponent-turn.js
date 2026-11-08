import {
    chooseBeginnerPlacement,
    chooseExpertPlacement,
    chooseIntermediatePlacement,
} from "./ai.js";
import { PIECES } from "./piece.js";

/**
 * Fait avancer un adversaire d'une case vers le placement choisi par son IA.
 * La pièce est verrouillée par le moteur lorsqu'elle atteint sa position finale.
 * @param {object} player Joueur adverse avec son instance et sa difficulté.
 * @param {{piece: object|null, placement: object|null}} turn État du placement en cours.
 * @returns {object} État de la partie après cette étape de descente.
 */
export function advanceOpponentTurn(player, turn) {
    const game = player.game;
    if (game.status !== "playing") {
        return game.state;
    }

    const currentPiece = game.currentPiece;
    if (turn.piece !== currentPiece) {
        let placement;
        if (player.difficulty === "beginner") {
            placement = chooseBeginnerPlacement(game.grid, currentPiece.matrix, player.aiRandom);
        } else if (player.difficulty === "intermediate") {
            placement = chooseIntermediatePlacement(game.grid, currentPiece.matrix);
        } else if (player.difficulty === "expert") {
            const nextPiece = Object.hasOwn(PIECES, game.nextPieceType)
                ? PIECES[game.nextPieceType]
                : undefined;
            placement = chooseExpertPlacement(game.grid, currentPiece.matrix, nextPiece);
        } else {
            throw new RangeError(`Difficulté d'adversaire inconnue : ${player.difficulty}.`);
        }

        if (!placement) {
            throw new Error("L'IA n'a trouvé aucun placement légal pour une partie en cours.");
        }

        turn.piece = currentPiece;
        turn.placement = placement;
        currentPiece.matrix = placement.matrix.map(row => [...row]);
        currentPiece.x = placement.x;
    }

    game.tick();
    if (game.currentPiece !== currentPiece) {
        turn.piece = null;
        turn.placement = null;
    }
    return game.state;
}
