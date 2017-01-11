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
La page "Ma liste" rassemble tous les articles likés par l'utilisateur et est dédiée au calcul de l'itinéraire optimisé pour récupérer un ensemble d'objets sélectionnés par l'utilisateur. 

La page "Recherche" rassemble les objets proposés par l'application "WASTY". Par défaut, l'application affiche 20 objets. 
Avec un Scroll-Down l'utilisateur à accès à un bouton pour afficher les 20 résultats suivants.

La page "Recherche" propose une fonctionnalité pour que l'utilisateur puisse ajouter une annonce. Cette fonctionnalité est matérialisée par un bouton en forme d'appareil photo en bas à droite de la page "Recherche".
Après avoir cliqué sur le bouton « Poster une annonce », l'utilisateur est redirigé vers la page "Ajouter un objet".


#### Visuel

#### IO

![recherche_io](https://docs.google.com/drawings/d/1BgCKhWAEdvcfh4jvmrewnz3txm5sF6JIpx3ttUdY-Kw/pub?w=1231&h=730)


### Page "Ajouter un objet"

La page "Ajouter un objet" est accessible depuis le bouton matérialisé sous forme d'appareil de photographie sur la page "Recherche".
L'application est visuelle. Il est indispensable d'inciter les utilisateurs à associer leurs publications à des photos.
Il est nécessaire de disposer d'une photo de l'article pour le proposer à la vente. 


L'application propose deux solutions pour associer une image à l'article :


- Prendre en photo l'article 
- Parcourir le répertoire des images du téléphone si l'utilisateur a déjà pris l'article en photo

Grâce au service de reconnaissance d'image intégré dans l'application, la catégorie est renseignée automatiquement.
Les chances que ces articles aient une seconde vie est plus importante car ils seront référencés de manière pertinente dans la page "Recherche".
L'utilisateur renseigne le titre de la publication, la description de l'objet et précise ses horaires de disponibilités.
Nous avons mis en place un outil pratique sous forme d'horloge pour que l'utilisateur puisse renseigner les créneaux de disponibilités pour la transaction.

#### Visuel

#### IO

![object_io](https://docs.google.com/drawings/d/12paEYAcop-IIRlovjBoLd5DwXzR7_oapUxM5KrYG7LU/pub?w=1231&h=730)


### Page "Ma liste"

La page "MaListe" permet à l'utilisateur de visualiser une description concise de tous les objets qu'il a "liké". Il peut consulter leur description détaillée. De plus il peut les "dis-liker", c'est à dire les supprimer de la liste en les déplaçant vers la gauche puis en cliquant sur le bouton supprimer.

Cette page permet à l'utilisateur de stocker et consulter ses annonces préférés.

La dernière fonctionnalité, et la plus importante, présente sur cette page, c'est la possibilité pour l'utilisateur d'obtenir un trajet optimisé de récupération de ses objets en cliquant sur un bouton. Il sera ainsi amené à Google Maps et n'aura plus qu'à suivre le trajet proposé pour récupérer tous ses objets.

#### Visuel

#### IO

![ma_liste_io](https://docs.google.com/drawings/d/1GPD75YXcqzY87XyAkCV9cKvnH_cYpnr9CNYWpk9r3wQ/pub?w=1231&h=730)


### Page "Mes posts"

La page "Mes postes" permet à l'utilisateur de consulter et gérer les objets qu'il a postés. Il peut choisir de les supprimer.

Si un utilisateur dit avoir récupérer un de ses objets, un filtre orange et une icone "?" s'affichera sur l'objet incitant l'utilisateur a cliquer sur l'objet. Lorsqu'il sélectionne l'objet une fenêtre modale s'ouvre pour qu'il puisse confirmer si oui ou non l'objet a été récupéré.

Les objets peuvent avoir plusieurs statuts : PENDING, PICKEDUP, FINISHED, EXPIRED. Ils correspondent à : a été posté, dit avoir été récupéré, confirme avoir été récupéré, et expiré (si l'objet est présent sur l'applicatiojn depuis trop longtemps). L'affichage d'un objet dépend donc de son statut.
Les objets expirés ne seront pas affichés.

A la fin de la page, l'utilisateur peut cliquer sur un bouton pour afficher plus d'objets.


#### Visuel

#### IO

![mes_posts_io](https://docs.google.com/drawings/d/1RwLdYVbrlV9Aph2yUS4km2A-7rpBn_weJtKunOhepHw/pub?w=1231&h=730)


### Page "Carte"

La page Carte notifie les articles disponibles à proximité de la position de l'utilisateur.
En effet, l'application Wasty géolocalise l'utilisateur pour lui proposer un service adapté. 
La distance est un critère décisif pour sélectionner un article. 
La carte permet à l'utilisateur de visualiser les articles présents dans son périmètre de prédilection.

S'il clique sur l'un de ces marqueurs, l'écran se scinde en deux parties et l'utilisateur accède à une description détaillée de l'article sélectionné.

La charte graphique de la description des objets est similaire à celle de la page "Recherche", "Mes Posts" et "Ma Liste".
Les articles proposés à la vente sont notifiés avec un bandeau jaune. Les articles gratuits sont notifiés avec un bandeau vert. 

Lorsque l'utilisateur trouve l'article qui lui correspond, celui-ci peut faire un mouvement de Scroll-Left pour ajouter l'objet à la page "Ma liste". 
La page "Ma liste" rassemble tous les articles likés par l'utilisateur et est dédiée au calcul de l'itinéraire optimisé pour récupérer un ensemble d'objets sélectionnés par l'utilisateur. 
 

#### Visuel

#### IO

![carte_io](https://docs.google.com/drawings/d/1i5ekxlFHwRzJxhmbda3KiXIpgT9U2r_is33S8imLNoc/pub?w=1231&h=730)


### Page "Compte"

La page "Compte" affiche en premier lieu des informations de base concernant l'utilisateur, ainsi qu'un historique de ses transactions : quels objets il a posté et quels objets il a récupéré. Elle comporte un bouton permettant d'afficher plus de contenu. Il peut choisir une ligne de l'historique pour accéder à la description détaillée de l'objet en question.

Mais la principale raison d'exister de cette page est de permettre à l'utilisateur de modifier ses informations : nom, prénom, adresse e-mail, mot de passe. C'est en cliquant sur le bouton en bas de page qu'il accède au menu contextuel permettant de modifier ses informations.

Lorsqu'il renseigne son mot de passe il doit le confirmer en l'écrivant deux fois, et lorsqu'il renseigne son adresse e-mail le changement ne sera effectif que lorsqu'il l'aura confirmer en cliquant sur le lien dans le mail de confirmation que nous lui enverrons.

#### Visuel

#### IO

![compte_io](https://docs.google.com/drawings/d/1QFZ84Wk0A3_0i7g456LY0b6fzSq_I7F8GdIDYVR5HnI/pub?w=1231&h=730)


### Pourquoi avoir choisi React Native ?

#### Multi-plateforme

L'application fonctionne sous Android, IOS ainsi que WindowsPhone, c'est donc un langage 3 en 1. Une autre solution aurait été de développer en Android et en Swift, ici on se contente d'un seul langage : le React Native.

#### Agile

L'application peut être testée très facilement et simplement à l'aide d'un émulateur de téléphone et sans recompiler l'application à chaque modifs. Il nous suffit d'enregistrer le fichier contenant notre code puis de Reload l'émulateur pour voir apparaitre nos changements.

#### Créée par Facebook

Le react native est un langage jeune (moins de 2 ans ?), la communauté est donc peu nombreuse ce qui peut poser problème. Néanmoins, ce langage a été développé par une entreprise importante qu'est Facebook c'est donc un gage qualité qui compense sa jeunesse.




### Organisation du travail

#### Hiérarchie Horizontale

Le chef de groupe n'affecte pas le travail aux différents membres mais il alimente un tableau Kanban avec des issues triées par priorité. Puis les membres du groupe s'affecte aux tâches qu'ils souhaitent traiter en fonction de leur capacités.


#### Planning Initial et Final

Nous avons suivi un planning en ce qui concerne les grandes lignes du développement :
- création des visuels
- affichage de données factices
- interaction avec la BD

Nous avons organisé des réunions chaque fin de journée, en nous basant sur la Kanban, pour faire le point sur l'avancement et le mettre à jour avec de nouvelles issues.

Nous avons essayé le plus possible, concernant les explications concrètes, d'apprendre au même rythme. Lors d'une explication importante nous arretions de travailler pour tous écouter l'explication.



#### Les Outils

##### Balsamiq

Un outil de maquettage orienté production. Il permet de créer des démonstrations interactives.
Il nous a servit a créer un premier visuel des différentes pages de l'application et les liens entre elles.


(ajouter des démos des mocks up)

##### SourceTree

<p style="text-align:justify";>
Un logiciel qui permet d'utiliser Github de manière plus intuitive sans passer par le site internet excepté pour la gestion des branches et les pull requests.
Il nous a servit à travailler sur différentes pages de la même application à plusieurs, sans avoir a constamment s'échanger des clés USB ou s'envoier du code par slack.
</p>
(ajouter une capture d'écran)


##### Android/IOS emulator





### Bilan

### Les Plus

- le fait que certains membres du groupe codent sous Android et d'autres sous IOS nous a permis de corriger les bugs des composants pour qu'ils fonctionnent correctement sous ces deux systèmes d'exploitation
- Nous avons tous appris un nouveau langage informatique très pertinent pour ce qui est de développer une application mobile

#### Les Moins
- Nous n'avons pas testé l'application sous WindowsPhone durant le dévelopement par soucis de rapidité

