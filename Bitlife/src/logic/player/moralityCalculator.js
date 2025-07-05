import { PLAYER_STAT_RANGES, MORALITY_CHANGE_MULTIPLIERS } from '../constants'; // Corrected path: constants.js is directly in logic folder (lowercase 'c')
import { updatePlayerStat } from './playerStats'; // Path relative to current folder

/**
 * Updates the player's karma/morality score.
 * The score is clamped within the defined range in constants.
 * @param {Object} player - The current player object.
 * @param {number} amount - The amount to change the karma by (positive for good, negative for bad).
 * @returns {Object} The updated player object.
 */
export const updateMorality = (player, amount) => {
    // We'll use the generic updatePlayerStat to handle clamping within range
    const updatedPlayer = updatePlayerStat(player, 'karma', amount);
    return updatedPlayer;
};

/**
 * Gets the current morality status of the player based on their karma score.
 * @param {Object} player - The current player object.
 * @returns {string} A descriptive string of the player's morality status.
 */
export const getMoralityStatus = (player) => {
    const karma = player.karma;
    const { min, max } = PLAYER_STAT_RANGES.karma; // Assuming karma range is defined here

    // Calculate thresholds for different morality levels
    const third = (max - min) / 3;
    const goodThreshold = min + (2 * third);
    const neutralThreshold = min + third;

    if (karma >= goodThreshold) {
        return "Heroic"; // Or "Honorable Shinobi"
    } else if (karma >= neutralThreshold) {
        return "Neutral"; // Or "Balanced Shinobi"
    } else {
        return "Villainous"; // Or "Rogue Shinobi"
    }
};

// You can add more functions here, such as:
// - getKarmaImpact(choiceType) to return a predefined karma change based on choice type
