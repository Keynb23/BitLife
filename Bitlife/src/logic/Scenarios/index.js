import { getWeightedRandom, shuffleArray } from '../Random/Randomness';
import { NUM_CHOICES_PER_SCENARIO, AGE_GROUPS } from '../constants'; // Corrected path: lowercase 'c'
import { generalScenarios } from './generalScenarios';
import { shinobiScenarios } from './ShinobiScenarios';
import { KonanArc } from '../missions/KonanArcData'; // NEW: Import the KonanArc

const allScenarios = [
    ...generalScenarios,
    ...shinobiScenarios,
    ...KonanArc.stages,
];

// A simple in-memory tracker for recently played scenarios to reduce immediate repetition
// This would ideally be part of the persistent game state for long-term tracking.
let recentlyPlayedScenarioIds = [];
const RECENT_SCENARIO_MEMORY_SIZE = 5; // Remember the last 5 scenarios

/**
 * Selects a random scenario from the available pool based on player age and prevents immediate repetition.
 * It also shuffles the choices for variety.
 * @param {Object} player - The current player object (for context-aware scenario selection).
 * @returns {Object|null} A randomly selected scenario object, or null if no scenarios are available.
 */
export const getRandomScenario = (player) => {
    if (allScenarios.length === 0) {
        console.warn("No scenarios defined. Please add scenarios to generalScenarios.js or ShinobiScenarios.js.");
        return null;
    }

    // Determine the current age group to filter scenarios
    const currentAgeGroup = AGE_GROUPS.find(group =>
        player.age >= group.range[0] && player.age <= group.range[1]
    );

    let availableScenarios = allScenarios.filter(scenario => {
        // Filter by age range
        const scenarioMinAge = scenario.minAge !== undefined ? scenario.minAge : 0;
        const scenarioMaxAge = scenario.maxAge !== undefined ? scenario.maxAge : Infinity;

        const isInAgeRange = player.age >= scenarioMinAge && player.age <= scenarioMaxAge;

        // Filter out recently played scenarios
        const isRecentlyPlayed = recentlyPlayedScenarioIds.includes(scenario.id);

        // You can add more complex filtering here based on player stats, relationships, etc.
        // For example, if scenario.requiredStats && !meetsRequirements(player, scenario.requiredStats) return false;

        return isInAgeRange && !isRecentlyPlayed;
    });

    // If no unique scenarios are left for the age group, reset the recently played list
    // or allow some repetition to prevent infinite loops.
    if (availableScenarios.length === 0 && allScenarios.length > 0) {
        console.warn("No unique scenarios available for current age group. Resetting recently played list.");
        recentlyPlayedScenarioIds = []; // Reset the memory
        // Re-filter without the "recently played" constraint
        availableScenarios = allScenarios.filter(scenario => {
            const scenarioMinAge = scenario.minAge !== undefined ? scenario.minAge : 0;
            const scenarioMaxAge = scenario.maxAge !== undefined ? scenario.maxAge : Infinity;
            return player.age >= scenarioMinAge && player.age <= scenarioMaxAge;
        });

        // If still no scenarios, return a fallback
        if (availableScenarios.length === 0) {
            console.warn("Still no scenarios available after resetting memory.");
            return {
                id: 'no-scenario',
                text: "Today was uneventful. (No suitable scenarios found)",
                choices: [
                    { text: "Continue", consequences: [] },
                    { text: "Rest", consequences: [] },
                    { text: "Train", consequences: [] },
                    { text: "Meditate", consequences: [] },
                ]
            };
        }
    }


    // Use weighted random if scenarios have weights, otherwise just random element
    const selectedScenario = getWeightedRandom(
        availableScenarios.map(s => ({ item: s, weight: s.weight || 1 }))
    );

    if (selectedScenario) {
        // Add selected scenario to recently played list and manage its size
        recentlyPlayedScenarioIds.push(selectedScenario.id);
        if (recentlyPlayedScenarioIds.length > RECENT_SCENARIO_MEMORY_SIZE) {
            recentlyPlayedScenarioIds.shift(); // Remove the oldest one
        }

        // Ensure the scenario has the correct number of choices
        if (selectedScenario.choices.length < NUM_CHOICES_PER_SCENARIO) {
            // Pad with generic choices if not enough are defined
            const genericChoice = { text: "Do nothing", consequences: [] };
            while (selectedScenario.choices.length < NUM_CHOICES_PER_SCENARIO) {
                selectedScenario.choices.push(genericChoice);
            }
        }
        // Shuffle choices to ensure they don't always appear in the same order
        if (selectedScenario.choices) {
            selectedScenario.choices = shuffleArray(selectedScenario.choices);
        }
    }

    return selectedScenario;
};

// You might also add functions here to:
// - Get a specific scenario by ID
// - Add new scenarios dynamically (e.g., from user-generated content)
