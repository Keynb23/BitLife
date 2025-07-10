// src/components/Tabs/profile/playerStats.js

import { getRandomInt } from '../../../../logic/Random/Randomness';
import { PLAYER_INITIAL_TEMPLATE, PLAYER_STAT_RANGES, MAX_NATURAL_LIFESPAN, STAT_CHANGE_MULTIPLIERS } from '../../../../logic/constants';
import { generateInitialJutsuSkills } from '../player/Jutsu';
import { generateRandomShinobiName } from '../../../../logic/coreLogic/nameGenerator';

// --- Ōtsutsuki Genetic Reawakening Constants ---
const OTSUTSUTSUKI_REAWAKENING_CHANCE_PERCENT = 5; // 5% chance for any reawakening
const OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT = STAT_CHANGE_MULTIPLIERS.SMALL * 2; // A noticeable but not overpowering boost

// Define the specific traits associated with Indra and Asura lineages
const INDRA_TRAITS = {
    name: "Indra's Lineage Reawakening",
    description: "A rare genetic reawakening granting enhanced perception, chakra control, or visual prowess potential.",
    statBoosts: {
        smarts: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT,
        chakra: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT,
        ninjutsuSkill: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT,
    }
};

const ASURA_TRAITS = {
    name: "Asura's Lineage Reawakening",
    description: "A rare genetic reawakening granting enhanced vitality, physical strength, or healing capabilities.",
    statBoosts: {
        health: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT,
        taijutsuSkill: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT,
        happiness: OTSUTSUTSUKI_TRAIT_BOOST_AMOUNT, // Represents resilience/strong life force
    }
};

/**
 * Creates a new player character object with initial randomized and fixed stats.
 * Includes a rare chance for Ōtsutsuki genetic reawakening.
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
        chakra: getRandomInt(PLAYER_STAT_RANGES.chakra.min, PLAYER_STAT_RANGES.chakra.max),
    };

    // Generate Jutsu skills from the Jutsu module
    const jutsuSkills = generateInitialJutsuSkills();

    // Generate a random shinobi name
    const { firstName, lastName, clan } = generateRandomShinobiName();

    // Combine all initial stats
    let newPlayer = {
        ...PLAYER_INITIAL_TEMPLATE, // Fixed initial stats (age, karma)
        ...randomizedStats,         // Randomized core stats
        ...jutsuSkills,             // Randomized ninjutsu and taijutsu skills
        firstName: firstName,
        lastName: lastName,
        clan: clan,
        inheritedOtsutsukiTrait: null, // Initialize to null
    };

    // --- Apply Ōtsutsuki Genetic Reawakening (2-5% chance) ---
    const reawakeningRoll = getRandomInt(1, 100);
    if (reawakeningRoll <= OTSUTSUTSUKI_REAWAKENING_CHANCE_PERCENT) {
        const traitTypeRoll = getRandomInt(0, 1); // 0 for Indra, 1 for Asura
        const inheritedTrait = traitTypeRoll === 0 ? INDRA_TRAITS : ASURA_TRAITS;

        newPlayer.inheritedOtsutsukiTrait = {
            name: inheritedTrait.name,
            description: inheritedTrait.description,
        };

        // Apply stat boosts, ensuring they stay within defined ranges
        for (const stat in inheritedTrait.statBoosts) {
            const amount = inheritedTrait.statBoosts[stat];
            let currentValue = newPlayer[stat] || 0; // Get current value, default to 0 if not set
            let newValue = currentValue + amount;

            // Clamp the new value within the stat's defined range
            const statRange = PLAYER_STAT_RANGES[stat];
            if (statRange) {
                newValue = Math.max(statRange.min, Math.min(statRange.max, newValue));
            } else if (stat === 'money') { // Special handling for money if it has Infinity max
                newValue = Math.max(0, newValue);
            }
            newPlayer[stat] = newValue;
            console.log(`Genetic Reawakening: ${inheritedTrait.name} boosted ${stat} by ${amount}. New value: ${newPlayer[stat]}`);
        }
        console.log(`Player ${newPlayer.firstName} ${newPlayer.lastName} inherited a rare genetic trait: ${inheritedTrait.name}`);
    }

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
