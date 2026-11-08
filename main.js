import {
    createGame,
    movePiece,
    rotatePiece,
    softDrop,
    tick,
} from "./src/core/game.js";
import { GRID_HEIGHT, GRID_WIDTH } from "./src/core/grid.js";
import { bindInput } from "./src/ui/input.js";
import { applyLockedPiece } from "./src/ui/locked-colors.js";
import { createRenderer } from "./src/ui/renderer.js";

function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`L'élément « ${id} » est introuvable dans la page.`);
    }
    return element;
}

const pauseButton = getElement("pause-button");
const render = createRenderer({
    boardCanvas: getElement("game-board"),
    nextCanvas: getElement("next-piece"),
    scoreElement: getElement("score"),
    levelElement: getElement("level"),
    linesElement: getElement("lines"),
    gameOverElement: getElement("game-over"),
});

let seed = Date.now() >>> 0;
let game = createGame({ seed });
let lockedColors = createColorGrid();
let isRunning = false;
let isPaused = false;
let timerId = null;
let lineClearAnimation = null;

function createColorGrid() {
    return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));
}

function draw() {
    const lineClear = lineClearAnimation
        ? {
            rows: lineClearAnimation.rows,
            progress: Math.min(
                (performance.now() - lineClearAnimation.startedAt) / lineClearAnimation.duration,
                1,
            ),
        }
        : undefined;
    render(game, { lockedColors, lineClear });
}

function animateLineClear(animation) {
    if (lineClearAnimation !== animation) {
        return;
    }

    if (performance.now() - animation.startedAt >= animation.duration) {
        lineClearAnimation = null;
        draw();
        return;
    }

    draw();
    requestAnimationFrame(() => animateLineClear(animation));
}

function updateLockedColors(previousGrid, piece, nextGrid) {
    const result = applyLockedPiece(previousGrid, lockedColors, piece, nextGrid);
    lockedColors = result.lockedColors;

    if (result.removedRows.length > 0) {
        const animation = {
            rows: result.removedRows,
            startedAt: performance.now(),
            duration: 360,
        };
        lineClearAnimation = animation;
        requestAnimationFrame(() => animateLineClear(animation));
    }
}

function perform(action) {
    if (!isRunning || isPaused || game.status !== "playing") {
        return;
    }

    const previousPiece = game.currentPiece;
    const previousGrid = game.grid;
    action(game);
    if (previousPiece && game.grid !== previousGrid) {
        updateLockedColors(previousGrid, previousPiece, game.grid);
    }
    draw();
}

function clearTimer() {
    if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
    }
}

function scheduleTick() {
    clearTimer();
    if (!isRunning || isPaused || game.status !== "playing") {
        return;
    }

    timerId = setTimeout(() => {
        timerId = null;
        perform(tick);
        scheduleTick();
    }, game.dropIntervalMs);
}

function startGame() {
    if (game.status === "gameover") {
        return;
    }
    isRunning = true;
    isPaused = false;
    pauseButton.textContent = "Pause";
    draw();
    scheduleTick();
}

function togglePause() {
    if (!isRunning || game.status !== "playing") {
        return;
    }
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Reprendre" : "Pause";
    if (isPaused) {
        clearTimer();
    } else {
        scheduleTick();
    }
    draw();
}

function restartGame() {
    clearTimer();
    seed = (seed + 1) >>> 0;
    game = createGame({ seed });
    lockedColors = createColorGrid();
    lineClearAnimation = null;
    isRunning = true;
    isPaused = false;
    pauseButton.textContent = "Pause";
    draw();
    scheduleTick();
}

bindInput({
    startButton: getElement("start-button"),
    pauseButton,
    restartButton: getElement("restart-button"),
    onStart: startGame,
    onPause: togglePause,
    onRestart: restartGame,
    onMove: direction => perform(currentGame => movePiece(currentGame, direction)),
    onRotate: () => perform(rotatePiece),
    onSoftDrop: () => perform(softDrop),
});

draw();
