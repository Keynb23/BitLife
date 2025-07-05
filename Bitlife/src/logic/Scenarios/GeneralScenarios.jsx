

export const generalScenarios = [
    {
        id: 'first-friend',
        text: "You met a new kid at the park. They seem friendly.",
        minAge: 5, // This scenario can appear from age 5
        maxAge: 8, // up to age 8
        choices: [
            {
                text: "Invite them to play.",
                consequences: [
                    { type: 'statChange', stat: 'happiness', amount: 10 },
                    { type: 'relationshipChange', target: 'new_friend_id', amount: 15 }, // Example: generate a new friend NPC
                    { type: 'message', text: "You made a new friend!" }
                ]
            },
            {
                text: "Ignore them.",
                consequences: [
                    { type: 'message', text: "You kept to yourself." }
                ]
            }
        ]
    },{

        id: 'found-money',
        text: "You found some money on the street.",
        minAge: 6, // Example: only occurs if player is at least 6 years old
        choices: [
            {
                text: "Pick it up and keep it.",
                consequences: [
                    { type: 'statChange', stat: 'money', amount: 50 },
                    { type: 'karmaChange', amount: -5 }, // Changed to karmaChange
                    { type: 'message', text: "You gained 💰50, but felt a slight pang of guilt." }
                ]
            },
            {
                text: "Look for the owner.",
                consequences: [
                    { type: 'karmaChange', amount: 10 }, // Changed to karmaChange
                    { type: 'message', text: "You couldn't find the owner, but felt good about trying." }
                ]
            },
            {
                text: "Leave it there.",
                consequences: [
                    { type: 'message', text: "You left the money, feeling indifferent." }
                ]
            },
            {
                text: "Donate it to charity.",
                consequences: [
                    { type: 'karmaChange', amount: 15 }, // Changed to karmaChange
                    { type: 'message', text: "You donated the money to a local charity. Good karma!" }
                ]
            }
        ]
    },
    {
        id: 'sick-day',
        text: "You woke up feeling unwell. You have a fever.",
        choices: [
            {
                text: "Go to the doctor.",
                consequences: [
                    { type: 'statChange', stat: 'money', amount: -100 },
                    { type: 'statChange', stat: 'health', amount: 20 },
                    { type: 'message', text: "The doctor helped you feel better, but it cost you." }
                ]
            },
            {
                text: "Try to tough it out at home.",
                consequences: [
                    { type: 'statChange', stat: 'health', amount: -15 },
                    { type: 'statChange', stat: 'happiness', amount: -10 },
                    { type: 'message', text: "You struggled through the day, feeling worse." }
                ]
            },
            {
                text: "Ask a friend for home remedies.",
                consequences: [
                    { type: 'statChange', stat: 'health', amount: 5 },
                    { type: 'statChange', stat: 'happiness', amount: 5 },
                    { type: 'message', text: "Your friend's remedy helped a little, and you appreciated their care." }
                ]
            },
            {
                text: "Ignore it and go about your day.",
                consequences: [
                    { type: 'statChange', stat: 'health', amount: -25 },
                    { type: 'message', text: "Your condition worsened. You should have taken care of yourself." }
                ]
            }
        ]
    },
    {
        id: 'school-bully',
        text: "A bully at school is picking on a younger kid.",
        minAge: 7,
        maxAge: 16,
        choices: [
            {
                text: "Stand up to the bully.",
                consequences: [
                    { type: 'karmaChange', amount: 15 }, // Changed to karmaChange
                    { type: 'statChange', stat: 'smarts', amount: 10 }, // Changed to existing stat for simplicity
                    { type: 'message', text: "You stood up for the kid. The bully backed down." }
                ]
            },
            {
                text: "Report the bully to a teacher.",
                consequences: [
                    { type: 'karmaChange', amount: 5 }, // Changed to karmaChange
                    { type: 'message', text: "The teacher handled the situation. You did the right thing." }
                ]
            },
            {
                text: "Ignore it and walk away.",
                consequences: [
                    { type: 'karmaChange', amount: -10 }, // Changed to karmaChange
                    { type: 'statChange', stat: 'happiness', amount: -5 },
                    { type: 'message', text: "You felt bad for not intervening." }
                ]
            },
            {
                text: "Join the bully.",
                consequences: [
                    { type: 'karmaChange', amount: -30 }, // Changed to karmaChange
                    { type: 'statChange', stat: 'happiness', amount: -15 },
                    { type: 'message', text: "You joined in the bullying. You felt a sense of shame." }
                ]
            }
        ]
    },
    // Add more general scenarios here
];
    