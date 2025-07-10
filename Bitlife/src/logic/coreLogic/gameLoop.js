// src/logic/coreLogic/gameLoop.js

import { updatePlayerStat, isPlayerAlive, hasReachedEndOfLife } from '../../components/Tabs/profile/playerStats'; // Adjusted path
import { AGE_UP_INCREMENT, DAILY_STAT_ADJUSTMENTS } from '../constants'; // Corrected path
import { getRandomScenario } from '../../components/Scenarios/index'; // Adjusted path
import { applyChoiceConsequences } from '../../components/Scenarios/choiceOutcomes'; // Adjusted path
import { getRandomInt } from '../Random/Randomness'; // Corrected path

/**
 * Applies subtle daily/yearly adjustments to player stats.
 * These are general changes that happen each turn, separate from scenario choices.
 * @param {Object} player - The current player object.
 * @returns {Object} The player object with daily adjustments applied.
 */
const applyDailyStatAdjustments = (player) => {
    let updatedPlayer = { ...player };
    for (const stat in DAILY_STAT_ADJUSTMENTS) {
        const adjustment = DAILY_STAT_ADJUSTMENTS[stat];
        if (adjustment && typeof adjustment.min === 'number' && typeof adjustment.max === 'number') {
            const amount = getRandomInt(adjustment.min, adjustment.max);
            updatedPlayer = updatePlayerStat(updatedPlayer, stat, amount);
        }
    }
    return updatedPlayer;
};


/**
 * Advances the game by one turn (one year).
 * This function handles aging the player, checking for game over conditions,
 * and preparing the next scenario.
 * @param {Object} currentPlayer - The current state of the player character.
 * @returns {{player: Object, scenario: Object|null, gameOver: boolean, gameOverReason: string|null}}
 * An object containing the updated player, the next scenario, game over status, and reason.
 */
export const advanceTurn = (currentPlayer) => {
    let player = { ...currentPlayer }; // Create a mutable copy of the player state
    let scenario = null;
    let gameOver = false;
    let gameOverReason = null;

    // 1. Age up the player
    player = updatePlayerStat(player, 'age', AGE_UP_INCREMENT);

    // 2. Apply daily/yearly stat adjustments (NEW)
    player = applyDailyStatAdjustments(player);

    // 3. Check for game over conditions
    if (!isPlayerAlive(player)) {
        gameOver = true;
        gameOverReason = "You ran out of health."; // More specific reasons can be added
    } else if (hasReachedEndOfLife(player)) {
        gameOver = true;
        gameOverReason = "You reached the end of your natural life."; // Or a more detailed recap trigger
    }

    // If the game is not over, get the next scenario
    if (!gameOver) {
        // Pass player state to getRandomScenario so it can select relevant scenarios
        scenario = getRandomScenario(player);
    }

    // Return the updated game state
    return {
        player,
        scenario,
        gameOver,
        gameOverReason,
    };
};

/**
 * Processes the player's choice for a given scenario.
 * This function will apply the consequences of the choice to the player's stats and state.
 * @param {Object} player - The current player object.
 * @param {Object} relationships - The current relationships object.
 * @param {Object} scenario - The current scenario object.
 * @param {number} choiceIndex - The index of the chosen option (0-3).
 * @returns {{player: Object, relationships: Object}} The updated player and relationships objects after applying choice consequences.
 */
export const processChoice = (player, relationships, scenario, choiceIndex) => {
    // Ensure scenario and its choices are defined before proceeding
    if (!scenario || !scenario.choices || scenario.choices[choiceIndex] === undefined) {
        console.error("Invalid scenario or choice index passed to processChoice:", scenario, choiceIndex);
        // Return current state to prevent crash, but log the error
        return { player: { ...player }, relationships: { ...relationships } };
    }

    const chosenConsequences = scenario.choices[choiceIndex].consequences || [];

    const { player: updatedPlayer, relationships: updatedRelationships } =
        applyChoiceConsequences(player, relationships, chosenConsequences);

    console.log(`Player chose option "${scenario.choices[choiceIndex].text}" for scenario: "${scenario.text}"`);

    return { player: updatedPlayer, relationships: updatedRelationships };
};

// You might add functions here for:
// - Initializing a new game session
// - Resetting game state
// - Handling game over logic (e.g., triggering recap)
