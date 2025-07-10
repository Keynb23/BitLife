// src/logic/saves/saveLoad.js

const GAME_SAVE_KEY = 'narutoBitlifeSave'; // Key for localStorage

/**
 * Saves the current game state to localStorage.
 * @param {Object} gameState - The entire game state object to save (e.g., player, current scenario, etc.).
 */
export const saveGame = (gameState) => {
    try {
        const serializedState = JSON.stringify(gameState);
        localStorage.setItem(GAME_SAVE_KEY, serializedState);
        console.log("Game saved successfully!");
    } catch (error) {
        console.error("Failed to save game to localStorage:", error);
    }
};

/**
 * Loads the game state from localStorage.
 * @returns {Object|null} The loaded game state object, or null if no save found or an error occurred.
 */
export const loadGame = () => {
    try {
        const serializedState = localStorage.getItem(GAME_SAVE_KEY);
        if (serializedState === null) {
            console.log("No saved game found.");
            return null;
        }
        const gameState = JSON.parse(serializedState);
        console.log("Game loaded successfully!");
        return gameState;
    } catch (error) {
        console.error("Failed to load game from localStorage:", error);
        return null;
    }
};

/**
 * Clears the saved game data from localStorage.
 */
export const clearSave = () => {
    try {
        localStorage.removeItem(GAME_SAVE_KEY);
        console.log("Game save cleared!");
    } catch (error) {
        console.error("Failed to clear game save from localStorage:", error);
    }
};
