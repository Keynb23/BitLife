// logic/scenarios/shinobiScenarios.jsx

/**
 * This file defines a collection of Naruto-themed scenarios that can occur in the game.
 * Each scenario includes text, choices, and potential consequences.
 */

export const shinobiScenarios = [
    {
        id: 'chunin-exam-prep',
        text: "The Chunin Exams are approaching. How do you prepare?",
        minAge: 12, // Example: occurs around academy graduation age
        choices: [
            {
                text: "Train intensely with your squad.",
                consequences: [
                    { type: 'statChange', stat: 'ninjutsuSkill', amount: 10 },
                    { type: 'statChange', stat: 'taijutsuSkill', amount: 10 },
                    { type: 'relationshipChange', target: 'squad', amount: 10 }, // Custom consequence type
                    { type: 'message', text: "Your bond with your squad strengthened, and your skills improved." }
                ]
            },
            {
                text: "Focus on solo study of jutsu scrolls.",
                consequences: [
                    { type: 'statChange', stat: 'smarts', amount: 15 },
                    { type: 'statChange', stat: 'ninjutsuSkill', amount: 15 },
                    { type: 'message', text: "You gained theoretical knowledge, but missed out on practical training." }
                ]
            },
            {
                text: "Relax and trust your current abilities.",
                consequences: [
                    { type: 'statChange', stat: 'happiness', amount: 10 },
                    { type: 'statChange', stat: 'health', amount: 5 },
                    { type: 'message', text: "You enjoyed your downtime, but felt a slight worry about the exams." }
                ]
            },
            {
                text: "Seek out a forbidden jutsu to gain an edge.",
                consequences: [
                    { type: 'statChange', stat: 'karma', amount: -20 },
                    { type: 'statChange', stat: 'ninjutsuSkill', amount: 25 },
                    { type: 'message', text: "You learned a powerful jutsu, but at what cost to your honor?" }
                ]
            }
        ]
    },
    {
        id: 'rogue-ninja-encounter',
        text: "While on patrol, you encounter a suspicious rogue ninja.",
        minAge: 14,
        choices: [
            {
                text: "Engage them in combat.",
                consequences: [
                    { type: 'statChange', stat: 'health', amount: -10, chance: 0.5 }, // 50% chance of health loss
                    { type: 'statChange', stat: 'taijutsuSkill', amount: 5 },
                    { type: 'karmaChange', amount: 5, condition: { stat: 'health', value: -10 } }, // Karma if you win
                    { type: 'message', text: "You fought bravely, but it was a tough battle." }
                ]
            },
            {
                text: "Attempt to gather intel discreetly.",
                consequences: [
                    { type: 'statChange', stat: 'smarts', amount: 10 },
                    { type: 'money', amount: 50 }, // Example: maybe you find something
                    { type: 'message', text: "You gathered valuable information without direct confrontation." }
                ]
            },
            {
                text: "Report their presence to your superior.",
                consequences: [
                    { type: 'karma', amount: 5 },
                    { type: 'message', text: "You followed protocol. The situation is now in capable hands." }
                ]
            },
            {
                text: "Ignore them and continue patrol.",
                consequences: [
                    { type: 'statChange', stat: 'karma', amount: -10 },
                    { type: 'message', text: "You chose to avoid conflict, but felt a sense of unease." }
                ]
            }
        ]
    },
    // Add more Naruto-specific scenarios here
];
