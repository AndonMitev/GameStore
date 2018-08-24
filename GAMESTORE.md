# My Angular app

Simple game store where authenticated users are alowed to view games, subscribe to game, order game or comment game. Also they might send messages to support if they want to cancel their orders.

# Unauthenticated users are allowed to:

- Register
- Login

# Authenticated users are allowed to:

- View all games in store
- Search for a game
- Sort game by criteria
- Add comment to game
- Delete their comments
- Subscribe to game
- Unsubscribe from game
- Order game
- View their profile page
- Receive and sent messages from/to support
- Check their completed orders

# Authenticated and authorized users as admin are allowed to:

- Create game for selling in store
- Edit game
- Delete game 
- Delete all comments
- Receive and sent messages from/to users
- Delete user orders

# Project structure

## Components

## Modules
- GameStore Module
- User Module
- Shared Module

### GameStore Module Structure
- AllCommentsComponent
- AllGamesComponent
- CartComponent
- CreateCommentGameComponent
- CreateGameComponent
- DeleteGameComponent
- DetailsGameComponent
- EditGameComponent
- SubscribeToGameComponent

### Shared Module Structure
- AddToCartComponent
- CategoriesComponent
- DeleteCommentComponent
- DirectivesComponent
- LoadingSpinnerComponent
- NavbarComponent
- NotFoundComponent
- PipesComponent
- UnsubscribeFromGameComponent

### Shared Module Structure
- RegisterComponent
- LoginComponent
- LogoutComponent
- MyCommentsComponent
- MyCreateMessageComponent
- MyFullOrderDetailsComponent
- MyMessagesDetailsComponent
- MyMessagesComponent
- MyOrderCancelComponent
- MyOrdersComponent
- MyProfileComponent
- MyReceivedMessagesComponent
- MySentMessagesComponent
- MySubscriptionsComponent

# Core

## Guards
- Admin Guard
- Auth Guard
- UnAuth Guard

## Interceptors
- Caching Interceptor
- Error Interceptor
- Token Interceptor

## Models

### Input-Models
- CreateComment Model
- CreateGame Model
- Login Model
- Message Model
- Register Model

### View-Models
- AllCommentsGame Model
- AllGames Model
- CompleteOrder Model
- DetailsGame Model

## Services

### Authentication Services
- Login Service
- Logout Service
- Register Service
- Verification Service

### Comment Services
- CreateComment Service
- DeleteComment Service
- GetAllComments Service
- GetUserComments Service

### CRUD Methods
- GENERATE BASE_URL Method
- CREATE Method
- GET Method
- PUT Method
- DELETE Methos

### GameStore Services
- CreateGame Service
- DeleteGame Service
- EditGame Service
- GetAllGames Service
- GetDetailsGame Service
- SubsribeToGame Service

### Message Services
- CreateMessage Service
- GetMessageDetails Service
- GetReceivedMessages Service
- GetSentMessages Service

### Order Services
- CompleteOrder Service
- GetCompleteOrder Service
- GetUserOrders Service
- CancelOrder Service
- OrderGame Service

### Profile Services
- GetProfile Service
- GetUserIdByUsername Service
- GetUsernameByUserId Service

# Store

## Actions
- Comment Actions
- Game Actions
- Message Actions
- Order Actions
- User Actions

## Reducers
- Comment Reducers
- Game Reducers
- Message Reducers
- Order Reducers
- User Reducers

## State
- Comment State
- Game State
- Message State
- Order State
- User State


# GitHub Repo Link: [Repo Link](https://github.com/AndonMitev/GameStore).
- run npm install to install all of the packages

# Uploaded Web Site Link: [Uploaded version link](https://upbeat-bose-37155f.netlify.com/).
