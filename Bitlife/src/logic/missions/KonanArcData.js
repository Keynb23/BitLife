// src/logic/missions/KonanArcData.js

/**
 * This file defines the specific stages and scenarios for the "Reader begging for Konan's life" mission arc.
 * This is a linear story arc, so choices primarily advance the narrative rather than branching widely.
 */

export const KonanArc = {
    id: 'konan_life_arc',
    name: 'A Friend\'s Sacrifice: Konan\'s Fate',
    description: 'A pivotal mission involving Konan, Tobi, and a desperate plea.',
    minAge: 17, // This arc seems appropriate for an older, more experienced shinobi
    maxAge: Infinity, // Can occur at any adult age
    stages: [
        {
            stageId: 'konan_part_1_confrontation',
            name: 'Confrontation at the River',
            text: `You found Konan confronting Tobi at the river. Her back stiffened at your voice. She wanted to keep you out of this fight. You knew she was prepared to blow herself up to take him down.`,
            choices: [
                {
                    text: "Shout: 'NOOOO WAITTT!!'",
                    consequences: [
                        { type: 'message', text: "You desperately shouted, catching their attention." },
                        { type: 'triggerStage', nextStageId: 'konan_part_1_offer_self' } // Advance to next narrative stage
                    ]
                }
            ],
            // No specific stat requirements to enter this stage, but future stages might have them
            requiredStats: {},
        },
        {
            stageId: 'konan_part_1_offer_self',
            name: 'A Desperate Offer',
            text: `Seeing Konan's state and Tobi's torn robe, you knew Konan had almost succeeded. You huffed, out of breath.`,
            choices: [
                {
                    text: "Beg Tobi: 'Please! Spare Konan’s life! I’ll join you!'",
                    consequences: [
                        { type: 'message', text: "Konan shouted your name, but Tobi seemed amused." },
                        { type: 'triggerStage', nextStageId: 'konan_part_1_tobi_demand' }
                    ]
                },
                {
                    text: "Try to pull Konan away.",
                    consequences: [
                        { type: 'message', text: "Konan resisted, her focus on Tobi. You couldn't move her." },
                        { type: 'statChange', stat: 'health', amount: -5 }, // Minor consequence for failed attempt
                        { type: 'triggerStage', nextStageId: 'konan_part_1_tobi_demand' } // Still leads to Tobi's demand
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_1_tobi_demand',
            name: 'Tobi\'s Bargain',
            text: `Tobi chuckled, "Konan made her choice to betray me. I'm not taking applicants. All I’m after is to collect the Rinnegan from Nagato’s dead body that Konan has hidden from me."`,
            choices: [
                {
                    text: "Plead: 'I know where it is! I’ll tell you. Please—'",
                    consequences: [
                        { type: 'message', text: "Paper clamped down on your mouth from Konan’s jutsu." },
                        { type: 'triggerStage', nextStageId: 'konan_part_1_konan_plea' }
                    ]
                },
                {
                    text: "Attempt to distract Tobi.",
                    consequences: [
                        { type: 'message', text: "Tobi's attention remained fixed on Konan. Your distraction failed." },
                        { type: 'statChange', stat: 'smarts', amount: -5 },
                        { type: 'triggerStage', nextStageId: 'konan_part_1_konan_plea' } // Still leads to Konan's plea
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_1_konan_plea',
            name: 'Konan\'s Desperation',
            text: `Konan whispered, "Y/N, don’t do this. This is what he wants." Tobi then offered, "I’ll spare your life Konan if you let the girl come with me. Choose wisely."`,
            choices: [
                {
                    text: "Plead with Konan: 'Let me go with him. You won’t be betraying Nagato’s and Yahiko’s wishes. I would. They would want you to stay and watch over Amegakure. You’re the city’s angel. I can’t lose you. Our village can’t lose you. Yahiko would want you to stay!'",
                    consequences: [
                        { type: 'message', text: "Konan's eyes showed a torn expression. She didn't want this, but you were determined." },
                        { type: 'statChange', stat: 'karma', amount: 10 }, // Sacrifice for a friend
                        { type: 'triggerStage', nextStageId: 'konan_part_1_outcome_sacrifice' }
                    ]
                },
                {
                    text: "Insist Konan fight him.",
                    consequences: [
                        { type: 'message', text: "Konan's resolve hardened, but your plea for her to fight seemed to steel her." },
                        { type: 'statChange', stat: 'karma', amount: -5 }, // Less selfless
                        { type: 'triggerStage', nextStageId: 'konan_part_1_outcome_fight_konan_dies' } // This path leads to Konan's death
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_1_outcome_sacrifice',
            name: 'The Sacrifice',
            text: `Konan, with a resolved expression, began to say, "Y/N, I'm sorry... You can't—" but she was cut off as you were suddenly swept away. Tobi absorbed you into his vortex, smiling.`,
            choices: [
                {
                    text: "Accept your fate.",
                    consequences: [
                        { type: 'message', text: "Tobi spoke confidently, 'Seems you were determined to create another outcome; willing to sacrifice your friend... Now I have the girl and soon I’ll have the Rinnegan.' He disappeared, leaving Konan alone." },
                        { type: 'statChange', stat: 'happiness', amount: -20 },
                        { type: 'statChange', stat: 'health', amount: -10 }, // Trauma of capture
                        { type: 'triggerStage', nextStageId: 'konan_part_2_captured' } // Move to Part II
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_1_outcome_fight_konan_dies',
            name: 'Konan\'s Final Stand (Game Over Path)',
            text: `Despite your pleas, Konan chose to fight. The battle was fierce, but ultimately, Konan fell. Tobi, victorious, collected the Rinnegan and left you with the crushing weight of loss.`,
            choices: [
                {
                    text: "Reflect on Konan's sacrifice.",
                    consequences: [
                        { type: 'message', text: "You are left alone, heartbroken and defeated. Konan is gone." },
                        { type: 'gameOver', reason: "Konan died protecting Nagato's will. Your journey ends here." }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_2_captured',
            name: 'Unfamiliar Territory',
            text: `You landed in an unfamiliar, vacant space, seemingly outside of Earth. "Konan... Konan betrayed you..." was the only coherent thought. Hurt overwhelmed your heart, but you understood her love for Nagato and Yahiko.`,
            choices: [
                {
                    text: "Contemplate Konan's actions.",
                    consequences: [
                        { type: 'message', text: "You knew you still had to protect Konan. She was like a sister, family." },
                        { type: 'statChange', stat: 'happiness', amount: -5 }, // Still sad
                        { type: 'triggerStage', nextStageId: 'konan_part_2_tobi_demand' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_2_tobi_demand',
            name: 'Tobi\'s Unsympathetic Demand',
            text: `Tobi appeared. "Looks like I saved your life and I’m indebted to repayment. Now I need to know where Konan hid Nagato’s body."`,
            choices: [
                {
                    text: "Ask: 'Will you spare Konan?'",
                    consequences: [
                        { type: 'message', text: "Tobi responded, 'As long as she doesn’t interfere with my plans, I’ll let her live.'" },
                        { type: 'triggerStage', nextStageId: 'konan_part_2_reveal_location' }
                    ]
                },
                {
                    text: "Refuse to speak.",
                    consequences: [
                        { type: 'message', text: "Tobi's patience wore thin. He threatened Konan's life again." },
                        { type: 'statChange', stat: 'health', amount: -5 }, // Stress
                        { type: 'triggerStage', nextStageId: 'konan_part_2_reveal_location' } // Forced to reveal anyway
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_2_reveal_location',
            name: 'The Painful Revelation',
            text: `You wiped away tears and told Tobi where Konan had hidden Yahiko and Nagato’s bodies. "Ah, so that’s where she’s hidden the Rinnegan," Tobi muttered.`,
            choices: [
                {
                    text: "Ask: 'What do you want with Nagato’s Rinnegan?'",
                    consequences: [
                        { type: 'message', text: "Tobi's Sharingan connected with your eyes. 'Don’t bother concerning yourself with such trivial matters. You might not live long anyways.' He smirked." },
                        { type: 'statChange', stat: 'happiness', amount: -10 }, // Fear
                        { type: 'triggerStage', nextStageId: 'konan_part_2_outcome_alone' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_2_outcome_alone',
            name: 'Left to Contemplate',
            text: `Tobi soon absorbed himself into a vortex, leaving you alone in the cool blankness. "Prove your usefulness to me and you may live long enough to see the perfection of the world I will create."`,
            choices: [
                {
                    text: "Contemplate Tobi's words.",
                    consequences: [
                        { type: 'message', text: "You were left to contemplate all that had happened, your new reality sinking in." },
                        { type: 'statChange', stat: 'smarts', amount: 5 }, // Gained some understanding
                        { type: 'triggerEvent', eventName: 'KONAN_ARC_PART_II_COMPLETE' } // Signal end of this part
                    ]
                }
            ],
            requiredStats: {},
        },
        // --- Part III: Sasuke's Healing and Kabuto's Arrival ---
        {
            stageId: 'konan_part_3_healing_sasuke',
            name: 'Healing Sasuke',
            text: `It had been a few weeks. Tobi tested your skills, concluding you weren’t an adequate fighter but excellent at medical ninjutsu and chakra control. He left you with a White Zetsu clone to attend to you. When he returned, he brought a young man full of malice and hate, demanding new eyes. Tobi commanded you to help transplant his brother's eyes. You were bothered by the floating eyeballs, but Tobi threatened Konan’s life again. After the transplant, you were instructed to tend to the man, Sasuke, who was impatient and rude.`,
            choices: [
                {
                    text: "Continue tending to Sasuke patiently.",
                    consequences: [
                        { type: 'message', text: "You continued your medical duties, enduring Sasuke's impatience." },
                        { type: 'statChange', stat: 'health', amount: -5 }, // Stress
                        { type: 'statChange', stat: 'smarts', amount: 5 }, // Medical experience
                        { type: 'triggerStage', nextStageId: 'konan_part_3_sasuke_impatience' }
                    ]
                }
            ],
            requiredStats: { ninjutsuSkill: 30, smarts: 40 }, // Medical ninja requirements
        },
        {
            stageId: 'konan_part_3_sasuke_impatience',
            name: 'Sasuke\'s Growing Frustration',
            text: `"How much longer?" Sasuke seethed. You knew better than to help him eat. "It shouldn’t be much longer. Your eyes have to heal and adjust." Sasuke snapped, "I'VE rested enough!"`,
            choices: [
                {
                    text: "Try to calm Sasuke.",
                    consequences: [
                        { type: 'message', text: "You attempted to soothe him, but Tobi's voice suddenly cut in: 'Now, now Sasuke… These things take time.'" },
                        { type: 'triggerStage', nextStageId: 'konan_part_3_tobi_intervenes' }
                    ]
                },
                {
                    text: "Remain silent and let Tobi handle it.",
                    consequences: [
                        { type: 'message', text: "You remained quiet as Tobi appeared, speaking to Sasuke." },
                        { type: 'triggerStage', nextStageId: 'konan_part_3_tobi_intervenes' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_3_tobi_intervenes',
            name: 'Tobi\'s Assessment',
            text: `Tobi ordered, "Y/N, come with me and leave young Sasuke to his supper." You followed him. "How is he doing?" Tobi questioned.`,
            choices: [
                {
                    text: "Answer obediently: 'It won’t take long now. Maybe another week.'",
                    consequences: [
                        { type: 'message', text: "Tobi rumbled, 'Hm, great,' his thoughts drifting." },
                        { type: 'triggerStage', nextStageId: 'konan_part_3_kabuto_arrival' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_3_kabuto_arrival',
            name: 'Kabuto\'s Unexpected Visit',
            text: `As you walked in silence, Tobi's thoughts wandered to the upcoming war. Suddenly, Zetsu appeared: "Kabuto is outside of the hideout." Tobi, astonished, turned to you: "Follow me and stay out of sight and don’t say a word." You hid behind a boulder.`,
            choices: [
                {
                    text: "Watch the exchange between Tobi and Kabuto.",
                    consequences: [
                        { type: 'message', text: "You watched intently as Kabuto greeted Tobi, calling him Madara." },
                        { type: 'statChange', stat: 'smarts', amount: 5 }, // Gaining intel
                        { type: 'triggerStage', nextStageId: 'konan_part_3_edo_tensei_reveal' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_3_edo_tensei_reveal',
            name: 'The Edo Tensei Reveal',
            text: `Tobi attacked, but Kabuto retreated, summoning coffins revealing five deceased Akatsuki members, including Nagato. "Now that I’ve gotten your attention. I did not come here to fight you. I want us to join forces. I’m willing to lend you my services for your upcoming war." Tobi was skeptical. "And what are you after in return?" "Sasuke Uchiha." You gasped.`,
            choices: [
                {
                    text: "Continue observing from hiding.",
                    consequences: [
                        { type: 'message', text: "Kabuto then summoned another coffin, revealing Madara Uchiha's reanimated body. Your heart froze. Your eyes immediately fell on Tobi. Who was he?" },
                        { type: 'statChange', stat: 'smarts', amount: 10 }, // Major revelation
                        { type: 'statChange', stat: 'happiness', amount: -5 }, // Shock
                        { type: 'triggerStage', nextStageId: 'konan_part_3_tobi_acceptance' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_3_tobi_acceptance',
            name: 'An Unlikely Alliance',
            text: `Tobi seemed stunned, then began to laugh deeply. "Kabuto Yakushi. I never expected for you to become such a formidable vessel... I will only fulfill your request after both you and Sasuke fulfill your parts in the war. Until then you can’t even see him." Kabuto's grin dropped.`,
            choices: [
                {
                    text: "Obey Tobi's gesture to return to chores.",
                    consequences: [
                        { type: 'message', text: "You nodded obediently, your mind racing with questions about Tobi's true identity." },
                        { type: 'triggerEvent', eventName: 'KONAN_ARC_PART_III_COMPLETE' } // Signal end of this part
                    ]
                }
            ],
            requiredStats: {},
        },
        // --- Part IV: Kabuto's Intrusion and Tobi's Distrust ---
        {
            stageId: 'konan_part_4_sasuke_frustration',
            name: 'Sasuke\'s Continued Frustration',
            text: `"Get OUT!! Take this shit food with you!" A tray came flying. Sasuke was not in a good mood, becoming more stir crazy. You knew you'd have to reinforce his chakra lines again.`,
            choices: [
                {
                    text: "Patiently leave the room and head down the hall.",
                    consequences: [
                        { type: 'message', text: "You ducked out, knowing you'd clean it later. You walked steadily down the hall." },
                        { type: 'triggerStage', nextStageId: 'konan_part_4_kabuto_confrontation' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_4_kabuto_confrontation',
            name: 'Kabuto\'s Interrogation',
            text: `Kabuto popped up. "Oh!!! Kabuto..." you screeched. He chuckled sinisterly. He had heard yelling and slyly inquired if it was Sasuke. You quickly shook your head, lying about echoing voices or bats. He looked unconvinced. "You’re from the Hidden Rain Village, aren’t you?"`,
            choices: [
                {
                    text: "Hesitantly nod.",
                    consequences: [
                        { type: 'message', text: "A sickly-sweet smile spread across his mouth. He then probed, 'What’s a Rain Ninja doing so far from home? You’re not a member of the Akatsuki... why are you here?'" },
                        { type: 'triggerStage', nextStageId: 'konan_part_4_kabuto_threat' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_4_kabuto_threat',
            name: 'Kabuto\'s Cryptic Warning',
            text: `You swallowed thickly, an uneasy feeling settling. "I am here to serve Leader-sama in whatever way he asks of me," you replied carefully. Kabuto snickered, "Ah, so the question is really what does Tobi hold over you?" Anxiety filled you. Suddenly Kabuto stepped forward, leaning into your ear.`,
            choices: [
                {
                    text: "Listen to his cryptic whisper: 'And what does Tobi see in you?'",
                    consequences: [
                        { type: 'message', text: "Before you could answer, Tobi's voice came from behind Kabuto. You gasped, feeling safer." },
                        { type: 'triggerStage', nextStageId: 'konan_part_4_tobi_intervenes_again' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_4_tobi_intervenes_again',
            name: 'Tobi\'s Interrogation',
            text: `"Kabuto," Tobi's voice was dark. "Pray tell me why you’re out of the confines I have allowed you in my hideout and why you are hassling my ward?" Kabuto gave a flimsy excuse about getting lost. Tobi, surprisingly, accepted the lie. "It can be a struggle... My apologies for that, I should have seen to it that you have an escort... Zetsu."`,
            choices: [
                {
                    text: "Hope Tobi doesn't assign you as Kabuto's escort.",
                    consequences: [
                        { type: 'message', text: "To your relief, Tobi assigned Zetsu. Kabuto's smile dropped as Zetsu split." },
                        { type: 'triggerStage', nextStageId: 'konan_part_4_tobi_anger' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_4_tobi_anger',
            name: 'Tobi\'s Unveiled Anger',
            text: `Kabuto and Zetsu departed. Tobi's stare fell on you. "What was said between you two?" His voice held distrust. You answered obediently. Tobi bit out a growl, commanding Zetsu to place another clone at Sasuke's door. He then performed hand signs, sealing off the hall to Sasuke's room with an Earth stone.`,
            choices: [
                {
                    text: "Allow Tobi to grip your arm and pull you into his Kamui.",
                    consequences: [
                        { type: 'message', text: "You were suddenly sucked up into his Kamui." },
                        { type: 'statChange', stat: 'health', amount: -5 }, // Disorientation
                        { type: 'triggerEvent', eventName: 'KONAN_ARC_PART_IV_COMPLETE' } // Signal end of this part
                    ]
                }
            ],
            requiredStats: {},
        },
        // --- Part V: Tobi's Rant and New Orders ---
        {
            stageId: 'konan_part_5_kamui_rant',
            name: 'Tobi\'s Frustration in Kamui',
            text: `You landed ungracefully in the infinite space of Kamui. "Damn that Kabuto!" Tobi cursed, rambling carelessly about Kabuto, Madara's body, and Sasuke. His anger lowered, and he no longer sounded like Madara. He sighed, "This is all getting rather complicated... It’ll be worth it in the end. There will be no more pain. I’ll make the world right for her and bring her back. I’ll see her again."`,
            choices: [
                {
                    text: "Observe Tobi, wondering about the girl he spoke of.",
                    consequences: [
                        { type: 'message', text: "You realized how important this was to him. His conviction was absolute." },
                        { type: 'statChange', stat: 'smarts', amount: 5 }, // Gaining insight
                        { type: 'triggerStage', nextStageId: 'konan_part_5_new_orders' }
                    ]
                }
            ],
            requiredStats: {},
        },
        {
            stageId: 'konan_part_5_new_orders',
            name: 'New Orders and a Question',
            text: `Tobi turned to you. "We’ll have to be more careful... I’m going to have you move Sasuke to a new room. Do not disclose his whereabouts to Kabuto... You’re also going to have to be more cautious in your daily routines and tasks. You are to speak as little as you can with that snake. Understood?" You complied. "Sasuke is recovering fast... it won’t be long until Sasuke will be able to use his eyes," you mentioned. "NO!" Tobi snapped. "You must make Sasuke think the treatment will take longer."`,
            choices: [
                {
                    text: "Agree to withhold the information, then ask: 'When Sasuke is well, may I be permitted to see Konan again?'",
                    consequences: [
                        { type: 'message', text: "Tobi blinked, pausing. He did not expect that question. The thought of Konan’s lifeless body popped into his mind." },
                        { type: 'triggerEvent', eventName: 'KONAN_ARC_PART_V_COMPLETE' } // Signal end of this arc part
                        // This is where the story currently ends. Future parts would be new stages.
                    ]
                }
            ],
            requiredStats: {},
        },
        // Add more stages here as the story continues (Part VI, etc.)
    ]
};
