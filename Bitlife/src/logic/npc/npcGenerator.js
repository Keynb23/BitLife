// logic/relationships/npcGenerator.jsx
import { getRandomInt, getRandomElement } from '../Random/randomness';
import { PLAYER_STAT_RANGES } from '../constants'; // Reusing player stat ranges for NPCs

/**
 * This file provides functions for generating new Non-Player Characters (NPCs).
 * NPCs can be family members, squad mates, friends, enemies, etc.
 */

// Simple lists for generating names (you'd expand these significantly)
const MALE_NAMES = ["Hiro", "Kenji", "Ren", "Tatsuya", "Akira"];
const FEMALE_NAMES = ["Sakura", "Hana", "Yuki", "Mei", "Ayumi"];
const LAST_NAMES = ["Uchiha", "Uzumaki", "Haruno", "Hyuga", "Sarutobi"]; // Naruto-themed last names

/**
 * Generates a unique ID for an NPC.
 * @returns {string} A unique ID.
 */
const generateUniqueId = () => {
    return 'npc_' + Date.now() + '_' + getRandomInt(1000, 9999);
};

/**
 * Generates a random name based on gender.
 * @param {string} gender - 'male', 'female', or 'random'.
 * @returns {string} A full name.
 */
const generateRandomName = (gender) => {
    let firstName;
    const chosenGender = gender === 'random' ? getRandomElement(['male', 'female']) : gender;

    if (chosenGender === 'male') {
        firstName = getRandomElement(MALE_NAMES);
    } else if (chosenGender === 'female') {
        firstName = getRandomElement(FEMALE_NAMES);
    } else {
        firstName = getRandomElement([...MALE_NAMES, ...FEMALE_NAMES]); // Fallback for unspecified gender
    }
    const lastName = getRandomElement(LAST_NAMES);
    return `${firstName} ${lastName}`;
};

/**
 * Generates a new NPC object with randomized stats and a specified type.
 * @param {string} type - The type of NPC (e.g., 'parent', 'squadMate', 'friend', 'enemy').
 * @param {number} playerAge - The current age of the player (used for age relativity).
 * @returns {Object} A new NPC object.
 */
export const generateNPC = (type, playerAge) => {
    const gender = getRandomElement(['male', 'female']); // Random gender for new NPCs
    const name = generateRandomName(gender);

    let age;
    // Adjust age based on NPC type and player age
    if (type === 'parent') {
        age = getRandomInt(playerAge + 20, playerAge + 40); // Parents are older than player
    } else if (type === 'squadMate') {
        age = getRandomInt(playerAge - 2, playerAge + 2); // Squad mates are usually around the same age
    } else {
        age = getRandomInt(1, 80); // Default random age
    }

    return {
        id: generateUniqueId(),
        name: name,
        gender: gender,
        age: age,
        type: type, // 'parent', 'squadMate', 'friend', 'enemy', etc.
        relationshipScore: getRandomInt(0, 50), // Initial relationship score (0-100, 50 is neutral)
        // Add other NPC-specific stats or traits here
        smarts: getRandomInt(PLAYER_STAT_RANGES.smarts.min, PLAYER_STAT_RANGES.smarts.max),
        looks: getRandomInt(PLAYER_STAT_RANGES.looks.min, PLAYER_STAT_RANGES.looks.max),
        health: getRandomInt(PLAYER_STAT_RANGES.health.min, PLAYER_STAT_RANGES.health.max),
        // For shinobi-specific NPCs, you might add:
        // ninjutsuSkill: getRandomInt(JUTSU_SKILL_RANGES.ninjutsuSkill.min, JUTSU_SKILL_RANGES.ninjutsuSkill.max),
        // taijutsuSkill: getRandomInt(JUTSU_SKILL_RANGES.taijutsuSkill.min, JUTSU_SKILL_RANGES.taijutsuSkill.max),
        // loyalty: getRandomInt(0, 100), // Specific to squad mates
        // personalityTraits: [],
    };
};

// You can add functions here to:
// - Generate a specific type of NPC (e.g., generateRival)
// - Generate a set of NPCs (e.g., for a new class at the academy)
