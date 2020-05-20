# 2019-2020-ps6-rendu-rectangular

Bienvenue sur notre repo. 
Notre projet est un site web pour les personnes âgées en centre d'accueil de jour et qui souffrent de troubles de la vision. Ce site web permet aux personnes âgées de maintenir leur culture générale en leur proposant de faire des quiz.
Ce site a pour but d'avoir une interface simple afin de permettre aux personnes n'ayant pas l'habitude des nouvelles technologies de tout de même profiter pleinement de ce site.

Ce site a été développé avec le framework Angular et Node.js.

# Comment lancer le site

Tout d'abord, assurez vous d'avoir git et node d'installés sur votre ordinateur.
Dans le répertoire que vous souhaitez, commencez par la commande:
```
git clone https://github.com/2019-2020-ps6/2019-2020-ps6-rendu-rectangular.git
cd ./2019-2020-ps6-rendu-rectangular
```
Dans ce même terminal, tapez:
```
cd ./backend
npm install
npm run dev
```
Enfin, dans le répertoire où vous avez installé le projet, ouvrez un second terminal et tapez:
```
cd ./2019-2020-ps6-rendu-rectangular/frontend
npm install
ng serve --open
```
Voilà. Normalement vous devriez pouvoir commencer à utiliser notre site. Enjoy!

# Au cas où

Cela ne devrait pas arriver, mais si jamais le site crash et que vous n'arrivez pas à le redémarrer en relançant le back-end et le front-end, il vous faut supprimer tous les fichiers .mocks.json dans le répertoire ./2019-2020-ps6-rendu-rectangular/backend/mocks.
Vous pouvez ensuite relancer le site, et constater que tout fonctionne à nouveau.
