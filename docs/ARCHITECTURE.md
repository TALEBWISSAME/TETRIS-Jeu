# Architecture du jeu

## Présentation générale

Le projet sépare les règles du jeu de leur affichage. Le dossier `src/core/`
contient le moteur et les données de partie, sans dépendre de la page ou du
Canvas. Le dossier `src/ui/` s'occupe du rendu et des commandes. Le fichier
`main.js` relie ces deux parties et gère le déroulement des parties dans le
navigateur.

Cette séparation permet au moteur d'être testé sans lancer l'interface.

## Rôle des principales parties

### `src/core/`

Ce dossier contient la logique du jeu :

- `game.js` crée l'état d'une partie, fait descendre les pièces et applique les
  déplacements, les rotations, les verrouillages et la fin de partie. Il fournit
  aussi `createSeededRandom` pour produire des parties reproductibles.
- `grid.js` crée la grille et vérifie les collisions et les placements. Il
  verrouille les pièces sur une copie de la grille et supprime les lignes
  complètes.
- `piece.js` définit les matrices des sept tétrominos et la fonction `rotate`.
- `scoring.js` calcule les points attribués aux lignes et le niveau.
- `game-instance.js` définit `GameInstance`, une interface autour de l'état d'une
  partie. Ses méthodes délèguent les règles au moteur.
- `game-manager.js` définit `GameManager`, qui crée le joueur humain et de zéro
  à trois adversaires. Chaque joueur reçoit une instance de jeu avec sa propre
  graine. Les adversaires reçoivent aussi un générateur de décisions dédié.
- `ai.js` énumère les placements légaux avec `findLegalPlacements`, puis permet
  de choisir un placement avec `chooseBeginnerPlacement`,
  `chooseIntermediatePlacement` ou `chooseExpertPlacement`.

### `src/ui/`

Ce dossier contient les éléments liés à l'interface :

- `input.js` relie les boutons et les touches du clavier à des fonctions
  fournies par `main.js`.
- `renderer.js` dessine une partie solo ou une à quatre parties dans leurs
  Canvas. Il affiche aussi les statistiques, l'état de la partie, l'aperçu de
  la prochaine pièce et les animations de lignes.
- `locked-colors.js` maintient les couleurs des pièces verrouillées en accord
  avec la grille binaire du moteur et fournit les lignes retirées pour
  l'animation.

### `main.js`

`main.js` initialise les éléments de la page, crée le `GameManager` et les
données nécessaires à l'affichage, puis relie le moteur, les IA et les modules
de l'interface. Il gère les minuteries de descente, la pause, le redémarrage, le
changement de mode et le choix de difficulté.

## Fonctionnement d'une partie solo

Au démarrage, `main.js` crée un `GameManager` sans adversaire et utilise l'état
de partie du joueur humain. `createRenderer` prépare l'affichage du plateau et
des statistiques.

Quand le jeu démarre, `scheduleTick` programme une descente après l'intervalle
indiqué par le niveau. Pour le joueur humain, cette étape appelle `tick` dans
`game.js`. Si la pièce ne peut plus descendre, le moteur la verrouille, supprime
les lignes complètes, met à jour le score et le niveau, puis crée la pièce
suivante. L'état obtenu est dessiné par `draw`.

## Mode multijoueur et IA

En mode multijoueur, `GameManager` crée le joueur humain et de un à trois
adversaires. Chaque joueur a sa propre `GameInstance`, donc sa grille, son score,
son état et son générateur de pièces sont indépendants. Les adversaires
utilisent la difficulté sélectionnée dans l'interface; le générateur
pseudo-aléatoire de l'IA Débutante est propre à chaque adversaire.

À chaque descente programmée pour un adversaire, `playOpponentTurn` appelle la
fonction correspondant à sa difficulté :

- **Débutant** choisit au hasard parmi les placements légaux.
- **Intermédiaire** choisit un placement selon une heuristique qui favorise les
  lignes complètes et pénalise les trous et la hauteur.
- **Expert** évalue les placements avec la hauteur cumulée, les lignes
  supprimées, les trous et l'irrégularité des colonnes. Si le type de la
  prochaine pièce est présent dans l'état de la partie, il peut aussi tenir
  compte d'un placement pour cette pièce.

L'IA fournit une position finale légale; elle ne modifie pas elle-même la
grille. `GameInstance.playPlacement` vérifie la position et demande au moteur
d'effectuer la descente qui verrouille la pièce. Le moteur reste ainsi
responsable des collisions, des lignes, du score et de la fin de partie.

Chaque joueur possède sa propre minuterie. Mettre le jeu en pause, le reprendre
ou terminer une partie agit sur les minuteries et états correspondants.
`createMultiplayerRenderer` affiche les grilles, le rôle et la difficulté des
joueurs, ainsi que leurs statistiques et leur état.

## D'une commande clavier au rendu

`bindInput` dans `src/ui/input.js` écoute les flèches et la touche P. Pour une
commande de déplacement, de rotation ou de descente, `main.js` retrouve le
joueur humain et appelle `perform`. En mode solo, `perform` utilise directement
les fonctions du moteur; en multijoueur, il appelle la méthode correspondante
de l'instance du joueur humain. Les adversaires ne reçoivent pas ces commandes.

Après l'action, `perform` appelle `draw`. Si la grille a changé parce qu'une
pièce a été verrouillée, `syncLockedColors` met à jour les couleurs via
`applyLockedPiece` et lance l'animation des lignes supprimées. `draw` choisit
ensuite le rendu solo ou multijoueur.

## Relations entre les modules

```mermaid
flowchart TD
    Main["main.js"]
    Game["src/core/game.js"]
    Grid["src/core/grid.js"]
    Piece["src/core/piece.js"]
    Scoring["src/core/scoring.js"]
    Instance["src/core/game-instance.js"]
    Manager["src/core/game-manager.js"]
    AI["src/core/ai.js"]
    Input["src/ui/input.js"]
    Renderer["src/ui/renderer.js"]
    Colors["src/ui/locked-colors.js"]

    Main --> Manager
    Main --> Game
    Main --> AI
    Main --> Input
    Main --> Renderer
    Main --> Colors
    Manager --> Instance
    Manager --> Game
    Instance --> Game
    Game --> Grid
    Game --> Piece
    Game --> Scoring
    AI --> Grid
    AI --> Piece
    Renderer --> Grid
    Renderer --> Piece
    Colors --> Grid
    Colors --> Piece
```

## Étapes principales d'un tour

```mermaid
flowchart TD
    Timer["La minuterie du joueur arrive à échéance"]
    Human{"Le joueur est-il humain ?"}
    HumanTick["main.js appelle tick"]
    Choose["main.js appelle l'IA adaptée"]
    Placement["L'IA retourne un placement légal"]
    Play["GameInstance.playPlacement vérifie le placement"]
    Engine["Le moteur descend ou verrouille la pièce"]
    Rows["Le moteur supprime les lignes et met à jour score et niveau"]
    Colors["main.js synchronise les couleurs verrouillées"]
    Render["main.js dessine le nouvel état"]
    Continue{"La partie est-elle encore en cours ?"}
    Schedule["Une nouvelle descente est programmée"]
    End["La partie s'arrête"]

    Timer --> Human
    Human -->|Oui| HumanTick
    Human -->|Non| Choose
    Choose --> Placement
    Placement --> Play
    HumanTick --> Engine
    Play --> Engine
    Engine --> Rows
    Rows --> Colors
    Colors --> Render
    Render --> Continue
    Continue -->|Oui| Schedule
    Continue -->|Non| End
```
