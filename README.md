# README

## DESCRIPTION

TRIVIA FEUD


This is a trivia based game which allows up to 12 people to participate in answering categorized questions. 


Category will by default be set to a mix of all categories but through customization, a certain category can be specified.


When a player first enters the page they are met with a clean and simple menu letting them either host a new game or join a room.
The player will choose a nickname for the entire game and the proceed to either host or join a game.
When a room has been created then it is set to the 'lobby' phase. 
This phase offers a view with all of the current participants that are waiting in the lobby (Communication is given in the form of emojis during this phase).
The host has the options to change how the game will be played. Options like what type of gamemode, how fast the rounds are supposed to be and if there should be a specific category for the game.
When all of the players have pressed the 'Ready' button, the host will have the option to start the game.
The category of the question will first be shown and then the question will show itself. Along with the question there are two or four different answers whereas
only one is correct. A timer showing the remaining amount of seconds there are to answer. When all of the users have answered or the time has run out, the correct answer will be shown and points will be given out to the players who answered correctly.


A game consists of 24 rounds and at the end there will be a ceremony, mentioning the users who came at 3rd, 2nd and 1st place.

## WHATS BEEN DONE

* VIEW FOR 'host/join'
* CREATION OF ROOMS AT 'host/join'
* STORING NICKNAMES FOR PLAYERS

* VIEW FOR 'lobby' PHASE
* ENABLING PLAYERS TO JOIN ROOMS IN 'lobby' PHASE
* HOST PRIVILEGES (KICK PLAYERS, SETTINGS ETC.)
* INVITE-LINK TO JOIN ROOM
* QUICK JOIN VIEW FOR JOINING THROUGH INVITE-LINK


* ROUND RESULTS VIEW
* QUESTION DRAFTING

* DEPLOY THROUGH HEROKU


## WHATS LEFT

* HANDLE PLAYER ANSWERS AT EACH ROUND
* IMPLEMENT THE TIME ELEMENT FOR EACH QUESTION
* IMPLEMENT THE DIFFERENT GAME SETTINGS (GAMEMODE, ROUND-TIME, CATEGORY CUSTOMIZATION)
* RESULTS VIEW FOR THE GAME

## PROJECT STRUCTURE

### /API/

* **FIRESOURCE.JS**
Holds the firebase configuration and function used for database transaction
  
* **INDEX.JS**
Used for exports

* **QUESTIONSOURCE.JS**
Holds the question-api as a variable and various functions to be used for the question-api

* **UTIL.JS**
Holds util functions for api's such as promiseNoData

### /COMPONENTS/

* **HOST.JS**
Holds the component 'host' which is used in the start-page. Allows player to host a room. 

* **JOIN.JS**
Holds the component 'join' which is used in the start-page. Allows the player to join a room.

* **NOTIFICATION.JS**
Holds the component 'notification'

### /ICONS/
* Holds all of the .svg icons that are used within the project


### /IMAGES/
* Holds all of the images that are used within the project


### /PRESENTERS/
* **GAMEPRESENTER.JS**
Presents a certain presenter or view depending on the state of the game. 

* **HEADER.JS**
Presents a header with the game title and playername (Trivia Feud - [PLAYER])

* **LOBBYACTIONSPRESENTER.JS**
Presents the lobbyActionsView and handles state changes for that particular view.

* **LOBBYOVERVIEWPRESENTER.JS**
Presents the lobbyOverviewView and handles state changes for that particular view.

* **LOBBYSETTINGSPRESENTER.JS**
Presents the lobbySettingsView and handles state changes for that particular view.

* **LOBBYPRESENTER.JS**
Presents all of the various lobby presenters and handles logic for kicking, leaving and starting.

* **QUESTIONDRAFTPRESENTER.JS**
Presents the questionDraftView and handles logic such as selecting a question.

* **QUESTIONPRESENTER.JS**
Presents the questionView and handles logic such as remaining time-to-answer.


* **QUICKJOINPRESENTER.JS**
Presents the quickJoinView which allows the user join a game without entering a code.


* **STARTPAGEPRESENTER.JS**
Presents the startPageView and handles logic such as hosting a server, joining a server and choosing nicknames.

### /REDUX/

* **STORE.JS**
Holds the configurations for the store that is used when working with redux.


### /REDUX/DBWATCHERS/

* **GAMEWATCHER.JS**
Contains all of the watchers that are necessary for a game. Watchers such as gameStateWatcher, currentRoundWatcher, questionWatcher etc. 
Also includes add and remove functions for each respective watcher.

* **SERVERWATCHER.JS**
Contains all of the watchers that are necessary for a game-server. Watchers such as kickedWatcher, stateWatcher and playerWatcher etc.
Also includes add and remove functions for each respective watcher.

* **TIMEWATCHER.JS**
WIP

### /REDUX/REDUCERS/

* **GAMESLICE.JS**
Contains the asyncThunks needed for setting the game-states. Also contains the reducers deemed necessary for the game. Reducers such as setCurrentRound, setGameState, setCurrentQuestion etc. Calls for storing info in firebase.

* **INDEX.JS**
Used for exports


* **PLAYERSLICE.JS**
Contains the asyncThunks needed for settings the player-states. Also contains the reducers deemed necessary for the player. Reducers such as setPlayer, resetPlayer and setKicked. Calls for storing info in firebase.

* **QUESTIONDRAFTSLICE.JS**
Contains the asyncThunks needed for setting question-states for question drafting. Also contains the reducer deemed necessary for the question drafting. The reducer setDraftQuestion. Calls for storing info in firebase.  

* **SERVERSLICE.JS**
Contains the asyncThunks needed for settings the server-states. These include hosting, joining, updating and kicking. Also contains the reducers deemed necessary for the server. Reducers such as setId, setPlayers, setSettings and setState. Calls for storing info in firebase.

### /STYLES/
* Holds all of the .css files used for the views.

### /UTIL/

* **GAMEUTIL.JS**
Contains the utility functions for a game such as updateGameState, initalizeGame and setNewAnswerForPlayer. These functions set information into firebase.

* **PLAYERUTIL.JS**
Contains the utility functions for player such as saveReadyToFirebase and saveEmojiToFirebase. These functions set information into firebase.

* **QUESTIONUTIL.JS**
Contains the utility functions for question such as formatQuestion and decodeQuestion and saveQuestionToFirebase.

* **SERVERUTIL.JS**
Contains the utility functions for server such as joinRoom, setServerState, createRoom, dismantleServer, updateServerSettings and removePlayer among many others.



### /VIEWS/

* **FINALRESULTSVIEW.JS**
Contains the html for the view that will be shown for the final results.

* **LOBBYACTIONSVIEW.JS**
Contains the html for one of the views that will be shown at the 'lobby' phase. Includes 'ready', 'copy link', 'exit' and 'start'.

* **LOBBYOVERVIEW-VIEW.JS**
Contains the html for one of the views that will be shown at the 'lobby' phase. Includes the kick function and the emoji selection.

* **LOBBYSETTINGSVIEW.JS**
Contains the html for one the settings view that will be shown at the 'lobby' phase. Includes the settings for the game.

* **LOBBYVIEW.JS**
Contains the html for the various lobbyViews,

* **QUESTIONDRAFTVIEW.JS**
Contains the html for the view for when a player is drafting a question.


* **QUESTIONVIEW.JS**
Contains the html for the view that will be shown during a question.

* **QUICKJOINVIEW.JS**
Contains the html for the view that will be shown at quick-join.

* **ROUNDRESULTSVIEW.JS**
Contains the html for the view that will be shown after a round is completed.

* **STARTPAGEVIEW.JS**
Contains the html for the view that will be shown when entering the startpage.

* **WAITINGVIEW.JS**
WIP

### APP.JS
* Contains pathing for the project.

### INDEX.JS
Contains the actual rendering elements for the projects.


## ENDPOINTS USED

### https://opentdb.com

* **/api.php?amount=X&encode=url3986** 
> endpoint for getting questions where x is the amount of questions to request.

* **api_category.php**
> endpoint for listing all categories

## ENDPOINTS OFFERED
* **/health**
* **/**
* **/room/[INSERT ID]**
* **/question**

## Get started

* CLONE REPOSITORY
* NPM INSTALL
* CONFIG FIREBASE
* CONFIG HEROKU
* NPM START
* HAVE FUN


