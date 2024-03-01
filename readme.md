# Bugtracker
![mainpage](https://github.com/Flashrex/flashrex.github.io/blob/master/public/bugtracker_full.png?raw=true)

## Beschreibung
Diese App kann als Bugtracker verwendet werden.
User haben die Möglichkeit Teams zu gründen und innerhalb ihres Teams Bugs zu tracken, Bugs einem Bearbeiter zuzuweisen und 
über aktuelle Dinge in einem Chat zu diskutieren.
Darüberhinaus kann man sein eigenes Profil anpassen, neue Accounts erstellen und hat eine Übersicht mit verschiedenen
Statistiken innerhalb des Teams.

## Features
- Registration/Login/Sessions
- Einstellen von Issues/Bugs
- Übersicht mit Statistiken über das Team auf der Homepage
- Individuelle Benutzerprofile mit der Möglichkeit Daten wie Email zu ändern
- Übersicht über alle Issues des Teams und Möglichkeit diese im einzelnen zu bearbeiten.

## Tech

- [NodeJs](https://nodejs.org/en/) - evented I/O for the backend
- [Express](https://expressjs.com/) - fast node.js network app framework
- [Passport](https://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- [DotEnv](https://www.npmjs.com/package/dotenv) - Module that loads environment variables from a .env file
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [MySql](https://www.npmjs.com/package/mysql) - node.js driver for mysql
- [VueJs](https://vuejs.org/) - a popular frontend framework
- [chart.js](https://www.chartjs.org/) - js library for creating charts

## Setup

- Download project
- Create .env file in root folder and add your database credentials
- Run server project using "node start" from terminal in root folder
- Open "http://localhost:8080" in your browser

## Images
![issue](https://github.com/Flashrex/bugtracker/blob/master/images/issue.png)
![login](https://github.com/Flashrex/bugtracker/blob/master/images/login.png)
![profile](https://github.com/Flashrex/bugtracker/blob/master/images/profile.png)
