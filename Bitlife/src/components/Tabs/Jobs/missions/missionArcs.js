export const MISSION_ARCS = [
    {
        id: 'academy_graduation',
        name: 'Academy Graduation Arc',
        description: 'Your journey from academy student to a genin.',
        minAge: 10,
        maxAge: 12,
        stages: [
            {
                stageId: 'academy_test_1',
                name: 'Written Exam',
                type: 'exam',
                requiredStats: { smarts: 40 },
                outcomes: {
                    success: { text: "You aced the written exam!", statChanges: { smarts: 5 } },
                    failure: { text: "You struggled with the written exam.", statChanges: { smarts: -5, happiness: -5 } }
                }
            },
            {
                stageId: 'academy_test_2',
                name: 'Taijutsu Sparring',
                type: 'combat',
                requiredStats: { taijutsuSkill: 30, health: 60 },
                outcomes: {
                    success: { text: "Your taijutsu was impressive!", statChanges: { taijutsuSkill: 10, looks: 5 } },
                    failure: { text: "You were outmatched in sparring.", statChanges: { health: -10, happiness: -10 } }
                }
            },
            {
                stageId: 'academy_test_3',
                name: 'Ninjutsu Application',
                type: 'skill_test',
                requiredStats: { ninjutsuSkill: 30, chakra: 50 },
                outcomes: {
                    success: { text: "Your ninjutsu was flawless!", statChanges: { ninjutsuSkill: 10, chakra: 5 } },
                    failure: { text: "Your ninjutsu needs more work.", statChanges: { chakra: -5, smarts: -5 } }
                }
            },
            {
                stageId: 'graduation_exam',
                name: 'Graduation Exam: Clone Jutsu',
                type: 'final_exam',
                requiredStats: { ninjutsuSkill: 40, chakra: 60 },
                outcomes: {
                    success: { text: "You successfully performed the Clone Jutsu and graduated!", statChanges: { happiness: 20, karma: 5 }, nextStage: 'genin_life' },
                    failure: { text: "You failed the Clone Jutsu. You'll have to repeat the year.", statChanges: { happiness: -30, smarts: -10 }, nextStage: 'repeat_academy' }
                }
            }
        ]
    },
    {
        id: 'genin_missions',
        name: 'Genin Missions Arc',
        description: 'Taking on D-rank and C-rank missions as a new genin.',
        minAge: 12,
        stages: [
            {
                stageId: 'd_rank_cat_retrieval',
                name: 'D-Rank: Tora the Cat',
                type: 'simple_task',
                requiredStats: {}, // No specific stats needed for D-rank
                outcomes: {
                    success: { text: "You successfully retrieved Tora, despite her antics!", statChanges: { money: 100, happiness: 5 } },
                    failure: { text: "Tora escaped your grasp again. Mission failed.", statChanges: { money: -20, happiness: -5 } }
                }
            },
            {
                stageId: 'c_rank_bodyguard',
                name: 'C-Rank: Bridge Builder Protection',
                type: 'combat_escort',
                requiredStats: { ninjutsuSkill: 45, taijutsuSkill: 45, health: 70 },
                outcomes: {
                    success: { text: "You protected the bridge builder and completed a tough mission!", statChanges: { money: 500, karma: 10, happiness: 15 } },
                    failure: { text: "The mission was too dangerous. You barely escaped with your life.", statChanges: { health: -30, happiness: -20, money: -100 } }
                }
            },
            // Add more stages for this arc
        ]
    },
    {
        id: 'chunin_exams',
        name: 'Chunin Exams Arc',
        description: 'The ultimate test to become a Chunin.',
        minAge: 14,
        stages: [
            {
                stageId: 'chunin_written_exam',
                name: 'First Stage: Written Exam',
                type: 'exam',
                requiredStats: { smarts: 60 },
                outcomes: {
                    success: { text: "You passed the deceptive written exam!", statChanges: { smarts: 10, happiness: 5 } },
                    failure: { text: "You were caught cheating or couldn't answer the questions.", statChanges: { happiness: -15, smarts: -5 } }
                }
            },
            // Add more stages for the Chunin Exams (Forest of Death, Preliminaries, Finals)
        ]
    }
    // Add more main mission arcs as per your game's scope
];

/**
 * Retrieves a mission arc by its ID.
 * @param {string} arcId - The ID of the mission arc.
 * @returns {Object|undefined} The mission arc object, or undefined if not found.
 */
export const getMissionArc = (arcId) => {
    return MISSION_ARCS.find(arc => arc.id === arcId);
};

/**
 * Retrieves a specific stage within a mission arc.
 * @param {string} arcId - The ID of the mission arc.
 * @param {string} stageId - The ID of the stage within the arc.
 * @returns {Object|undefined} The stage object, or undefined if not found.
 */
export const getMissionStage = (arcId, stageId) => {
    const arc = getMissionArc(arcId);
    if (arc) {
        return arc.stages.find(stage => stage.stageId === stageId);
    }
    return undefined;
};
