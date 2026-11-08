# TP4 — Réponses aux questions

## Exercice 1 — Prise en main de GitHub Copilot

### Question A — Les sept matrices de l'étape 1 étaient-elles toutes justes ? Laquelle ne l'était pas ? Qu'est-ce que cela dit de la complétion sur un sujet « connu » ?

Dans mon cas, les sept matrices générées par GitHub Copilot étaient correctes. J'ai vérifié les formes I, O, T, S, Z, J et L dans le fichier `piece.js`. J'ai également demandé à Copilot de les analyser avec le mode Ask, et il n'a pas trouvé d'erreur.

Cela montre que la complétion automatique peut être efficace sur un sujet connu comme les pièces du Tetris. Mais même si le résultat semble correct, il faut toujours vérifier le code généré, car Copilot peut aussi faire des erreurs.

### Question B — Combien de crédits ont coûté les étapes 6 et 7 ? Et les étapes 1 à 3 ?

Les étapes 1 et 2 ont été réalisées avec la complétion automatique de Copilot. L'étape 3 a utilisé le chat en ligne avec `Ctrl + I`.

Pour les étapes 6 et 7, j'ai utilisé le mode Agent. Il a créé et exécuté les tests, puis renommé la fonction `rotate` en `tourner` dans plusieurs fichiers.

Le mode Agent effectue davantage d'opérations et peut consommer plus de requêtes premium que la simple complétion automatique.

**Consommation réelle des étapes 6 et 7 :** à compléter après consultation des statistiques Copilot.

**Consommation réelle des étapes 1 à 3 :** à compléter après consultation des statistiques Copilot.

Les statistiques globales ne permettent pas toujours de retrouver précisément le coût de chaque étape. Si les valeurs ne sont pas disponibles, je le préciserai plutôt que de donner des chiffres approximatifs.

### Question C — Quel outil choisir pour chaque besoin ?

**1. Compléter une ligne :** j'utiliserais la complétion automatique de Copilot avec `Tab`, car elle permet d'obtenir rapidement une proposition directement dans le code.

**2. Modifier une fonction :** j'utiliserais le chat en ligne avec `Ctrl + I`, car il permet de sélectionner une fonction et de demander une modification précise.

**3. Comprendre un fichier :** j'utiliserais le mode Ask en ajoutant le fichier au contexte, pour obtenir des explications sans modifier le code.

**4. Ajouter une fonctionnalité sur trois fichiers :** j'utiliserais le mode Agent, après avoir préparé un plan, car il peut travailler sur plusieurs fichiers et mettre à jour leurs références.

**5. Faire passer un test qui échoue :** j'utiliserais le mode Agent pour analyser l'erreur, rechercher sa cause, corriger le code et relancer les tests. Je vérifierais ensuite les modifications pour m'assurer que l'Agent n'a pas simplement changé le test pour le faire réussir.

## Exercice 2 — Développement du Tetris avec Copilot Agent

### Question 1 — Quelles itérations ont été nécessaires ?

J'ai commencé par demander à Copilot de préparer un plan à partir de la spécification. Sa première proposition ne respectait pas tous les noms de fichiers demandés et oubliait `grid.js`. Je lui ai demandé de corriger son plan, puis j'ai validé la deuxième proposition.

Ensuite, j'ai développé le jeu en cinq étapes. Pendant l'étape du moteur, Copilot a dû corriger certains tests qui ne passaient pas.

Pour l'interface, j'ai choisi un design arcade néon. J'ai aussi demandé à Copilot d'ajouter des identifiants aux boutons.

Enfin, pendant la dernière étape, j'ai demandé une correction pour mieux gérer les couleurs des pièces verrouillées et l'animation des lignes supprimées. Copilot a fait plusieurs modifications avant d'obtenir 44 tests réussis.

### Question 2 — Copilot a-t-il respecté toutes les instructions ?

Pas complètement dès le début. Dans sa première proposition de plan, Copilot avait utilisé des noms de fichiers différents de ceux demandés et avait oublié `grid.js`.

J'ai donc dû lui rappeler les contraintes du TP.

Pendant le développement, j'ai également demandé des corrections pour améliorer le fonctionnement du jeu. Copilot a ensuite respecté l'architecture prévue, sans modifier inutilement le moteur.

### Question 3 — Pourquoi travailler en plusieurs étapes plutôt qu'avec un seul grand prompt ?

Je trouve que travailler en plusieurs étapes est plus pratique, car je peux vérifier le résultat après chaque modification.

Par exemple, j'ai d'abord vérifié la grille, puis le score, le moteur, l'interface et enfin les commandes.

Si j'avais demandé tout le jeu en une seule fois, il aurait été plus difficile de comprendre les erreurs et de savoir quelle partie corriger.

Cette méthode m'a aussi permis de faire des tests et des commits régulièrement.

## Exercice 3 — Tests et couverture

### 1. Comment les tests ont-ils été réalisés ?

J'ai d'abord utilisé Copilot Agent pour compléter les tests de la grille et du score. Ensuite, j'ai utilisé la complétion automatique de Copilot pour écrire moi-même trois tests : les quatre orientations de la pièce T, une collision contre un bord et une collision avec une pièce déjà posée.

Copilot m'a proposé un test incorrect pour la collision contre le bord. J'ai dû corriger la taille de la grille et remplacer `toThrow()` par `toBe(false)`.

### 2. Quel résultat ai-je obtenu pour les tests et la couverture ?

J'ai obtenu 52 tests réussis sur 52. Avec `npm run coverage`, j'ai obtenu 93,79 % de couverture des lignes dans `src/core`, ce qui dépasse les 80 % demandés.

### 3. Comment Copilot a-t-il corrigé le bug volontaire ?

J'ai modifié `scoring.js` pour que trois lignes supprimées rapportent 300 points au lieu de 500. Après avoir lancé les tests, un test a échoué.

J'ai transmis cette erreur à Copilot Agent. Il a retrouvé la mauvaise valeur et l'a corrigée dans `scoring.js`, sans modifier les tests. Après sa correction, les 52 tests ont réussi.
## Exercice 4 — Mode versus

### Question A — Quelles fonctions le refactoring a-t-il déplacées ou renommées ? Un test a-t-il échoué pendant l'opération ? Lequel, et qu'a fait l'agent ?

Pour ajouter le multijoueur, nous avons créé les classes `GameInstance` et `GameManager`.

`GameInstance` permet de gérer une partie avec sa propre grille, sa pièce courante et son score. `GameManager` permet de gérer plusieurs parties en même temps et de déterminer le gagnant.

Nous avons aussi adapté `main.js` pour gérer le choix du mode solo ou multijoueur.

Après les différentes étapes, les tests étaient tous réussis. Ils sont passés de 52 à 71 tests. Cela nous a permis de vérifier que le mode solo fonctionnait toujours.

*À compléter avec le journal si un test a échoué pendant une étape intermédiaire, car le bilan final ne permet pas de le savoir.*

### Question B — Comparer `git diff ex3 ex4 --stat` avec ce que vous auriez modifié à la main : l'agent a-t-il touché des fichiers inutiles ?

Pour passer du mode solo au multijoueur, Copilot Agent a modifié 10 fichiers, avec 929 lignes ajoutées et 81 lignes supprimées.

Il a principalement modifié `main.js`, `renderer.js`, `styles.css` et créé les classes `GameInstance` et `GameManager`, ainsi que leurs tests.

À la main, j'aurais aussi dû modifier ces fichiers pour gérer plusieurs parties et afficher plusieurs grilles.

Les modifications me semblent utiles pour ajouter le multijoueur. Je n'ai pas identifié de fichier clairement inutile parmi ceux modifiés.

## Exercice 5 — Joueurs IA

### Question A — Pourquoi exiger que l'IA joue avec les mêmes fonctions que l'humain plutôt que de poser directement la pièce dans la grille ?

L'IA doit respecter les mêmes règles que le joueur humain pour que le jeu soit équitable.

Si elle plaçait directement les pièces dans la grille, elle pourrait éviter certaines règles, comme les collisions ou le verrouillage.

En utilisant les fonctions du moteur, on s'assure que les trois niveaux d'IA respectent les règles du Tetris.

Cela permet aussi de réutiliser le code existant et de faciliter les tests.

### Question B — Faire varier une pondération de l'expert avec la simulation : laquelle a le plus d'effet ? L'agent a-t-il proposé cette expérience de lui-même ?

J'ai demandé à Copilot Agent de comparer les pondérations de l'IA experte en augmentant chaque coefficient de 25 %, un par un.

Nous avons utilisé les mêmes trois graines pour comparer les résultats.

La pondération des trous a eu le plus d'effet. En augmentant son importance, la moyenne est passée de 44,33 à 96,33 lignes complétées, soit 52 lignes supplémentaires.

La hauteur a fait diminuer la moyenne à 33,33 lignes, tandis que l'irrégularité l'a augmentée à 64,67 lignes. Le coefficient des lignes complétées n'a pas changé le résultat.

L'agent n'avait pas proposé cette expérience de lui-même. Je lui ai demandé de la réaliser.

Ces résultats restent limités à trois simulations par variante, donc ils ne permettent pas de conclure que ce coefficient est toujours le meilleur.
---

## Exercice 6 — Documentation et revue


### Question A — Trouver une JSDoc inexacte et la corriger

J'ai demandé à Copilot de vérifier les commentaires JSDoc des fonctions de `src/core`.

Il a trouvé une JSDoc incomplète dans la méthode `GameInstance.playPlacement()`.

Le commentaire ne précisait pas que la méthode ne fait rien lorsque la partie est déjà terminée. Il n'expliquait pas non plus clairement que la position et l'orientation de la pièce sont modifiées avant son verrouillage.

Copilot a corrigé le commentaire pour expliquer ces comportements.

Seule la documentation a été modifiée, sans changer le code du jeu ni les tests.

### Question B — Le diagramme de classes montre-t-il une dépendance qui n'existe pas dans le code, ou en oublie-t-il une ? Vérifier avec les imports des fichiers.

Notre projet sépare la logique du jeu dans `src/core`, l'interface dans `src/ui` et le démarrage dans `main.js`.

Nous avons créé le document `docs/ARCHITECTURE.md` pour expliquer les relations entre ces modules.

Après la correction de la vitesse des IA, nous avons mis à jour ce document pour représenter le nouveau fonctionnement avec `advanceOpponentTurn` et `GameInstance.tick()`.

Les diagrammes ont été vérifiés au niveau de leur structure, mais nous n'avons pas encore comparé systématiquement toutes leurs dépendances avec les instructions `import` du code.

*Il reste à faire cette comparaison pour répondre précisément à la question.*

### Question C — Parmi les remarques de la revue, laquelle était fausse ? Comment l'avez-vous établi ?

Pendant la revue, Copilot a identifié deux problèmes majeurs :

1. Les adversaires IA jouaient beaucoup plus vite que le joueur humain.
2. La méthode `playPlacement()` acceptait une matrice qui ne correspondait pas à la pièce active.

Nous avons corrigé ces deux problèmes et ajouté des tests. Après les corrections, les 118 tests ont réussi.

Copilot a aussi signalé un problème mineur concernant la position de l'animation des lignes supprimées.

Nous n'avons pas démontré qu'une des remarques était fausse. Il serait donc incorrect d'en inventer une.

*Pour répondre complètement, il faut vérifier une remarque de la revue et montrer, avec le code ou un test, pourquoi elle est fausse.*