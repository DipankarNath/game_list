# Problem Statement

## Fetch data from an API endpoint

Currently the data is hardcoded in the store.
Fetch data from [this] API and set the values in already existing redux store.

[this]: <https://my-json-server.typicode.com/cb-dipankarnath/dataForTask/playerList>

# Project Overview:
This project is a dashboard application designed to manage and display player details for various teams and sports. The application supports following features:

1. **Display Player Details**:
    - Shows player details, categorized by team and sport.
    - Details included:
        - Player Name
        - Player Age

2. **Update Existing Player Details**:
    - Provides functionality to update player information with the following validations:
        - Player Name: Must be alphanumeric and at least 3 characters long.
        - Player Age: Must be between 15 and 60 years.

3. **Add New Player**:
    - Enables the addition of new players to the system.

4. **Add New Team**:
    - Enables the addition of new teams to the system.

5. **Add New Sport**:
    - Enables the addition of new sports to the system.

The system should focus on a user-friendly interface, efficient data management, and scalability to accommodate an increasing number of players, teams, and sports.


## Code Overview

The project is bootstrapped with Create React App, written in TypeScript, and follows the Flux architecture using React Redux. Below is an overview of the key components and libraries used:

### Libraries Used:

1. **React:** For building the user interface.
2. **TypeScript:** For adding static types to JavaScript.
3. **Redux:** For state management.
4. **Lodash:** For utility functions.
5. **tailwindcss:** For styling and layout.

### Project Structure

```plaintext
src/
│
├── api/
│   └── playerApi.ts             // This directory contains all the API requests
│
├── app/
│   └── store.ts                 // Configures the Redux store and decorates the app
│
├── components/
│   └── Player/
│       └── index.tsx            // Main file for the Player component, which provides inputs for user to add new player and edit existing player
│
├── containers/
│   └── Dashboard/
│       ├── index.tsx            // Main file for the Dashboard container component
│       ├── reducer.ts           // Reducer for the Dashboard container
│       └── types.d.ts           // Defines the types used in the Dashboard container
│
├── hooks/
│   ├── index.ts                 // This directory contains all the custom hooks across the application
│   └── useFetchData.ts
│
├── utils/
│   ├── isExistingPlayer.ts      // Utility function to check if the player exists in the list
│   └── validations.ts           // Utility functions to validate player name & player age
│
├── App.tsx                      // The main app component that sets up the Dashboard component
├── index.tsx                    // Entry point of the application. Renders the App component and wraps it with the Redux provider to connect the store
└── react-app-env.d.ts           // TypeScript environment definitions
```


### API

This directory contains all the API requests.

**playerApi.ts**: Handles API requests related to player data.


### App

This directory contains top-level files related to the app.

**store.ts**: Configures the Redux store and decorates the app.


### Components

This directory contains presentational components.

**Player**
   - **index.tsx**: Main file for the Player component, providing inputs for users to add new players and edit existing players.


### Containers

This directory contains container components, which connect the presentational components to the Redux store.

**Dashboard**
   - **index.tsx**: Main file for the Dashboard container component.
   - **reducer.ts**: Reducer for the Dashboard container.
   - **types.d.ts**: Defines the types used in the Dashboard container.


### Hooks
This directory contains all the custom hooks used across the application.

**usePlayerData.ts**: Custom hook for managing player data.


### Utils
This directory holds utility functions. Currently, it has two utilities:
- **isExistingPlayer.ts**: Checks if the player is new or exists in the list.
- **validations.ts**: Validates player name and player age.


### Entry Points
These are the entry points of the application.
- **App.tsx**: The main app component that sets up the Dashboard component.
- **index.tsx**: Entry point of the application. Renders the App component and wraps it with the Redux provider to connect the store.



## General Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
