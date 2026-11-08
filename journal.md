
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