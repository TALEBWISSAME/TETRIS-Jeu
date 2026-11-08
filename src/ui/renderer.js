import { GRID_HEIGHT, GRID_WIDTH } from "../core/grid.js";
import { PIECES } from "../core/piece.js";

const CELL_COLORS = {
    I: "#35f4f4",
    O: "#ffe45e",
    T: "#c878ff",
    S: "#67ff9b",
    Z: "#ff5d83",
    J: "#5795ff",
    L: "#ffad55",
};

const LOCKED_CELL_COLOR = "#8b72ff";
const GRID_LINE_COLOR = "rgba(147, 167, 255, 0.13)";

function requireElement(element, name) {
    if (!element) {
        throw new TypeError(`L'élément « ${name} » est obligatoire.`);
    }
    return element;
}

function drawCell(context, x, y, size, color, glow = true) {
    const inset = Math.max(1, size * 0.07);
    context.save();
    if (glow) {
        context.shadowColor = color;
        context.shadowBlur = Math.max(5, size * 0.35);
    }
    context.fillStyle = color;
    context.fillRect(x + inset, y + inset, size - inset * 2, size - inset * 2);
    context.shadowBlur = 0;
    context.strokeStyle = "rgba(255, 255, 255, 0.5)";
    context.lineWidth = Math.max(1, size * 0.035);
    context.strokeRect(
        x + inset + context.lineWidth / 2,
        y + inset + context.lineWidth / 2,
        size - inset * 2 - context.lineWidth,
        size - inset * 2 - context.lineWidth,
    );
    context.restore();
}

function drawBoard(context, game, width, height) {
    const cellWidth = width / GRID_WIDTH;
    const cellHeight = height / GRID_HEIGHT;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#080d1b";
    context.fillRect(0, 0, width, height);

    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (game.grid[y][x] === 1) {
                drawCell(
                    context,
                    x * cellWidth,
                    y * cellHeight,
                    Math.min(cellWidth, cellHeight),
                    LOCKED_CELL_COLOR,
                );
            }
        }
    }

    if (game.currentPiece) {
        const { matrix, type, x: pieceX, y: pieceY } = game.currentPiece;
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === 1) {
                    drawCell(
                        context,
                        (pieceX + x) * cellWidth,
                        (pieceY + y) * cellHeight,
                        Math.min(cellWidth, cellHeight),
                        CELL_COLORS[type],
                    );
                }
            }
        }
    }

    context.save();
    context.strokeStyle = GRID_LINE_COLOR;
    context.lineWidth = 1;
    for (let x = 0; x <= GRID_WIDTH; x++) {
        context.beginPath();
        context.moveTo(x * cellWidth, 0);
        context.lineTo(x * cellWidth, height);
        context.stroke();
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
        context.beginPath();
        context.moveTo(0, y * cellHeight);
        context.lineTo(width, y * cellHeight);
        context.stroke();
    }
    context.restore();
}

function drawPreview(context, type, width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#0a1021";
    context.fillRect(0, 0, width, height);
    if (!type || !PIECES[type]) {
        return;
    }

    const matrix = PIECES[type];
    const cellSize = Math.min(
        (width * 0.68) / matrix.length,
        (height * 0.68) / matrix.length,
    );
    const offsetX = (width - cellSize * matrix.length) / 2;
    const offsetY = (height - cellSize * matrix.length) / 2;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                drawCell(
                    context,
                    offsetX + x * cellSize,
                    offsetY + y * cellSize,
                    cellSize,
                    CELL_COLORS[type],
                );
            }
        }
    }
}

/** Crée un rendu Canvas qui affiche l'état reçu sans le modifier. */
export function createRenderer({
    boardCanvas,
    nextCanvas,
    scoreElement,
    levelElement,
    linesElement,
    gameOverElement,
}) {
    requireElement(boardCanvas, "boardCanvas");
    requireElement(nextCanvas, "nextCanvas");
    requireElement(scoreElement, "scoreElement");
    requireElement(levelElement, "levelElement");
    requireElement(linesElement, "linesElement");
    requireElement(gameOverElement, "gameOverElement");

    const boardContext = boardCanvas.getContext("2d");
    const nextContext = nextCanvas.getContext("2d");
    if (!boardContext || !nextContext) {
        throw new Error("Le navigateur ne permet pas le rendu HTML5 Canvas.");
    }

    return function render(game) {
        drawBoard(boardContext, game, boardCanvas.width, boardCanvas.height);
        drawPreview(nextContext, game.nextPieceType, nextCanvas.width, nextCanvas.height);
        scoreElement.textContent = game.score.toLocaleString("fr-FR");
        levelElement.textContent = String(game.level);
        linesElement.textContent = String(game.linesCleared);
        gameOverElement.hidden = game.status !== "gameover";
        if (game.status === "gameover") {
            gameOverElement.textContent = "Partie terminée";
        }
    };
}
