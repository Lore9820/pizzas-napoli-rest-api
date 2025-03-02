# 🍕 Pizzas Napoli 🇮🇹 REST API 🍕

## TP completé par
Lore Goethals

## Fonctionnalités réalisées
Concevoir et mettre en place la base de données relationnelle SQLite, connection à la base de données afin de faire des requêtes,
routes vers les endpoints pizzas et orders,
fonctionnalités GET et POST pour pizzas,
fonctionnalités GET pour orders (et partiellement POST qui ne marche pas encore)

## Fonctionnalités manquantes
Autres fonctionnalités CRUD,
fonctionnalité POST pour orders pas fini

## Difficultés rencontrés
Perdu dans la nouvelle version alors retrourné vers l'ancienne,
POST pour orders doit inclure les orderlines


__API REST__ proposant des fonctionnalités basiques de type CRUD, développée avec __Hono__, __Bun__ et __TypeScript__.

## Commandes utiles

- Installation des dépendances NPM :

$ `bun install`

- Démarrage de l'API :

$ `bun run dev`

- Création des tables dans la base de données SQLite :
$ `bun run db:createSchema`

- Remplissage des tables dans la base de données SQLite :
$ `bun run db:seedData`

Adresse locale de l'API : <http://localhost:3000>


![Pizza](./assets/pizza.png)

--

!["Logotype Shrp"](https://sherpa.one/images/sherpa-logotype.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
