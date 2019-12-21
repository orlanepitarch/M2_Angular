# MIASHS-M2-TP3-Projet

## Install & Build :

Cloner ce dépôt git et se déplacer dedans :

```
 git clone https://github.com/orlanepitarch/M2_Angular.git
 cd M2_Angular
```

Installer les dépendances nécessaires avec `npm install`

## Lancer le serveur

Executer `ng serve -o` pour démarrer le serveur. Aller à l'adresse `http://localhost:4200/` si celle-ci ne s'ouvre pas automatiquement.

---

## Fonctionnalités développées :


### 1 : Edition du nom de la liste

    Permet de modifier le titre de la liste (sauvegardé dans le localStorage décrit après)

- Pour tester cette fonctionnalité : 

  1.  Double-click sur le titre de la liste
  2.  Un input modifiable s'affiche, changer le titre
  3.  Appuyer sur entrée ou cliquer ailleurs pour que le changement soit pris en compte

### 2 : Effacer Tout

    Ajout d'une icône bin de font-awesome à droite de la liste permettant de supprimer tous les items.

- Pour tester cette fonctionnalité : 

  1.  Ajouter des items dans la liste
  2.  Appuyer sur l'icone de suppression
  
### 3 : Undo/Redo 

    Ajout de deux icônes permettant d'annuler ou de refaire ce qui a été modifié

- Pour tester cette fonctionnalité : 

  1.  Ajouter des items dans la liste ou changer le titre de la liste
  2.  Changer l'état de certains 
  3.  Cliquer sur les boutons d'annulation et de récupération présents à droite de la todo liste afin de vérifier leur bon fonctionnnement
  
### 3 : LocalStorage (sauvegarder les données localement)

    Ajout d'une mémoire locale évoluant en fonction des changements de la liste. Si on actualise la page, 
    la liste est dans l'état dans lequel on l'a précedemment laissé, ainsi que le titre de la liste et les Undo/Redo.

- Pour tester cette fonctionnalité : 

  1.  Ajouter des items dans la liste et changer le titre de la liste
  2.  Actualiser la page ou ouvrir la même adresse dans un nouvel onglet

### 4 : Reconnaissance Vocale 

    Ajout d'une icône micro dans la barre d'ajout d'item. Reconnaissance vocale en français. 
    Nécessité d'utiliser Google Chrome.

- Pour tester cette fonctionnalité : 

  1.  Lancer la reconnaisance vocale en cliquant sur le micro (le navigateur doit avoir accès à votre micro)
  2.  Une fois la phrase dite à voix haute, celle-ci doit apparaitre dans l'entrée utilisée pour ajouter une nouvelle tâche à la liste si elle a été clairement interprétée par le module.
  3.  Vous pouvez modifier la phrase si elle n'est pas correcte puis soumettre en cliquant sur la touche entrée la saisie.

### 5 : Progressive Web Application

    Possibilité d'ouvrir l'application via son téléphone

- Pour tester cette fonctionnalité : 

  1.  Exécuter la commande `ng build`permettant de construire un dossier `dist`
  2.  Se déplacer dans le dossier dist avec la commande `cd dist`
  3.  Exécuter `http-server`
  4.  Celui-ci doit vous retourner 2 adresses IP si tous se passe bien.
  5.  Ouvrir la 2ème dans votre navigateur web depuis votre ordinateur puis se rendre sur la 1ère fournie en l'écrivant dans votre navigateur sur téléphone. Ce dernier doit être sur le même réseau internet que l'ordinateur sur lequel vous lancez le serveur http.
  
Probleme de compatibilité : l'édition des textes via le double-clic et la reconnaissance vocale ne fonctionne pas 
