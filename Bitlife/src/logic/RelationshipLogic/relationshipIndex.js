// src/logic/RelationshipLogic/relationshipIndex.js
// Assuming npcGenerator will be in src/logic/npc/npcGenerator.js for now
import { generateNPC } from '../npc/npcGenerator';
import { updateRelationship } from './relationshipManager';
import { getSquadMates, updateSquadMateRelationship } from './squadMates';
import { MAX_SQUAD_MATES } from '../constants';

/**
 * This file serves as the main entry point for all relationship-related logic.
 * It orchestrates functions from other relationship modules.
 */

/**
 * Initializes the relationships for a new game, including generating initial NPCs.
 * @param {Object} player - The initial player object.
 * @returns {Object} An object containing initial relationships (e.g., parents, initial squad).
 */
export const initializeRelationships = (player) => {
    const relationships = {};

    // Example: Generate parents
    relationships.parents = [
        generateNPC('parent', player.age),
        generateNPC('parent', player.age)
    ];

    // Example: Generate initial squad mates
    relationships.squad = [];
    for (let i = 0; i < MAX_SQUAD_MATES; i++) {
        relationships.squad.push(generateNPC('squadMate', player.age));
    }

    // You might also generate initial friends, rivals, etc., here.

    return relationships;
};

/**
 * Provides a consolidated function to update any relationship.
 * This function acts as a wrapper, calling specific managers.
 * @param {Object} relationships - The current relationships object from the game state.
 * @param {string} targetId - The ID of the NPC whose relationship is being updated.
 * @param {number} amount - The amount to change the relationship by.
 * @returns {Object} The updated relationships object.
*/
export const handleRelationshipUpdate = (relationships, targetId, amount) => {
    let updatedRelationships = { ...relationships };

    // Example: Check if targetId is a squad mate and update accordingly
    const squadMateIndex = updatedRelationships.squad.findIndex(sm => sm.id === targetId);
    if (squadMateIndex !== -1) {
        updatedRelationships.squad[squadMateIndex] = updateSquadMateRelationship(updatedRelationships.squad[squadMateIndex], amount);
    } else {
        // Fallback for other types of NPCs, or if a generic relationship manager exists
        // updatedRelationships = updateRelationship(updatedRelationships, targetId, amount);
        console.warn(`Relationship update attempted for unknown NPC ID: ${targetId}. Generic relationship manager not yet implemented.`);
    }

    return updatedRelationships;
};

// Re-export specific functions for direct access if needed
export { generateNPC, updateRelationship, getSquadMates, updateSquadMateRelationship };
