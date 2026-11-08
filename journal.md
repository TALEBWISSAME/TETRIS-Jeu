
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
