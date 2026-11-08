function requireButton(button, name) {
    if (!button) {
        throw new TypeError(`Le bouton « ${name} » est obligatoire.`);
    }
    return button;
}

/** Relie les boutons et les touches aux actions fournies, sans gérer le cycle de jeu. */
export function bindInput({
    startButton,
    pauseButton,
    restartButton,
    onStart,
    onPause,
    onRestart,
    onMove,
    onRotate,
    onSoftDrop,
    target = window,
}) {
    const start = requireButton(startButton, "Démarrer");
    const pause = requireButton(pauseButton, "Pause");
    const restart = requireButton(restartButton, "Recommencer");

    start.addEventListener("click", onStart);
    pause.addEventListener("click", onPause);
    restart.addEventListener("click", onRestart);

    function handleKeydown(event) {
        switch (event.key) {
            case "ArrowLeft":
                event.preventDefault();
                onMove(-1);
                break;
            case "ArrowRight":
                event.preventDefault();
                onMove(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                onRotate();
                break;
            case "ArrowDown":
                event.preventDefault();
                onSoftDrop();
                break;
            case "p":
            case "P":
                if (!event.repeat) {
                    onPause();
                }
                break;
        }
    }

    target.addEventListener("keydown", handleKeydown);

    return function removeInputListeners() {
        start.removeEventListener("click", onStart);
        pause.removeEventListener("click", onPause);
        restart.removeEventListener("click", onRestart);
        target.removeEventListener("keydown", handleKeydown);
    };
}
