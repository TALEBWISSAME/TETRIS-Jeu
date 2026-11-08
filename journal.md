
# Journal de travail — TP4 Tetris

## Exercice 1 — Prise en main de GitHub Copilot


### Étape 1 — Complétion des sept tétrominos
- Outil utilisé : Complétion automatique GitHub Copilot (Tab).
- Demande effectuée : J'ai écrit le commentaire décrivant les sept tétrominos et commencé l'objet PIECES.
- Résultat obtenu : Copilot a proposé les matrices des sept pièces I, O, T, S, Z, J et L.
- Modifications acceptées ou corrigées : Les sept matrices sont correctes. Aucune correction de forme nécessaire.
- Nombre d'itérations : À compléter selon le nombre réel de propositions acceptées ou corrigées.



### Étape 2 — Fonction rotate
- Outil utilisé : Complétion automatique GitHub Copilot (Tab).
- Demande effectuée : J'ai écrit la documentation et la signature de rotate(matrix), puis laissé Copilot compléter la fonction.
- Résultat obtenu : La fonction effectue correctement une rotation horaire. Le test sur [[1,2],[3,4]] renvoie [[3,1],[4,2]].
- Modifications acceptées ou corrigées : Une erreur de syntaxe est apparue car le fichier n'était pas enregistré. Après Ctrl+S, le test a réussi.
- Nombre d'itérations : 1 génération, puis 1 nouvelle exécution du test après enregistrement.


### Étape 3 — Modification avec Ctrl+I
- Outil utilisé : Chat en ligne (Ctrl+I).
- Demande effectuée : Lever une erreur si la matrice n'est pas carrée.
- Résultat obtenu : Copilot a ajouté une vérification des dimensions avant la rotation.
- Modifications acceptées ou corrigées : J'ai vérifié le diff et accepté la modification. Le test avec une matrice 2x3 affiche "La matrice doit être carrée."
- Nombre d'itérations : 1.


### Étape 4 — Analyse avec Ask et contexte
- Outil utilisé : Chat Copilot avec contexte du fichier.
- Demande effectuée : Expliquer l'orientation des matrices et identifier une éventuelle pièce incorrecte.
- Résultat obtenu : Copilot a expliqué la signification des 0 et des 1, l'orientation initiale et le fonctionnement de rotate.
- Modifications acceptées ou corrigées : Aucune modification du code. Après vérification, les sept matrices étaient correctes.
- Observation : Copilot a consulté piece.js et journal.md pour répondre.
- Nombre d'itérations : 1.



### Étape 5 — Initialisation npm et installation de Vitest
- Outil utilisé : Chat en ligne dans le terminal (Ctrl+I).
- Demande effectuée : Initialiser npm et installer Vitest comme dépendance de développement.
- Résultat obtenu : Copilot a proposé une commande PowerShell qui a créé package.json et installé Vitest (35 packages, 0 vulnérabilité signalée).
- Modifications acceptées ou corrigées : J'ai exécuté la commande proposée, puis ajouté manuellement "type": "module" et le script "test": "vitest run".
- Nombre d'itérations : 1.


### Étape 6 — Création des tests avec Agent
- Outil utilisé : GitHub Copilot, mode Agent.
- Demande effectuée : Créer trois tests Vitest pour rotate (2x2, 3x3 et matrice non carrée), puis lancer npm test.
- Résultat obtenu : Copilot a créé tests/piece.test.js. Les trois tests ont réussi.
- Modifications acceptées ou corrigées : J'ai relu les trois tests. Ils vérifient correctement les résultats attendus. Aucun autre fichier n'a été modifié.
- Nombre d'itérations : 1.


### Étape 7 — Renommage et restauration du checkpoint
- Outil utilisé : GitHub Copilot, mode Agent et Restore checkpoint.
- Demande effectuée : Renommer rotate en tourner dans tout le projet.
- Résultat obtenu : Copilot a renommé la fonction et actualisé ses références. Les 3 tests ont réussi.
- Modifications acceptées ou corrigées : J'ai utilisé Restore checkpoint pour annuler le renommage et retrouver la fonction rotate.
- Nombre d'itérations : 1.
- Observation : Le checkpoint permet d'annuler les changements d'une intervention de l'Agent sans recommencer tout le travail.


## Exercice 2 — Préparation du plan

J'ai utilisé le mode Plan/Ask de GitHub Copilot pour préparer le développement du Tetris à partir de SPEC.md. La première proposition contenait des noms de fichiers différents de ceux demandés dans le TP et oubliait grid.js. J'ai donc demandé à Copilot de corriger son plan. La deuxième proposition respecte l'architecture et contient cinq étapes. Je l'ai validée et enregistrée dans docs/PLAN.md.

Nombre d'itérations : 2 propositions.

### Exercice 2 — Étape 1 : Grille et pièces

J'ai utilisé le mode Agent de GitHub Copilot pour réaliser la première étape du plan. Je lui ai demandé de créer la grille du Tetris et ses tests, sans modifier les fichiers de l'exercice 1.

Copilot a créé src/core/grid.js et tests/grid.test.js. Il a ajouté les fonctions nécessaires pour créer la grille, vérifier les placements, verrouiller les pièces et supprimer les lignes complètes.

L'Agent a exécuté npm test : les 8 tests sont passés dans 2 fichiers.

Nombre d'itérations : 1 demande, sans correction supplémentaire pour le moment.

### Exercice 2 — Étape 2 : Score et niveaux

J'ai utilisé le mode Agent de GitHub Copilot pour réaliser la deuxième étape du plan. Je lui ai demandé de créer les fonctions de calcul du score et du niveau ainsi que leurs tests.

Copilot a créé src/core/scoring.js et tests/scoring.test.js. Le score dépend du nombre de lignes supprimées en une seule fois : 100, 300, 500 ou 800 points. Le niveau commence à 1 et augmente toutes les 10 lignes supprimées.

J'ai vérifié le code et les cas de test proposés, notamment les valeurs invalides et les changements de niveau.

Nombre d'itérations : 1 demande, sans correction supplémentaire.

### Exercice 2 — Étape 3 : Moteur du jeu

J'ai utilisé le mode Agent de GitHub Copilot pour développer le moteur du Tetris. Je lui ai demandé de gérer les déplacements, les rotations, les collisions, la descente des pièces, le score, les niveaux et la fin de partie.

Copilot a créé src/core/game.js et tests/game.test.js, en réutilisant les fichiers déjà développés.

Lors du premier lancement des tests, trois problèmes ont été détectés dans les scénarios de test. Copilot a corrigé les tests et relancé plusieurs fois npm test avant d'obtenir un résultat correct.

Au final, les 40 tests sont passés dans 4 fichiers. Aucun fichier existant n'a été modifié.

Nombre d'itérations : plusieurs corrections et relances des tests ont été nécessaires.
### Exercice 2 — Étape 4 : Interface graphique

J'ai utilisé le mode Agent de GitHub Copilot pour créer l'interface graphique du Tetris. J'ai choisi un style arcade néon avec un fond sombre, des couleurs lumineuses et une interface responsive.

Copilot a créé trois fichiers : src/ui/renderer.js, index.html et styles.css.

Pendant le développement, Copilot a rencontré une erreur lors d'une modification du CSS. Il a relu le fichier et effectué une nouvelle modification.

Les 40 tests existants sont passés. Les boutons et les commandes ne sont pas encore fonctionnels, car ils seront reliés au moteur à l'étape 5.

J'ai également remarqué que les pièces verrouillées ont toutes la même couleur. Ce point devra être corrigé pour respecter la spécification.

Nombre d'itérations : une correction du CSS après une erreur d'application.
Après avoir vérifié les fichiers créés, j'ai demandé à Copilot d'ajouter des identifiants aux trois boutons pour faciliter leur utilisation à l'étape suivante. Copilot a modifié uniquement `index.html`, sans brancher les boutons.

J'ai conservé cette modification. Les 40 tests annoncés précédemment étaient réussis. Je testerai l'interface complète lorsque le jeu sera fonctionnel.

### Exercice 2 — Étape 5 : Jeu fonctionnel

J'ai utilisé GitHub Copilot en mode Agent pour rendre mon Tetris jouable. Copilot a créé `main.js` et `src/ui/input.js` pour relier le moteur à l'interface.

J'ai ensuite demandé une correction pour mieux gérer les couleurs des pièces verrouillées et l'animation de suppression des lignes. Copilot a ajouté `src/ui/locked-colors.js` et des tests. Plusieurs essais ont été nécessaires avant que tous les tests passent.

Résultat : 44 tests réussis. J'ai également testé le jeu dans mon navigateur. Les déplacements, la rotation et la suppression des lignes fonctionnent, et le score augmente.

J'ai conservé les modifications après ces vérifications.

### Exercice 3 — Complément des tests

J'ai d'abord utilisé Copilot en mode Ask pour analyser les tests existants. Il a repéré des cas manquants, notamment pour les limites de la grille et la suppression de plusieurs lignes.

J'ai ensuite utilisé le mode Agent pour compléter les tests. Copilot a ajouté cinq tests dans `grid.test.js`, sans modifier le moteur. Les 49 tests passent.

### Exercice 3 — Tests et couverture

J'ai commencé par utiliser Copilot en mode Ask pour vérifier les tests déjà présents et repérer ceux qui manquaient.

Ensuite, avec le mode Agent, j'ai complété les tests de la grille. Copilot a ajouté 5 tests et nous sommes passés de 44 à 49 tests réussis.

J'ai ensuite utilisé la complétion automatique de Copilot dans `piece.test.js` pour écrire trois tests : les quatre orientations de T, une collision contre le bord droit et une collision avec une case déjà occupée. J'ai dû corriger une proposition de Copilot qui utilisait une grille de mauvaise taille et attendait une exception au lieu de `false`.

Après ces modifications, les 52 tests passaient.

J'ai installé `@vitest/coverage-v8` et ajouté la commande `npm run coverage`. J'ai obtenu 93,79 % de couverture des lignes pour `src/core`, ce qui dépasse les 80 % demandés.

Enfin, j'ai volontairement modifié `scoring.js` pour donner 300 points au lieu de 500 lorsque trois lignes sont supprimées. Un test a échoué. J'ai demandé à Copilot Agent de corriger le code à partir de l'erreur du terminal. Il a remis la bonne valeur dans `scoring.js` sans modifier les tests.

Après la correction, les 52 tests ont de nouveau réussi.

### Exercice 4 — Étape 1 : GameInstance

J'ai commencé par demander à Copilot en mode Ask de proposer un plan pour le mode multijoueur. Il a proposé cinq étapes, que j'ai validées.

Ensuite, j'ai utilisé Copilot Agent pour créer `game-instance.js` et `game-instance.test.js`.

Copilot a réutilisé le moteur existant pour représenter une partie indépendante, avec son propre état et son générateur aléatoire.

Il a ajouté 6 tests pour vérifier l'indépendance des parties et la compatibilité avec le mode solo.

Résultat : 58 tests réussis sur 58. Aucun autre fichier n'a été modifié.