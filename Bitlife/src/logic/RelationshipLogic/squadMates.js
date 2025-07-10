// src/logic/RelationshipLogic/squadMates.jsx
import { updateRelationship } from './relationshipManager';
import { MAX_SQUAD_MATES } from '../constants'; // Corrected path
import { generateNPC } from '../npc/npcGenerator'; // Assuming npcGenerator will be in src/logic/npc/npcGenerator.js

/**
 * This file manages the specific logic and interactions for the player's squad mates.
 * As per the game plan, there will be a limited number of squad mates (e.g., 2).
 */

// This array would typically be part of the main game state,
// but for demonstration, we'll define a placeholder structure.
// In a real game, the 'squad' array would be passed around in the game state.
// let currentSquadMates = []; // This would be managed by the main game state

/**
 * Generates initial squad mates for the player.
 * This should typically be called once at the start of a new game.
 * @param {number} playerAge - The current age of the player.
 * @returns {Array<Object>} An array of generated squad mate NPC objects.
 */
export const generateInitialSquadMates = (playerAge) => {
    const squad = [];
    for (let i = 0; i < MAX_SQUAD_MATES; i++) {
        squad.push(generateNPC('squadMate', playerAge));
    }
    return squad;
};

/**
 * Updates the relationship score with a specific squad mate.
 * This function wraps the generic updateRelationship for squad-specific context.
 * @param {Object} squadMate - The squad mate NPC object to update.
 * @param {number} amount - The amount to change the relationship score by.
 * @returns {Object} The updated squad mate NPC object.
 */
export const updateSquadMateRelationship = (squadMate, amount) => {
    return updateRelationship(squadMate, amount);
};

/**
 * Retrieves the current list of squad mates.
 * In a real application, this would read from the main game state.
 * For now, this is a placeholder.
 * @param {Array<Object>} currentSquad - The current array of squad mate objects from game state.
 * @returns {Array<Object>} The current squad mate objects.
 */
export const getSquadMates = (currentSquad) => {
    return currentSquad || []; // Return the passed squad or an empty array
};

// You might add more squad-specific functions here:
// - Functions to trigger squad-specific events
// - Logic for squad mate abilities or roles
// - Handling squad mate deaths or departures
