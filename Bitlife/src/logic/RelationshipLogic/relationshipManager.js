// logic/relationships/relationshipManager.jsx
import { RELATIONSHIP_LEVELS, PLAYER_STAT_RANGES } from '../constants';
import { emit, GAME_EVENTS } from '../game/gameEvents';

/**
 * This file manages the dynamics of relationships between the player and NPCs.
 * It includes functions for updating relationship scores and determining relationship status.
 */

/**
 * Updates the relationship score with a specific NPC.
 * Ensures the score stays within a defined range (e.g., -100 to 100).
 * @param {Object} npc - The NPC object whose relationship score is to be updated.
 * @param {number} amount - The amount to change the relationship score by (can be positive or negative).
 * @returns {Object} The updated NPC object.
 */
export const updateRelationship = (npc, amount) => {
    const updatedNpc = { ...npc }; // Create a copy to avoid direct mutation

    let newScore = updatedNpc.relationshipScore + amount;

    // Clamp the relationship score between -100 and 100 (or a custom range)
    newScore = Math.max(-100, Math.min(100, newScore));

    updatedNpc.relationshipScore = newScore;

    // Emit an event that a relationship has been updated
    emit(GAME_EVENTS.RELATIONSHIP_UPDATED, updatedNpc.id, newScore);

    return updatedNpc;
};

/**
 * Determines the current relationship status based on the relationship score.
 * @param {number} score - The relationship score.
 * @returns {string} A descriptive string for the relationship status (e.g., "Friend", "Enemy").
 */
export const getRelationshipStatus = (score) => {
    if (score >= RELATIONSHIP_LEVELS.BEST_FRIEND) return "Best Friend";
    if (score >= RELATIONSHIP_LEVELS.FRIEND) return "Friend";
    if (score >= RELATIONSHIP_LEVELS.ACQUAINTANCE) return "Acquaintance";
    if (score >= RELATIONSHIP_LEVELS.STRANGER) return "Stranger";
    if (score >= RELATIONSHIP_LEVELS.ENEMY) return "Enemy";
    return "Arch Nemesis"; // Below ENEMY threshold
};

// You can add more complex relationship logic here, such as:
// - Functions to check for specific relationship events (e.g., "become best friends")
// - Logic for relationship decay over time
// - Functions to handle breaking up, marriage, etc.
