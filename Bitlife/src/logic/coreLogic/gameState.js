// src/logic/coreLogic/gameState.js

let currentGameState = {
    player: null,
    relationships: null,
    currentScenario: null,
    gameOver: false,
    gameOverReason: null,
    // Add other top-level game state properties here
    // e.g., missions: null, eventsLog: []
};

/**
 * Retrieves the current game state.
 * @returns {Object} The current game state object.
 */
export const getGameState = () => {
    return { ...currentGameState }; // Return a shallow copy to prevent direct mutation
};

/**
 * Sets the entire game state.
 * This should be used cautiously, primarily for loading saved games or initializing a new game.
 * For incremental updates, use specific update functions (e.g., updatePlayerStat).
 * @param {Object} newState - The new game state object to set.
 */
export const setGameState = (newState) => {
    currentGameState = { ...newState };
    console.log("Game state updated:", currentGameState);
};

export const resetGameState = () => {
    currentGameState = {
        player: null,
        relationships: null,
        currentScenario: null,
        gameOver: false,
        gameOverReason: null,
    };
    console.log("Game state reset.");
};

/**
 * Updates a specific part of the game state.
 * This is a utility for updating top-level properties of the game state.
 * For nested objects (like player stats), use their dedicated update functions.
 * @param {string} key - The key of the state property to update (e.g., 'player', 'currentScenario').
 * @param {any} value - The new value for the state property.
 */
export const updateGameStateProperty = (key, value) => {
    if (currentGameState.hasOwnProperty(key)) {
        currentGameState = {
            ...currentGameState,
            [key]: value
        };
        // console.log(`Game state property '${key}' updated.`, currentGameState[key]);
    } else {
        console.warn(`Attempted to update non-existent game state property: ${key}`);
    }
};
