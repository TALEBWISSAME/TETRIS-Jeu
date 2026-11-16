# Journal de travail — TP4 Tetris

Ce journal résume les demandes faites à Copilot pour les six exercices. Les
commits et les tags `ex1` à `ex6` permettent de retrouver les grandes étapes,
mais ils ne donnent pas le nombre exact de prompts envoyés. Quand ce nombre
n'est pas conservé, je donne seulement le minimum vérifiable.

## Exercice 1 — Prise en main de GitHub Copilot

### 1. Ce que j'ai demandé à Copilot

- Avec la complétion automatique, j'ai commencé l'objet `PIECES` et la
  fonction `rotate`.
- Avec `Ctrl+I`, j'ai demandé de lever une erreur si la matrice n'était pas
  carrée.
- Avec Ask, j'ai demandé une explication de l'orientation des matrices et une
  vérification des sept pièces.
- Avec le chat du terminal, j'ai demandé l'initialisation de npm et
  l'installation de Vitest.
- Avec Agent, j'ai demandé trois tests pour `rotate`, puis le renommage de
  `rotate` en `tourner`.

### 2. Ce que Copilot a produit

Copilot a proposé les sept matrices de `I`, `O`, `T`, `S`, `Z`, `J` et `L`.
Il a complété la rotation horaire et ajouté la vérification des dimensions.
Il a créé les tests de rotation et proposé la commande d'installation de
Vitest. L'Agent a aussi renommé `rotate` et ses références dans une
proposition séparée.

### 3. Ce que j'ai gardé

J'ai gardé les sept matrices, la rotation, la vérification de matrice carrée,
les trois tests et la configuration npm/Vitest. Les matrices ont été vérifiées
et étaient correctes.

### 4. Ce que j'ai corrigé ou annulé

Une première exécution a semblé produire une erreur de syntaxe parce que le
fichier n'était pas enregistré. Après `Ctrl+S`, le test a réussi. J'ai ajouté
manuellement `"type": "module"` et le script `"test": "vitest run"`.
J'ai utilisé Restore checkpoint pour annuler le renommage en `tourner` et
conserver le nom `rotate`.

### 5. Le nombre d'itérations

Le détail vérifiable est le suivant :

- étape 1 : Nombre exact non relevé ;
- étape 2 : 1 génération, puis 1 nouvelle exécution après l'enregistrement ;
- étape 3 : 1 demande ;
- étape 4 : 1 demande ;
- étape 5 : 1 demande ;
- étape 6 : 1 demande Agent ;
- étape 7 : 1 demande Agent, puis restauration du checkpoint.

Nombre exact non relevé pour l'ensemble des propositions de complétion.

### 6. Mon bilan personnel

La complétion est pratique pour écrire rapidement du code connu, mais je dois
enregistrer le fichier et tester le résultat. Le mode Agent peut modifier
plusieurs fichiers, et le checkpoint permet de revenir en arrière.

## Exercice 2 — Développement du jeu solo

### 1. Ce que j'ai demandé à Copilot

J'ai d'abord demandé un plan de développement à Copilot en mode Plan/Ask.
Après ce plan, j'ai demandé les cinq étapes du jeu :

1. créer la grille et ses tests ;
2. créer le score et les niveaux ;
3. construire le moteur du jeu ;
4. créer l'interface graphique ;
5. relier le moteur, l'interface et les commandes.

J'ai aussi demandé des corrections pendant le développement, notamment pour
les problèmes du moteur, les couleurs des pièces verrouillées, l'animation
des lignes et les identifiants des boutons.

### 2. Ce que Copilot a produit

La première proposition de plan utilisait des noms de fichiers différents de
ceux demandés et oubliait `grid.js`. Après correction, le plan contenait cinq
étapes conformes à l'organisation du projet.

L'Agent a ensuite produit :

- `grid.js` et ses tests ;
- `scoring.js` et ses tests ;
- `game.js` et les tests du moteur ;
- `renderer.js`, `index.html` et `styles.css` ;
- `main.js`, `input.js`, puis `locked-colors.js` et ses tests.

Les résultats historiques consignés sont passés de 8 tests à 40, puis 44
tests réussis. L'interface a été testée dans le navigateur pour les
déplacements, la rotation, la suppression des lignes et le score.

### 3. Ce que j'ai gardé

J'ai gardé l'organisation en `src/core` et `src/ui`, le style arcade néon,
les cinq étapes du plan, les tests et les identifiants des boutons. J'ai
également gardé les corrections qui ont permis au jeu solo d'être jouable.

### 4. Ce que j'ai corrigé ou annulé

J'ai demandé de corriger le premier plan pour qu'il corresponde aux fichiers
du TP. Pendant l'étape du moteur, trois problèmes ont été signalés au premier
lancement des tests ; les tests et les corrections ont été repris jusqu'à
obtenir 40 tests réussis. Une erreur de modification CSS a aussi nécessité
une nouvelle tentative. Enfin, les couleurs des pièces verrouillées et
l'animation de suppression ont été reprises après plusieurs essais.

### 5. Le nombre d'itérations

Le minimum vérifiable est de 7 demandes principales : 2 propositions de plan
et 5 demandes correspondant aux étapes du développement. Il faut ajouter les
demandes de correction du moteur, du CSS, des identifiants, des couleurs et
de l'animation. Nombre exact non relevé ; les
commits ne permettent pas de le déduire.

### 6. Mon bilan personnel

Le découpage en étapes m'a permis de tester chaque partie séparément. J'ai
compris qu'un jeu peut fonctionner en apparence tout en ayant encore des
problèmes de synchronisation entre le moteur et l'interface. Les tests et la
vérification dans le navigateur sont donc complémentaires.

## Exercice 3 — Tests et couverture

### 1. Ce que j'ai demandé à Copilot

J'ai demandé à Copilot en mode Ask d'analyser les tests existants et de
signaler les cas manquants. Avec Agent, j'ai demandé cinq tests
supplémentaires pour la grille. J'ai aussi utilisé la complétion pour écrire
trois tests dans `piece.test.js`, puis demandé une correction après un échec.
Enfin, j'ai demandé une correction à partir d'une erreur provoquée dans
`scoring.js`.

### 2. Ce que Copilot a produit

Copilot a ajouté des tests pour les limites de la grille, plusieurs lignes,
les orientations de `T`, les collisions et la couverture des cas limites.
Le nombre de tests est passé de 44 à 49, puis à 52. La couverture des lignes
de `src/core` a atteint 93,79 % au tag `ex3`.

J'ai aussi provoqué une erreur en remplaçant temporairement 500 par 300
points pour trois lignes. Le test a échoué et la valeur correcte a ensuite
été remise dans `scoring.js`.

### 3. Ce que j'ai gardé

J'ai gardé les tests supplémentaires, la commande `npm run coverage` et la
correction du score. Les tests ont de nouveau réussi après la correction.

### 4. Ce que j'ai corrigé ou annulé

Une proposition de test utilisait une grille de mauvaise taille et attendait
une exception alors que le comportement attendu était `false`. Je l'ai
corrigée pour vérifier le bon résultat. Pour le bug du score, la correction a
été faite dans le code et non dans le test.

Les informations conservées ne prouvent pas qu'un test était une tautologie
ou inutile au sens exact de la question. Je ne présente donc pas un test
comme inutile sans cette preuve.

### 5. Le nombre d'itérations

Le minimum vérifiable est de 4 demandes liées à Copilot : analyse Ask,
création des tests de grille, complétion des tests de pièces et correction du
score. Une demande de correction du test de collision est également
documentée. Nombre exact non relevé.

### 6. Mon bilan personnel

Un nombre élevé de tests ne garantit pas leur qualité. Il faut vérifier que
chaque assertion teste réellement le comportement demandé et utiliser la
couverture pour repérer les chemins oubliés. Une erreur volontaire dans le
code est aussi un bon moyen de vérifier qu'un test peut détecter le problème.

## Exercice 4 — Mode versus

### 1. Ce que j'ai demandé à Copilot

J'ai demandé un plan pour ajouter le mode multijoueur, puis les cinq étapes
suivantes :

1. créer `GameInstance` ;
2. créer `GameManager` ;
3. afficher plusieurs parties ;
4. connecter le fonctionnement multijoueur ;
5. valider les modes solo et multijoueur.

### 2. Ce que Copilot a produit

Copilot a créé `GameInstance` et `GameManager`, leurs tests, l'affichage de
une à quatre grilles, le choix du mode et la connexion des commandes. Il a
ajouté l'affichage des scores, niveaux et états de chaque partie.

Les résultats historiques sont passés de 58 tests à 71 tests réussis. La
validation finale indiquait 91,74 % de couverture des instructions.

### 3. Ce que j'ai gardé

J'ai gardé les instances de jeu indépendantes, le mode solo, les modes avec
un à trois adversaires, les quatre grilles et le style multijoueur.

### 4. Ce que j'ai corrigé ou annulé

En mode multijoueur, les boutons étaient masqués. Copilot a corrigé
l'affichage. Je n'ai pas de preuve d'un test échoué pendant le refactoring :
le problème documenté concernait l'interface, pas une assertion de test.

### 5. Le nombre d'itérations

Le minimum vérifiable est de 6 demandes : 1 demande de plan et 5 demandes
Agent correspondant aux étapes. La correction de l'affichage et les
éventuelles relances sont documentées.
Nombre exact non relevé.

### 6. Mon bilan personnel

Le refactoring a permis de séparer une partie de l'état du jeu et de gérer
plusieurs parties sans réécrire les règles du moteur. J'ai aussi compris
qu'un changement d'interface doit être vérifié séparément des tests du cœur.

## Exercice 5 — Joueurs IA

### 1. Ce que j'ai demandé à Copilot

J'ai demandé les sept étapes de l'IA :

1. énumérer les placements légaux ;
2. créer l'IA débutante ;
3. créer l'IA intermédiaire ;
4. créer l'IA experte ;
5. intégrer les trois niveaux au mode multijoueur ;
6. comparer les niveaux par simulation ;
7. valider l'ensemble.

J'ai aussi demandé une expérience séparée pour comparer l'effet des
pondérations de l'IA experte avec les mêmes graines.

### 2. Ce que Copilot a produit

Copilot a créé `ai.js`, les stratégies débutante, intermédiaire et experte,
la classe `AIPlayer`, les tests d'intégration et le test de simulation.
Les tests sont passés historiquement de 77 à 83, 91, 99, 111 puis 112.

Dans la simulation documentée, l'IA experte a obtenu de meilleurs résultats
que l'IA débutante dans le scénario testé. L'expérience sur les pondérations
a donné les résultats suivants : les trous ont eu le plus d'effet, avec une
moyenne passant de 44,33 à 96,33 lignes ; les résultats restent limités à
trois simulations par variante.

### 3. Ce que j'ai gardé

J'ai gardé les trois niveaux, les placements légaux, la classe `AIPlayer`,
les décisions reproductibles et l'intégration au mode multijoueur. J'ai
également gardé les déplacements progressifs : 300 ms pour Débutant, 200 ms
pour Intermédiaire et 100 ms pour Expert.

### 4. Ce que j'ai corrigé ou annulé

Une valeur `-0` a été corrigée dans un test. Une valeur attendue pour
l'irrégularité de l'IA experte a aussi été corrigée. Le délai de simulation a
été augmenté à 60 secondes pour éviter un dépassement pendant la couverture,
sans changer le scénario ni les résultats attendus.

Les simulations utilisent un scénario précis et ne permettent pas de
conclure que l'Expert est toujours meilleur. Les résultats rapportés dans les
documents doivent donc être lus avec cette limite.

### 5. Le nombre d'itérations

Le minimum vérifiable est de 7 demandes Agent, une pour chaque étape.
L'expérience sur les pondérations et les corrections de tests constituent
des demandes supplémentaires. Nombre exact non relevé.

### 6. Mon bilan personnel

J'ai compris qu'une IA ne doit pas tricher en posant directement une pièce
dans la grille. Elle doit utiliser les mêmes règles et les mêmes fonctions
que le joueur. Les simulations sont utiles pour comparer les stratégies,
mais quelques graines ne suffisent pas pour tirer une conclusion générale.

## Exercice 6 — Documentation et revue de code

### 1. Ce que j'ai demandé à Copilot

J'ai demandé à Copilot :

- d'ajouter les JSDoc des fonctions importantes ;
- de créer le `README.md` ;
- de documenter l'architecture avec deux diagrammes Mermaid ;
- de faire une revue du moteur, de l'interface, des tests et de la
  documentation ;
- de corriger la vitesse des adversaires IA ;
- de corriger la validation de la matrice dans `GameInstance.playPlacement()`.

### 2. Ce que Copilot a produit

Copilot a ajouté les JSDoc, le README et `docs/ARCHITECTURE.md`. La revue a
signalé trois points : les adversaires plaçaient trop vite leurs pièces, la
validation de `playPlacement()` était insuffisante et l'animation des lignes
méritait une vérification.

Pour les deux premiers points, Copilot a ajouté `opponent-turn.js`, rendu les
déplacements progressifs et renforcé la validation de `playPlacement()`. Les
tests sont passés à 116 puis 118. Des compléments ultérieurs ont ajouté le
podium et les tests correspondants ; une validation a alors atteint 123,
puis 130 tests.

### 3. Ce que j'ai gardé

J'ai gardé les JSDoc, le README, l'architecture, les trois niveaux d'IA, les
déplacements progressifs, le podium et les tests de validation. Les
dépendances du diagramme ont été vérifiées avec les imports actuels.

### 4. Ce que j'ai corrigé ou annulé

Les corrections des deux problèmes majeurs de la revue sont attribuées à
Copilot dans le journal et l'historique. La remarque sur l'animation n'était
pas confirmée par un test de rendu ou une vérification visuelle dans les
éléments historiques ; je ne la qualifie donc pas de fausse.

Après le tag `ex6`, des corrections techniques ont été réalisées avec Codex,
et non ajoutées rétroactivement au travail initial de Copilot. Elles
concernent notamment la conservation de la position réelle des lignes
supprimées pendant l'animation, un test de redémarrage après une partie
commencée et des compléments JSDoc. La difficulté affichée sous le pseudo
était déjà présente. Ces corrections ultérieures ont été validées par 141
tests ; la couverture a réussi avec un délai adapté à la simulation IA.

### 5. Le nombre d'itérations

Le minimum vérifiable est de 7 demandes : deux demandes pour les JSDoc, puis
une pour le README, une pour l'architecture, une pour la revue et deux pour
les corrections majeures. La finalisation documentaire et les corrections
ultérieures ajoutent des interventions, mais leur nombre exact n'est pas
Nombre exact non relevé.

### 6. Mon bilan personnel

La documentation doit rester liée au code réel. Une revue de code donne des
pistes, mais il faut les confirmer avec le code et les tests avant d'affirmer
qu'un problème existe. J'ai aussi appris à distinguer le travail produit
pendant les exercices avec Copilot des corrections techniques faites ensuite
avec Codex.

## Corrections réalisées après les exercices

Cette partie distingue les corrections réalisées après les tags des résultats
historiques des exercices.

### Travail initial réalisé avec Copilot

Dans l'exercice 6, Copilot a corrigé le fonctionnement des IA : leurs
placements restent légaux et leurs pièces avancent progressivement avec les
fonctions du moteur, au lieu d'être posées directement au bas de la grille.
Les tests ont confirmé ces déplacements et le verrouillage des pièces.

### Corrections ultérieures réalisées avec Codex

Après le tag `ex6`, Codex a renforcé le test de reproductibilité des pièces.
Le test vérifie maintenant la séquence attendue pour la graine `12345` et la
différence avec `54321`. Une mutation temporaire qui ignore la graine et
retourne toujours `0` a montré que l'ancien test pouvait réussir alors que le
test renforcé échoue.

Codex a aussi réalisé des corrections documentaires et techniques, notamment
la vérification de la position réelle des lignes pendant l'animation, un test
de redémarrage après une partie commencée et des compléments JSDoc. La
difficulté de chaque IA sous son pseudo était déjà présente et n'a pas
nécessité de correction.

La suite actuelle a ensuite été validée avec 141 tests réussis. La couverture
a également réussi avec un délai adapté à la simulation IA. Ces vérifications
récentes ne remplacent pas les résultats historiques indiqués dans les six
exercices.

## Bilan général

Les tags `ex1` à `ex6` donnent les jalons du projet, mais ils ne constituent
pas un compteur exact des prompts. Le journal permet de retrouver les
demandes principales, les corrections conservées ou annulées et les résultats
de tests. Pour les compléments réalisés après `ex6`, je distingue les
corrections de Codex des productions historiques de Copilot au lieu de les
confondre.
