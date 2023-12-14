# Projet gestion de stock microservices

## Introduction

Ce projet est une application de gestion de stock distribuée en microservices. Il utilise les technologies suivantes : Spring Boot / Docker /Kubernetes /Eureka /Keycloak 


## Architecture

L'architecture du système est présentée dans le diagramme ci-dessous :
<div>
  <img src ="https://github.com/soulaymaabdenbi/depot-dront-angular/assets/80163229/f992277f-48b8-41f5-8f42-52a19ed4cc82" width="300">
</div>

Le système est composé de cinq microservices :

- #### Microservice1 :
        gère les produits
- #### Microservice2 :
       gère les catégories
- #### Microservice3 :
         gère les clients
- #### Microservice4 :
         gère les commandes
- #### Microservice5 :
         gère les stocks

Chaque microservice est développé avec Spring Boot et utilise une base de données différente.

L'API Gateway est un microservice qui permet d'accéder aux autres microservices. Il utilise Eureka pour découvrir les microservices disponibles.

Keycloak est un serveur d'authentification qui permet d'authentifier les utilisateurs.

## Lancement du système

1. Installez Docker et Docker Compose.
   
2. Clonez le projet sur votre ordinateur.
   
3. Ouvrez un terminal dans le répertoire du projet.
   
4. #### Exécutez la commande suivante pour lancer les microservices :
        docker-compose up

Cette commande va lancer tous les microservices dans des conteneurs Docker.

## Front Angular
Le front Angular est un microservice qui consomme les API des microservices Spring Boot. Il est disponible sur le port 4200.

#### Pour accéder au front Angular, ouvrez un navigateur Web et accédez à l'adresse suivante :
          http://localhost:4200

Vous devez être authentifié pour accéder au front Angular. Vous pouvez vous authentifier en utilisant le serveur d'authentification Keycloak.

##### Pour obtenir les informations d'identification de l'utilisateur, vous pouvez utiliser la commande suivante :
       docker logs api-gateway
Cette commande va afficher les logs de l'API Gateway. Dans les logs, vous trouverez les informations d'identification de l'utilisateur par défaut.

