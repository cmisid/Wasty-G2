<div>
  <div align="center">
    <img src="https://docs.google.com/drawings/d/1CgBwaB4JOsYyUhqR1e9pPE5AdyEgIksgAIh_EIVtfsg/pub?w=476&h=230" alt="logo"/>
  </div>
  <div align="center">
    <a href="http://standardjs.com/">
      <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard - JavaScript Style Guide" />
    </a>
    <a href="https://www.codacy.com/app/maxhalford25/Wasty-Mobile?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cmisid/Wasty-Mobile&amp;utm_campaign=Badge_Grade">
      <img src="https://api.codacy.com/project/badge/Grade/96233b7009c44dd883680a2498c89f9f" alt="Codacy Badge" />
    </a>
  </div>
<div>

# Application mobile pour le projet Wasty

TODO: parler un peu de React Native

Cette partie du projet a été développée par le groupe 2 dont les membres sont:

- Axel Bellec
- Elise Benois
- Max Halford
- Pierrick Herve
- Antoine Plissoneau
- Raphael Sourty

Des slides qui résument notre partie du projet sont [disponibles en ligne](http://go-talks.appspot.com/github.com/MaxHalford/Presentations/Wasty_G2.slide#1).

## Stack technologique

![javascript_logos](https://docs.google.com/drawings/d/19nFuyK9FeESsOJcBfC2v4bsIxag4hO45wg0Y-facv_o/pub?w=1345&h=356)

## Installation

Facebook propose de la [documentation](https://facebook.github.io/react-native/docs/getting-started.html#content) pour installer React Native sur Windows|Mac|Linux pour Android|iOS. Il faut ensuite faire un `react-native link` dans la console pour opérer un peu de magie et lier des dépendances au projet.

## Développement

- Notre code suit strictement les recommandations faites dans le [Javascript Standard Style (JSS)](http://standardjs.com/). Des linters sont disponibles sous forme de plugins pour les éditeurs de texte populaires, ils sont indiqués sur la page [GitHub du JSS](https://github.com/feross/standard).
- Nous utilisons [Reactotron](https://github.com/reactotron/reactotron) pour débugger.

## Architecture

### Flux des données

![data_flow](https://docs.google.com/drawings/d/13qPJ2f1Bn1BwYTsF3SR8ffvIodEDA8hSHTIiT7FvzJY/pub?w=1271&h=907)


### Page "Recherche"

L'utilisateur est dirigé vers la page "Recherche" lorsqu'il se connecte sur l'application. 
Cette page a pour objectif de mettre en relation ceux qui proposent des objets et ceux qui en recherchent.
L'application mobile pour le projet wasty propose différents outils pour effectuer une recherche : recherche à partir de catégories, recherche cartographique.

La fonctionnalité de recherche de la page "Recherche" se distingue grâce à un système de catégorisation. Nous avons mis en place un moteur de recherche sur le modèle du réseau social "Pinterest".
Les catégories sont représentées sous forme de blocs. Ces blocs caractérisent les différentes catégories (verre, chaise, habits...).
Lorsque l'utilisateur clique sur un bloc, la page de recherche s'adapte en fonction des critères de l'utilisateurs. 
 
Idéalement nous aimerions que 6 catégories soient affichées dans la barre de recherche et que celles-ci évoluent en fonction de l'utilisateur à partir d'un algorithme de Machine Learning. 

Nous avons choisi de laisser une surface importante aux photos des objets pour que les utilisateurs puissent rapidement identifier les objets auxquels ils offriront une seconde vie.

Nous avons imaginé une solution pour que ceux qui cherchent des objets puissent distinguer rapidement les objets payants de ceux qui sont gratuits. 
Les articles proposés à la vente sont notifiés avec un bandeau jaune. Les articles gratuits sont notifiés avec un bandeau vert. 

Lorsque l'utilisateur trouve l'article qui lui correspond, celui-ci peut faire un mouvement de Scroll-Left pour ajouter l'objet à la page "Ma liste". 
La page "Ma liste" rassemble tous les articles likés par l'utilisateur et dédiée au calcul de l'itinéraire optimisé pour récupérer un ensemble d'objets sélectionnés par l'utilisateur. 

La page "Recherche" rassemble les objets proposés par l'application "WASTY". Par défaut, l'application affiche 20 objets. 
Avec un Scroll-Down l'utilisateur à accès à un bouton pour afficher les 20 résultats suivants.

La page "Recherche" propose une fonctionnalité pour que l'utilisateur puisse ajouter une annonce. Cette fonctionnalité est matérialisée par un bouton en forme d'appareil photo en bas à droite de la page "Recherche".
Après avoir cliqué sur le bouton « Poster une annonce », l'utilisateur est redirigé vers la page "Ajouter un objet".


#### Visuel

#### IO

![recherche_io](https://docs.google.com/drawings/d/1BgCKhWAEdvcfh4jvmrewnz3txm5sF6JIpx3ttUdY-Kw/pub?w=1231&h=730)


### Page "Ajouter un objet"

#### Visuel

#### IO

![object_io](https://docs.google.com/drawings/d/12paEYAcop-IIRlovjBoLd5DwXzR7_oapUxM5KrYG7LU/pub?w=1231&h=730)


### Page "Ma liste"

#### Visuel

#### IO

![ma_liste_io](https://docs.google.com/drawings/d/1GPD75YXcqzY87XyAkCV9cKvnH_cYpnr9CNYWpk9r3wQ/pub?w=1231&h=730)


### Page "Mes posts"

#### Visuel

#### IO

![mes_posts_io](https://docs.google.com/drawings/d/1RwLdYVbrlV9Aph2yUS4km2A-7rpBn_weJtKunOhepHw/pub?w=1231&h=730)


### Page "Carte"

#### Visuel

#### IO

![carte_io](https://docs.google.com/drawings/d/1i5ekxlFHwRzJxhmbda3KiXIpgT9U2r_is33S8imLNoc/pub?w=1231&h=730)


### Page "Compte"

#### Visuel

#### IO

![compte_io](https://docs.google.com/drawings/d/1QFZ84Wk0A3_0i7g456LY0b6fzSq_I7F8GdIDYVR5HnI/pub?w=1231&h=730)




