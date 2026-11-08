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