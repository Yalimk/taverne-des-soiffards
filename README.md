# La Taverne des Soiffards

## Explication du projet

Ceci est le dernier projet à réalisé pour valider la formation de reconversion que j'ai entamée en juin 2020. 
L'idée était pour moi de développer des compétences que je ne maîtrisais pas, et que je n'avais pas eu l'occasion de voir au cours de la formation, à savoir l'utilisation de React, de Mongoose pour la connection à une base de données (pas nécessaire, mais vu un peu partout, donc utile à connaître).

Egalement, je souhaitais profiter de l'opportunité que représente la réalisation de ce projet pour mettre en pratique ce que j'ai appris durant mon stage en entreprise, en particulier concernant la structuration d'un projet.

En effet, bien structurer son projet (de même que suvire [les règles de bonnes pratiques](https://www.zeolearn.com/magazine/nodejs-best-practices) pour les projets NodeJS) est essentielle à la bonne compréhension et la maintenabilité dans le temps de ce dernier.

### Pourquoi ce nom ?

J'ai décidé que j'allais utiliser ce projet non seulement pour valider ma formation, mais également pour approfondir mes connaissances de la programmation et offrir à ma guilde (des joueurs avec lesquels je joue en ligne) une plateforme sociale permettant de se retrouver pour discuter stratégie, s'envoyer des messages pour programmer les sessions de jeu, ou simplement tchater ensemble. L'idée était de fournir à ma guilde une plateforme dédiée pour se retrouver entre deux sessions de jeu.

Notre guilde s'appelant "La Taverne des Soiffards" et faisant déjà référence à un lieu de rencontre et de discussion, il m'est apparu qu'il était tout à fait possible de conserver ce nom pour nommer cette plateforme.

L'origine du nom vient du fait que nous nous sommes rencontrés sur le jeu [Sea of Thieves](https://www.seaofthieves.com/fr) (_Microsoft and Rare All Rights reserverd_), un jeu de piraterie en ligne. Les pirates étant réputés, dans l'imaginaire collectif, pour leur addiction au rhum, l'un de nos membres fondateurs, Damarolo, a eu l'idée de nommer notre guilde La Taverne des Soiffards. Ce nom est depuis resté, et tout les membres l'ont adopté !

> _Disclaimer: ce site n'a en aucunc cas l'intention, directe ou indrecte, de faire la promotion de l'alcolisme, de tout comportement déviant lié à l'alcool ou de toute boisson alcolisée quelque soit sa forme_

## Utilisation de la plateforme

### Création d'un compte

Bravo ! Vous venez de rejoindre la guilde, et on vous a donné le lien vers La Taverne des Soiffards ! Afin d'accéder à toutes les fonctionnalités offertes par le site (_i.e_ une page de profil, un tchat en direct avec les autres membres, etc) il vous faut tout d'abord créer un compte. Pour cela, il vous suffit de cliquer sur le lien "Créer un compte" et de renseigner au moins un pseudonyme (qui sera visible par les autres utilisateurs) ainsi qu'un mot de passe et une adresse e-mail (qui sera utilisée pour recevoir les communications de la guilde ainsi que récupérer votre mot de passe en cas d'oubli de ce dernier). Une fois votre compte créé, vous pourrez accéder à la plateforme et commencer à participer avec les autres membres aux différentes activités organisées.

### Gestion du profil

Dans votre page de profil, vous pourrez modifier les informations relatives à votre compte, à savoir votre mot de passe, vos nom et prénom, l'adresse e-mail liée à votre compte, votre photo de profil, etc. Les autres utilisateurs seront également en mesure de laisser des messages sur votre page de profil, et c'est sur votre page de profil que vous pourrez y répondre.

### Tchat en direct

Dans la Taverne, vous serez connecté avec tous les utilisateurs présents et pourrez échanger sans temps de rechargement avec eux, comme sur n'importe quelle plateforme de réseau social connue, type Facebook ou Twitter.

----------------------------------------------------------------------------------------------

# Principaux bugs rencontrés lors du développement du projet :

## Problème 1 : Photo de profil n'apparaît (résolu)
Lors de la mise à jour du profil d'un utilisateur, les informations relatives à la photo de profil sont bien envoyées au back end (visibles dans la bdd) mais ne s'affichent pas dans le profil de l'utilisateur.

### Update problème 1

Le problème venait du fait que j'avais oublié que j'avais appelé la variable d'environnement de liaison à l'API back end "APP_REACT_API_URI" et j'avais écrit "APP_REACT_API_URL", comme un gros couillon...

----------------------------------------------

## Problème 2 : Bio n'apparaît pas (résolu)

Lors de la mise à jour du profil d'un utilisateur, les informations relatives à la description de l'utilisateur (sa bio) sont bien envoyées au back end (visibles dans la bdd) mais ne s'affichent pas dans le profil de l'utilisateur.

### Update problème 2

C'était encore une fois une connerie de ma part... Lorsque j'ai écrit le back-end, lorsque je cherchais un utilisateur, je ne voulais pas voir apparaitre un paramètre "__v" qui donne toujours "0" comme valeur. Du coup, au lieu de renvoyer le profil entier de l'utilisateur, je renvoyas un objet composé de plusieurs paramètres récupérés depuis le profil. 
SAUF QUE j'ai par la suite ajouté des choses : la photo, la biographie, etc. Du coup, ces valeurs qui étaient bien récupérées depuis la bdd, n'étaient pas transmises au front-end. Du coup, si le front end n'a pas les infos, il ne risque pas de les afficher -_- Bravo, couillon !

---------------------------------------------

## Problème 3 : Posts supprimés fantômes/persistants
Lorsqu'un post est supprimé par l'utilisateur qui l'a créé, l'utilisateur est ensuite redirigé vers la page des messages, mais le message supprimé apparaît toujours (erreur : cannot GET post/:postId), alors qu'il devrait avoir été supprimé.

### Update problème 3


----------------------------------------------

## Problème 4 : GET request 404 pour les photos
Lorsque je charge les pages qui contiennent une photo, je reçois une erreur GET http://localhost:9092/user/photo/:photoId (vérifier qu'il ne s'agit pas de userId qui est envoyé dans la requête !) mais les photos sont malgré tout bien affichées...

### Update problème 4

1. Il semblerait que l'erreur n'apparaisse pas sur la page de Profile.jsx (regarder dedans pour voir ce qui est différent)
2. L'erreur n'apparaît QUE sur la page des Pirates.
3. Il semblerait également que cette erreur soit due aux photos par défaut : l'erreur n'apparaît que trois fois sur la page des Pirates : exactement le même nombre que de photos par défaut !
4. Si l'utilisateur n'a pas mis de photo, une requête GET est quand même envoyée au serveur en lui passant undefined pour le paramètre userId, ce qui cause une erreur 404.
5. Le même problème est présent sur la page d'édition d'un Post (GET http://localhost:9092/oist.photo/...)
6. Aucun souci de chargement des images dans Posts ni dans OnePost... étrange.
7. L'erreur de chargement de l'image d'un post dans EditPost a disparu ; j'avais fait un peu de zèle et ajouté un return là où il n'en fallait pas.
8. L'id de la photo est render deux fois : première fois il est à "null/undefined" et la deuxième fois (au chargement de la page) il a bien la valeur de postId. J'obtiens une erreur :
```bash
GET http://localhost:9092/post/photo/ 400 (Bad Request)
Image (async)		
setValueForProperty	@	react-dom.development.js:683
setInitialDOMProperties	@	react-dom.development.js:8931
setInitialProperties	@	react-dom.development.js:9135
finalizeInitialChildren	@	react-dom.development.js:10201
completeWork	@	react-dom.development.js:19470
completeUnitOfWork	@	react-dom.development.js:22815
performUnitOfWork	@	react-dom.development.js:22787
workLoopSync	@	react-dom.development.js:22707
renderRootSync	@	react-dom.development.js:22670
performSyncWorkOnRoot	@	react-dom.development.js:22293
scheduleUpdateOnFiber	@	react-dom.development.js:21881
updateContainer	@	react-dom.development.js:25482
(anonymous)	@	react-dom.development.js:26021
unbatchedUpdates	@	react-dom.development.js:22431
legacyRenderSubtreeIntoContainer	@	react-dom.development.js:26020
render	@	react-dom.development.js:26103
(anonymous)	@	index.jsx:8
./src/index.jsx	@	index.jsx:10
__webpack_require__	@	bootstrap:851
fn	@	bootstrap:150
1	@	apiUser.js:80
__webpack_require__	@	bootstrap:851
checkDeferredModules	@	bootstrap:45
webpackJsonpCallback	@	bootstrap:32
(anonymous)	@	main.chunk.js:1

``` 

-----------------------------------------------

## Problème 5 : pas de redirection après modif post (résolu)

Lorsque l'utilisateur a terminé de modifier son post, il clique sur le bouton Envoyer, ce qui devrait le rediriger vers la page des posts (ou sa page de profil), mais rien ne se passe ; l'utilisateur reste sur la page EditPost, mais les champs sont vidés (tous à part l'image);

### Update problème 5 :

1. Le problème pourrait-il venir de l'ordre des routes ?!
2. Problème résolu : comme un gros blaireau, j'avais oublié de mettre le mot-clef return devant :
```javascript
return <Redirect to={`${process.env.REACT_APP_API_URI}/post/${id}`}/>;
```

------------------------------------------------
 