// src/components/Tabs/Jobs/missions/missionOutcomes.js

// Adjusted imports based on the provided file structure
import { applyChoiceConsequences } from '../../components/Scenarios/choiceOutcomes'; // Corrected path
import { emit, GAME_EVENTS } from '../../logic/coreLogic/gameEvents'; // Corrected path
import { getRandomInt } from '../../logic/Random/Randomness'; // Corrected path

/**
 * Calculates the outcome of a mission based on player stats and mission requirements.
 * @param {Object} player - The current player object.
 * @param {Object} relationships - The current relationships object.
 * @param {Object} missionStage - The mission stage object being attempted.
 * @returns {{player: Object, relationships: Object, outcomeText: string, success: boolean}}
 * An object containing the updated player, relationships, outcome message, and success status.
 */
export const resolveMissionOutcome = (player, relationships, missionStage) => {
    let updatedPlayer = { ...player };
    let updatedRelationships = { ...relationships };
    let success = false;
    let outcomeText = "Something unexpected happened during the mission.";
    let consequencesToApply = [];

    // Basic success/failure determination based on requiredStats
    const meetsRequirements = (p, ms) => {
        if (!ms.requiredStats) return true; // No requirements, always success

        let totalPlayerSkill = 0;
        let totalRequiredSkill = 0;

        for (const stat in ms.requiredStats) {
            totalPlayerSkill += p[stat] || 0;
            totalRequiredSkill += ms.requiredStats[stat];
        }

        // Add a random factor to make it less predictable
        const randomFactor = getRandomInt(-10, 10); // +/- 10 points
        const playerEffectiveness = totalPlayerSkill + randomFactor;

        // Simple check: player's overall effectiveness vs. mission difficulty
        // You can make this much more complex (e.g., individual stat checks, specific jutsu checks)
        return playerEffectiveness >= totalRequiredSkill;
    };

    if (meetsRequirements(player, missionStage)) {
        success = true;
        outcomeText = missionStage.outcomes.success.text;
        consequencesToApply = missionStage.outcomes.success.consequences || [];
    } else {
        success = false;
        outcomeText = missionStage.outcomes.failure.text;
        consequencesToApply = missionStage.outcomes.failure.consequences || [];
    }

    // Apply consequences
    const { player: finalPlayer, relationships: finalRelationships } =
        applyChoiceConsequences(updatedPlayer, updatedRelationships, consequencesToApply);

    // Emit event for mission completion
    emit(GAME_EVENTS.MISSION_COMPLETED, missionStage.id, success, outcomeText);

    return {
        player: finalPlayer,
        relationships: finalRelationships,
        outcomeText,
        success
    };
};

// You can add more complex outcome logic here, such as:
// - Critical success/failure
// - Specific outcomes based on choices made during the mission (if missions have choices)
// - Squad mate influence on mission outcome
