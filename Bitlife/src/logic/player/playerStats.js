import { getRandomInt } from '../Random/Randomness';
import { PLAYER_INITIAL_TEMPLATE, PLAYER_STAT_RANGES, MAX_NATURAL_LIFESPAN } from '../constants'; // Corrected path (lowercase 'c')
import { generateInitialJutsuSkills } from '../jutsu/Jutsu';
import { generateRandomShinobiName } from './nameGenerator'; // NEW: Import name generator

/**
 * Creates a new player character object with initial randomized and fixed stats.
 * @returns {Object} A new player character object.
 */
export const createNewPlayer = () => {
    // Generate randomized core stats based on defined ranges
    const randomizedStats = {
        health: getRandomInt(PLAYER_STAT_RANGES.health.min, PLAYER_STAT_RANGES.health.max),
        happiness: getRandomInt(PLAYER_STAT_RANGES.happiness.min, PLAYER_STAT_RANGES.happiness.max),
        smarts: getRandomInt(PLAYER_STAT_RANGES.smarts.min, PLAYER_STAT_RANGES.smarts.max),
        looks: getRandomInt(PLAYER_STAT_RANGES.looks.min, PLAYER_STAT_RANGES.looks.max),
        money: getRandomInt(PLAYER_STAT_RANGES.money.min, PLAYER_STAT_RANGES.money.max),
        chakra: getRandomInt(PLAYER_STAT_RANGES.chakra.min, PLAYER_STAT_RANGES.chakra.max), // Corrected chakra range access
    };

    // Generate Jutsu skills from the Jutsu module
    const jutsuSkills = generateInitialJutsuSkills();

    // Generate a random shinobi name
    const { firstName, lastName, clan } = generateRandomShinobiName(); // NEW: Generate name

    // Combine all initial stats
    const newPlayer = {
        ...PLAYER_INITIAL_TEMPLATE, // Fixed initial stats (age, karma)
        ...randomizedStats,         // Randomized core stats
        ...jutsuSkills,             // Randomized ninjutsu and taijutsu skills
        firstName: firstName,       // NEW: Add first name
        lastName: lastName,         // NEW: Add last name
        clan: clan,                 // NEW: Add clan name
        // inventory: [],
        // relationships: {}, // Will be managed by relationship module
        // eventsLog: [], // To store a history of major events
        // currentMission: null,
    };

    return newPlayer;
};

/**
 * Updates a player's stat by a given amount, ensuring it stays within defined min/max ranges.
 * @param {Object} player - The current player object.
 * @param {string} statName - The name of the stat to update (e.g., 'health', 'smarts').
 * @param {number} amount - The amount to change the stat by (can be positive or negative).
 * @returns {Object} The updated player object.
 */
export const updatePlayerStat = (player, statName, amount) => {
    const updatedPlayer = { ...player }; // Create a shallow copy to avoid direct mutation

    if (updatedPlayer[statName] === undefined) {
        // This warning is useful for debugging if a stat is misspelled or not initialized
        console.warn(`Attempted to update non-existent stat: ${statName}. Value: ${updatedPlayer[statName]}, Amount: ${amount}`);
        return updatedPlayer;
    }

    let newValue = updatedPlayer[statName] + amount;
    const statRange = PLAYER_STAT_RANGES[statName];

    // Apply range limits, if defined for the stat
    if (statRange) {
        // Ensure statRange.min and statRange.max are numbers
        if (typeof statRange.min === 'number' && typeof statRange.max === 'number') {
            newValue = Math.max(statRange.min, Math.min(statRange.max, newValue));
        } else {
            console.warn(`Stat range for ${statName} is invalid:`, statRange);
        }
    }
    // For stats without explicit ranges (like money, age), they can go as high/low as needed
    // unless specific logic is added elsewhere.

    updatedPlayer[statName] = newValue;
    return updatedPlayer;
};

/**
 * Checks if the player character is alive based on their health.
 * @param {Object} player - The player object.
 * @returns {boolean} True if the player is alive, false otherwise.
 */
export const isPlayerAlive = (player) => {
    return player.health > 0;
};

/**
 * Checks if the player character has reached the natural end of their life.
 * @param {Object} player - The player object.
 * @returns {boolean} True if the player is at or past MAX_NATURAL_LIFESPAN, false otherwise.
 */
export const hasReachedEndOfLife = (player) => {
    return player.age >= MAX_NATURAL_LIFESPAN;
};
