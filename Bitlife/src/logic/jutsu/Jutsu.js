// logic/jutsu/Jutsu.jsx
import { getRandomInt } from '../Random/randomness';

// --- Jutsu Skill Ranges ---
export const JUTSU_SKILL_RANGES = {
    ninjutsuSkill: { min: 10, max: 50 }, // Initial range for Ninjutsu skill
    taijutsuSkill: { min: 10, max: 50 }, // Initial range for Taijutsu skill
};

/**
 * Generates initial random Ninjutsu and Taijutsu skill values for a new character.
 * @returns {{ninjutsuSkill: number, taijutsuSkill: number}} An object containing the randomized skill values.
 */
export const generateInitialJutsuSkills = () => {
    return {
        ninjutsuSkill: getRandomInt(JUTSU_SKILL_RANGES.ninjutsuSkill.min, JUTSU_SKILL_RANGES.ninjutsuSkill.max),
        taijutsuSkill: getRandomInt(JUTSU_SKILL_RANGES.taijutsuSkill.min, JUTSU_SKILL_RANGES.taijutsuSkill.max),
    };
};

// You can add more jutsu-related functions here later, such as:
// - learning new jutsus
// - performing jutsus
// - calculating jutsu effectiveness based on skill and chakra
