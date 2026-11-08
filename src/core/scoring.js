const LINE_SCORES = [0, 100, 300, 500, 800];

function validateLineCount(lines) {
    if (!Number.isInteger(lines) || lines < 0) {
        throw new RangeError("Le nombre de lignes doit être un entier positif ou nul.");
    }
}

/** Retourne les points gagnés pour le nombre de lignes supprimées simultanément. */
export function getLineScore(linesCleared) {
    validateLineCount(linesCleared);
    if (linesCleared >= LINE_SCORES.length) {
        throw new RangeError("Le nombre de lignes supprimées simultanément doit être compris entre 0 et 4.");
    }
    return LINE_SCORES[linesCleared];
}

/** Retourne le niveau correspondant au nombre total de lignes supprimées. */
export function getLevel(totalLinesCleared) {
    validateLineCount(totalLinesCleared);
    return Math.floor(totalLinesCleared / 10) + 1;
}
