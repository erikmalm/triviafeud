# README

## OLD DESCRIPTION

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

## UPDATED DESCRIPTION

TRIVIA FEUD


This is a trivia based game which allows up to 12 people to participate in answering questions from either a specific category or mixed. 


The categories will by default be set to a mix of all categories but through customization, a certain category can be specified. Some of the categories that we offer are, mythology, art, history, general knowledge with many more not shown here.


When you first enter the page you will be met by a clean and simple menu letting you either host a new game or join a room.
A toggle will be visibley if you choose to host then having the toggle active will make your room public. This allows the game to be shown to everyone else currently on the startpage of Trivia Feud. This allows for random interaction with other people and can turn a bad day into a good day.

You can choose your own nickname or if the creativity is running dry, create one from our random generator. This name will be shown at the end of each round and during the announcement of the winner. 

When entering a game the first thing you will see is the lobby. If you have the privelige of being host then this is where you take your own creativity into account and create your own experience by tweaking the settings until you find your particular playstyle. This is also the place in which you see everyone that is currently waiting for the game to start and you can react accordingly with the built-in emojis.

When all waiting players feel that they are ready then they should press the ready button. When all players are marked as with the green ready-checkmark then the host will have the ability to start the game.

Depending on the settings, your or some other player will be chosen to draft a question which everyone will answer. If question drafting is toggled off then this step will be skipped and a randomly selected question will pop up instead. A timer is present to keep the tension up and stakes high, when all players have answered or the time has run out then you will be given points based on your answer and how long it took to answer.

After your selected rounds have been played, you will be greeted by a beautiful view showing the 1st, 2nd and 3rd place players as a tribute to the best triva nerds who have ever lived.


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
* HANDLE PLAYER ANSWERS AT EACH ROUND
* IMPLEMENT THE TIME ELEMENT FOR EACH ROUND
* IMPLEMENT THE DIFFERENT GAME SETTINGS
* RESULTS VIEW FOR THE GAME
* PUBLIC AND PRIVATE GAMES
* ASSIGN NEW HOST IF THE HOST LEAVES
* MAKE LEAVE A FIXED BUTTON IN APP.JS
* MAKE A PLAYER VIEW SHOWING ALL PLAYERS IN THE GAME
* SHOW CORRECT ANSWER AT ROUND RESULTS VIEW


## WHATS LEFT

* ~~HANDLE PLAYER ANSWERS AT EACH ROUND~~
* ~~IMPLEMENT THE TIME ELEMENT FOR EACH QUESTION~~
* ~~IMPLEMENT THE DIFFERENT GAME SETTINGS (GAMEMODE, ROUND-TIME, CATEGORY CUSTOMIZATION)~~
* ~~RESULTS VIEW FOR THE GAME~~
* ~~PUBLIC AND PRIVATE GAMES~~
* ~~ASSIGN NEW HOST IF THE HOST LEAVES~~
* ~~MAKE LEAVE A FIXED BUTTON IN APP.JS~~
* ~~MAKE A PLAYER VIEW SHOWING ALL PLAYERS IN THE GAME~~
* ~~SHOW CORRECT ANSWER AT ROUND RESULTS VIEW~~
* ~~MAKE ROOM LIMIT~~
* ~~TWEAK SETTINGS

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

* **WORDS.JS**
Contains bad words which will be filtered out

### /COMPONENTS/

* **CHECKBOX.JS**
Holds the component 'checkbox' which can be seen at different views

* **GAMETIMER.JS**
Holds the component 'gametimer' which is used during the actual game.

* **HOST.JS**
Holds the component 'host' which is used in the start-page. Allows player to host a room. 

* **JOIN.JS**
Holds the component 'join' which is used in the start-page. Allows the player to join a room.

* **NOTIFICATION.JS**
Holds the component 'notification'

* **PUBLICROOMS.JS**
Holds the component 'publicRooms' which is used in the start-page to show all available, joinable, public games.

* **ROUTING.JS**
Contains the routing for the game rooms, mainly used for publicRooms

### /ICONS/
* Holds all of the .svg icons that are used within the project


### /IMAGES/
* Holds all of the images that are used within the project


### /PRESENTERS/
* **FINALRESULTSPRESENTER.JS**
Presents the final results of a game.

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

* **PUBLICROOMSPRESENTER.JS**
Presents all of the available, joinable, public rooms.

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


* **WAITINGFORPLAYERSPRESENTER.JS**
Presents the waitingForPlayersView which is present when 1 or more participants hasn't answered a question but you have.

### /REDUX/

* **STORE.JS**
Holds the configurations for the store that is used when working with redux.


### /REDUX/DBWATCHERS/

* **GAMEWATCHER.JS**
Contains all of the watchers that are necessary for a game. Watchers such as gameStateWatcher, currentRoundWatcher, questionWatcher etc. 
Also includes add and remove functions for each respective watcher.

* **PLAYERWATCHER.JS**
Contains all of the watchers that are necessary for players. 

* **SERVERWATCHER.JS**
Contains all of the watchers that are necessary for a game-server. Watchers such as kickedWatcher, stateWatcher and playerWatcher etc.
Also includes add and remove functions for each respective watcher.

* **WATCHER.JS**
Contains general watcher functions.

### /REDUX/REDUCERS/

* **GAMESLICE.JS**
Contains the asyncThunks needed for setting the game-states. Also contains the reducers deemed necessary for the game. Reducers such as setCurrentRound, setGameState, setCurrentQuestion etc. Calls for storing info in firebase.

* **INDEX.JS**
Used for exports


* **PLAYERSLICE.JS**
Contains the asyncThunks needed for settings the player-states. Also contains the reducers deemed necessary for the player. Reducers such as setPlayer, resetPlayer and setKicked. Calls for storing info in firebase.

* **PUBLICROOMSSLICE.JS**
Contains the slice needed for public rooms to work as expected.

* **QUESTIONDRAFTSLICE.JS**
Contains the asyncThunks needed for setting question-states for question drafting. Also contains the reducer deemed necessary for the question drafting. The reducer setDraftQuestion. Calls for storing info in firebase.  

* **SERVERSLICE.JS**
Contains the asyncThunks needed for setting the server-states. These include hosting, joining, updating and kicking. Also contains the reducers deemed necessary for the server. Reducers such as setId, setPlayers, setSettings and setState. Calls for storing info in firebase.

* **SETTINGSSLICE.JS**
Contains the asyncThunks needed for customizing the settings. These include gamemode, tempo, category and more. Also contains the reducers deemed necessary for the settings. Calls for storing info in firebase.

### /STYLES/
* Holds all of the .css files used for the views.

### /UTIL/

* **GAMEUTIL.JS**
Contains the utility functions for a game such as updateGameState, initalizeGame and setNewAnswerForPlayer. These functions set information into firebase.

* **QUESTIONUTIL.JS**
Contains the utility functions for question such as formatQuestion and decodeQuestion and saveQuestionToFirebase.

* **SERVERUTIL.JS**
Contains the utility functions for server such as joinRoom, setServerState, createRoom, dismantleServer, updateServerSettings and removePlayer among many others.

* **SETTINGSUTIL.JS**
Contains the utilities needed for settings. Such as what settings exist and what options those settings should have. Contains function to set data in firebase.

* **UTIL.JS**
Contains general utility functions such as countWords and containsBadWords. 

### /VIEWS/

* **COUNTDOWNVIEW.JS**
Contains the html for the view that will be shown as a countdown to a question.


* **FINALRESULTSVIEW.JS**
Contains the html for the view that will be shown when the game has been completed.


* **INFOVIEW.JS**
Contains the html for various information shown.


* **LOBBYACTIONSVIEW.JS**
Contains the html for one of the views that will be shown at the 'lobby' phase. Includes 'ready', 'copy link', 'exit' and 'start'.


* **LOBBYOVERVIEWVIEW.JS**
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

* **TUTORIALVIEW.JS**
Contains the html for the tutorial on how to play

* **WAITINGFORPLAYERSVIEW.JS**
Contains the html for when player/players are waiting on player/players to answer a question.

* **WAITINGVIEW.JS**
Contains the html for a spinner-icon shown when waiting or loading.

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
* **/**
* **/room/[INSERT ID]**
* **/question**

## Get started

* CLONE REPOSITORY
* NPM INSTALL
* CONFIG FIREBASE
* CONFIG HEROKU (If remote access is wanted)
* NPM RUN START
* HAVE FUN


