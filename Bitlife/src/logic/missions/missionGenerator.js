import { getMissionArc, MISSION_ARCS } from './missionArcs';

/**
 * Selects the next appropriate mission for the player.
 * This function will need to be intelligent about which mission to offer next,
 * considering the player's current progress in an arc, age, and stats.
 * @param {Object} player - The current player object.
 * @param {Object} currentMissionState - The current state of missions (e.g., { currentArcId: '...', currentStageIndex: ... }).
 * @returns {Object|null} The next mission stage object, or null if no mission is available.
 */
export const getNextMission = (player, currentMissionState) => {
    // For simplicity, let's assume we are progressing through the first arc for now.
    // In a full game, currentMissionState would track progress through each arc.

    let targetArc = null;
    let targetStage = null;

    if (!currentMissionState || !currentMissionState.currentArcId) {
        // If no current mission state, try to find the first eligible arc
        targetArc = MISSION_ARCS.find(arc => player.age >= arc.minAge && player.age <= arc.maxAge);
        if (targetArc) {
            targetStage = targetArc.stages[0]; // Start with the first stage of the first eligible arc
            currentMissionState = {
                currentArcId: targetArc.id,
                currentStageIndex: 0,
                status: 'pending' // 'pending', 'active', 'completed'
            };
        }
    } else {
        // Continue with the current arc
        targetArc = getMissionArc(currentMissionState.currentArcId);
        if (targetArc) {
            const nextStageIndex = currentMissionState.currentStageIndex + 1;
            if (nextStageIndex < targetArc.stages.length) {
                targetStage = targetArc.stages[nextStageIndex];
                currentMissionState.currentStageIndex = nextStageIndex;
                currentMissionState.status = 'pending';
            } else {
                // Current arc completed, look for next eligible arc
                const currentArcIndex = MISSION_ARCS.findIndex(arc => arc.id === targetArc.id);
                if (currentArcIndex !== -1 && currentArcIndex + 1 < MISSION_ARCS.length) {
                    targetArc = MISSION_ARCS[currentArcIndex + 1];
                    // Check if player meets age requirement for the next arc
                    if (player.age >= targetArc.minAge && player.age <= targetArc.maxAge) {
                        targetStage = targetArc.stages[0];
                        currentMissionState = {
                            currentArcId: targetArc.id,
                            currentStageIndex: 0,
                            status: 'pending'
                        };
                    } else {
                        targetArc = null; // No more eligible arcs
                        targetStage = null;
                    }
                } else {
                    targetArc = null; // All arcs completed
                    targetStage = null;
                }
            }
        }
    }

    if (targetStage) {
        return {
            mission: targetStage,
            arcId: targetArc.id,
            stageIndex: currentMissionState.currentStageIndex,
            missionState: currentMissionState // Return updated mission state
        };
    }

    return null; // No mission available
};


/**
 * Checks if the player meets the required stats for a given mission stage.
 * @param {Object} player - The current player object.
 * @param {Object} missionStage - The mission stage object.
 * @returns {boolean} True if player meets requirements, false otherwise.
 */
export const meetsMissionRequirements = (player, missionStage) => {
    if (!missionStage.requiredStats) {
        return true; // No specific requirements, so always true
    }

    for (const stat in missionStage.requiredStats) {
        if (player[stat] === undefined || player[stat] < missionStage.requiredStats[stat]) {
            console.log(`Player ${player[stat]} < required ${missionStage.requiredStats[stat]} for ${stat}`);
            return false; // Player does not meet requirement for this stat
        }
    }
    return true; // All requirements met
};

// You might add functions here for:
// - Generating random side quests
// - Handling mission acceptance/rejection
