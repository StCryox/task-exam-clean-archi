# ADR 

## Architecture
- Functionnal Core (dossier : core) & Imperative Shell (index.ts) => Pas beaucoup de features, logique mêtier quasiment absente (CRUD) et fonctions plus facilement testable.
- Séparation Core et Infrastructure afin de séparer le domaine métier et les dépendances techniques.
- Abstraction des effets de bord via le système de typage.
    - Ex: src/core/services.ts
- Injection de dépendances via application partielle
    - Ex: src/core/usecases.ts


## Librairie Externe
- Commander : Le CLI étant un détail d'implémentation, nous n'avons pas tenu à réimplémenter un système de ligne de commande.
- Figlet : Pour avoir un meilleur rendu esthétique dans la CLI .
- UUID : Afin de générer des identifiants uniques pour les tâches.
