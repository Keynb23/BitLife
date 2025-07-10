// src/logic/coreLogic/moralityCalculator.js

import { PLAYER_STAT_RANGES } from '../constants'; // Adjusted path: constants.js is directly in logic folder
import { updatePlayerStat } from '../../components/Tabs/profile/playerStats'; // Adjusted path

/**
 * Updates the player's karma/morality score.
 * The score is clamped within the defined range in constants.
 * @param {Object} player - The current player object.
 * @param {number} amount - The amount to change the karma by (positive for good, negative for bad).
 * @returns {Object} The updated player object.
 */
export const updateMorality = (player, amount) => {
    // We'll use the generic updatePlayerStat to handle clamping within range
    const updatedPlayer = updatePlayerStat(player, 'morality', amount); // Changed 'karma' to 'morality' as per App.js state
    return updatedPlayer;
};

/**
 * Gets the current morality status of the player based on their karma score.
 * @param {Object} player - The current player object.
 * @returns {string} A descriptive string of the player's morality status.
 */
export const getMoralityStatus = (player) => {
    const morality = player.morality; // Changed 'karma' to 'morality'
    const { min, max } = PLAYER_STAT_RANGES.morality; // Assuming morality range is defined here

    // Calculate thresholds for different morality levels
    const third = (max - min) / 3;
    const goodThreshold = min + (2 * third);
    const neutralThreshold = min + third;

    if (morality >= goodThreshold) {
        return "Heroic"; // Or "Honorable Shinobi"
    } else if (morality >= neutralThreshold) {
        return "Neutral"; // Or "Balanced Shinobi"
    } else {
        return "Villainous"; // Or "Rogue Shinobi"
    }
};

// You can add more functions here, such as:
// - getKarmaImpact(choiceType) to return a predefined karma change based on choice type
