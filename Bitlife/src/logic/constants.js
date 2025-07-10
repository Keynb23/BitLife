// src/logic/constants.js

export const PLAYER_INITIAL_TEMPLATE = {
    age: 0,
    karma: 0,
};

export const PLAYER_STAT_RANGES = {
    health: { min: 0, max: 100 }, // Adjusted min to 0 for consistency with death logic
    happiness: { min: 0, max: 100 }, // Adjusted min/max for a full range
    smarts: { min: 0, max: 100 },
    looks: { min: 0, max: 100 },
    money: { min: 0, max: Infinity }, // Money can go very high
    morality: { min: 0, max: 100 }, // Renamed karma to morality as per App.js state
    chakra: { min: 0, max: 100 }, // Adjusted min to 0
    ninjutsuSkill: { min: 0, max: 100 }, // Skills from 0 to 100
    taijutsuSkill: { min: 0, max: 100 },
};

// --- Age and Life Cycle Constants ---
export const AGE_UP_INCREMENT = 1; // How many years pass per turn
export const ADULT_AGE = 18; // Age at which character becomes an adult
export const ELDERLY_AGE = 60; // Age at which character starts experiencing age-related decline
export const MAX_NATURAL_LIFESPAN = 90; // Max age for natural death (can be extended by health)

// Define age groups for scenario filtering and impact scaling
export const AGE_GROUPS = [
    { range: [0, 4], name: 'Toddler/Early Childhood', impactMultiplier: 0.5 },
    { range: [5, 9], name: 'Childhood', impactMultiplier: 0.8 },
    { range: [10, 12], name: 'Pre-Teen Shinobi', impactMultiplier: 1.0 },
    { range: [13, 16], name: 'Young Shinobi', impactMultiplier: 1.5 },
    { range: [17, 18], name: 'Adult Transition', impactMultiplier: 2.0 },
    { range: [19, Infinity], name: 'Adult Shinobi', impactMultiplier: 2.5 }, // For 19+
];

// --- Scenario and Choice Constants ---
export const NUM_CHOICES_PER_SCENARIO = 4; // As per your plan

// --- Mission Constants ---
export const NUM_MAIN_MISSION_ARCS = 3; // As per your plan

// --- Relationship Constants ---
export const MAX_SQUAD_MATES = 2; // As per your plan
export const RELATIONSHIP_LEVELS = {
    STRANGER: 0,
    ACQUAINTANCE: 20,
    FRIEND: 50,
    BEST_FRIEND: 80,
    LOVER: 70, // Can be separate from friendship
    ENEMY: -50,
    ARCH_NEMESIS: -80,
};

// --- Stat Change Multipliers (for balancing) ---
// These can be used to scale the impact of choices
export const STAT_CHANGE_MULTIPLIERS = {
    SMALL: 5,
    MEDIUM: 10,
    LARGE: 20,
    HUGE: 30,
};

// --- Morality/Honor Change Multipliers ---
export const MORALITY_CHANGE_MULTIPLIERS = {
    SLIGHT: 5,
    MODERATE: 10,
    SIGNIFICANT: 20,
};

// --- Daily Stat Adjustments (New) ---
export const DAILY_STAT_ADJUSTMENTS = {
    health: { min: -2, max: 1 }, // Slight daily health changes
    happiness: { min: -3, max: 3 }, // More varied happiness changes
    smarts: { min: 0, max: 1 }, // Small, consistent growth
    looks: { min: -1, max: 1 }, // Subtle changes
    chakra: { min: 0, max: 2 }, // Chakra growth
    ninjutsuSkill: { min: 0, max: 1 }, // Skill growth
    taijutsuSkill: { min: 0, max: 1 }, // Skill growth
    money: { min: -50, max: 50 }, // Daily expenses/income fluctuations
};

// --- Game Over Messages ---
export const GAME_OVER_MESSAGES = {
    NATURAL_DEATH: "Your life reached its natural conclusion. You lived a full life.",
    ACCIDENTAL_DEATH: "An unexpected turn of events led to your untimely demise.",
    MISSION_DEATH: "You fell in the line of duty, a true shinobi till the end.",
    // Add more specific death messages as needed
};

// --- Paths for various data (if you load them from JSON files later) ---
// export const SCENARIOS_DATA_PATH = '/data/scenarios.json';
// export const MISSIONS_DATA_PATH = '/data/missions.json';
// export const NPC_NAMES_DATA_PATH = '/data/names.json';
