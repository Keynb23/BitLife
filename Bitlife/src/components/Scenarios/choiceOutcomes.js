// src/components/Scenarios/choiceOutcomes.js

// Adjusted imports based on the provided file structure
import { updatePlayerStat } from '../../components/Tabs/profile/playerStats'; // Corrected path
import { updateMorality } from '../../logic/coreLogic/moralityCalculator'; // Corrected path
import { handleRelationshipUpdate } from '../../logic/RelationshipLogic/relationshipIndex';
import { emit, GAME_EVENTS } from '../../logic/coreLogic/gameEvents';
import { getRandomFloat } from '../../logic/Random/Randomness';
import { AGE_GROUPS } from '../../logic/constants'; // Corrected path

/**
 * Applies a list of consequences to the player and game state.
 * @param {Object} player - The current player object.
 * @param {Object} relationships - The current relationships object from the game state.
 * @param {Array<Object>} consequences - An array of consequence objects.
 * @returns {{player: Object, relationships: Object}} An object containing the updated player and relationships objects.
 */
export const applyChoiceConsequences = (player, relationships, consequences) => {
    let updatedPlayer = { ...player }; // Start with a copy of the player
    let updatedRelationships = { ...relationships }; // Start with a copy of relationships

    // Determine the impact multiplier based on player's current age
    const currentAgeGroup = AGE_GROUPS.find(group =>
        player.age >= group.range[0] && player.age <= group.range[1]
    );
    const impactMultiplier = currentAgeGroup ? currentAgeGroup.impactMultiplier : 1.0; // Default to 1.0 if no group found

    const validConsequences = Array.isArray(consequences) ? consequences : [];

    validConsequences.forEach(consequence => {
        // Check for a chance-based consequence
        if (consequence.chance !== undefined && getRandomFloat(0, 1) > consequence.chance) {
            // If chance fails, skip this consequence
            return;
        }

        switch (consequence.type) {
            case 'statChange':
                if (consequence.stat && typeof consequence.amount === 'number') {
                    // Apply age-based impact multiplier to stat changes
                    const adjustedAmount = Math.round(consequence.amount * impactMultiplier);
                    updatedPlayer = updatePlayerStat(updatedPlayer, consequence.stat, adjustedAmount);
                    emit(GAME_EVENTS.STAT_CHANGED, updatedPlayer, consequence.stat, adjustedAmount);
                }
                break;
            case 'karmaChange':
                if (typeof consequence.amount === 'number') {
                    // Apply age-based impact multiplier to karma changes
                    const adjustedAmount = Math.round(consequence.amount * impactMultiplier);
                    updatedPlayer = updateMorality(updatedPlayer, adjustedAmount);
                    emit(GAME_EVENTS.STAT_CHANGED, updatedPlayer, 'karma', adjustedAmount);
                }
                break;
            case 'relationshipChange':
                if (consequence.target && typeof consequence.amount === 'number') {
                    // Apply age-based impact multiplier to relationship changes
                    const adjustedAmount = Math.round(consequence.amount * impactMultiplier);
                    updatedRelationships = handleRelationshipUpdate(updatedRelationships, consequence.target, adjustedAmount);
                    // The handleRelationshipUpdate function should emit RELATIONSHIP_UPDATED event internally
                }
                break;
            case 'message':
                if (consequence.text) {
                    emit(GAME_EVENTS.MESSAGE_DISPLAYED, consequence.text); // Custom event for UI messages
                    console.log(`Game Message: ${consequence.text}`);
                }
                break;
            case 'triggerEvent':
                if (consequence.eventName) {
                    emit(consequence.eventName, ...(consequence.args || []));
                }
                break;
            case 'missionProgress':
                // Logic to advance mission state (will be handled by missions module)
                console.log(`Mission progress updated: ${consequence.details}`);
                break;
            case 'gameOver':
                emit(GAME_EVENTS.GAME_OVER, consequence.reason || "A choice led to your demise.");
                break;
            default:
                console.warn(`Unknown consequence type: ${consequence.type}`, consequence);
        }
    });

    return { player: updatedPlayer, relationships: updatedRelationships };
};
