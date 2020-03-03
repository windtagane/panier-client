## Brief client 

Le thème du site est : vêtements et bijoux artisanaux

- En tant que client je veux ajouter un produit à mon panier afin de pouvoir le commander si je le désire
- En tant que client je veux supprimer un produit de mon panier afin qu'il ne soit plus pris en compte lorsque je passerais la commande
- En tant que client je veux pouvoir changer la quantité de chaque produit dans mon panier afin d'en commander le nombre désirée

- En tant qu'administrateur je veux pouvoir gérer mes catégories (ajouter, supprimer,modifier) afin de pouvoir ranger les produits dans les catégories
- En tant qu'administrateur je veux pouvoir désactiver une catégorie afin qu'elle n'apparaisse pas sur le site
- En tant qu'administrateur je veux pouvoir réactiver une catégorie afin qu'elle apparaisse sur le site

- En tant qu'utilisateur je pouvoir laisser un commentaire sur un produit afin de donner mon avis
- En tant qu'utilisateur je veux pouvoir rééditer mon commentaire précédent afin de corriger des éléments
- En tant qu'administrateur je veux pouvoir supprimer un commentaire

## Déroulé

Tout d'abord, vous devez,

Pour la partie base de données :

* Créer le dictionnaire de données
* Créer le schéma relationnel de données
* Créer le schéma physique
* Créer la base de données MYSQL (ou Postgres SQL)
* Ecrire les requêtes SQL suivantes :
 - Lister tous les produits
 - Lister les catégories
 - Lister les catégories actives
 - Lister les catégories inactives
 - Lister tous les produits par catégories
 - Lister les produits par prix
 - Lister les produits par catégories et par prix
 - Ajouter un produit au panier
 - Supprimer un produit du panier
 - Mettre à jour la quantité d'un produit dans le panier
 - Lister les commentaires pour un produit
 - Mettre à jour un commentaire
 - Supprimer un commentaire


Pour la partie backend :

* Installer Express JS
* Installer un ORM (Sequelize)  
* Créer les routes HTTP en respectant les principes d'API Rest. Vous devez au moins avoir une route pour chaque méthode HTTP suivantes : POST, PUT, DELETE, GET.
* Mettre en place les tests fonctionnels pour tester votre API.

Pour aller plus loin : bv 

* Mettre en place un système de connexion pour vérifier que ce ne soit qu'un utilisateur connecté qui puisse ajouter un produit dans un panier

Les livrables : 

* Schéma entités/relations
* Schéma physique
* Lien github de l'application
* Les scripts de créations de la base de données relationnelles respectant le schéma de modélisation des données.
* Les scripts des requêtes demandées précédemment.
* Tests unitaires/fonctionnelles

Votre code devra être documenté et bien indenté. Vous devez pouvoir expliquer toutes les parties du code !

# Techno 

* ExpressJS
* MySQL ou Postgres
* un ORM au choix
* git