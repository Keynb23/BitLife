const listeners = {}; // Stores event listeners: { 'eventName': [callback1, callback2] }

/**
 * Registers a callback function to be executed when a specific event is triggered.
 * @param {string} eventName - The name of the event to listen for.
 * @param {Function} callback - The function to call when the event occurs.
 */
export const on = (eventName, callback) => {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
};

/**
 * Unregisters a callback function from an event.
 * @param {string} eventName - The name of the event to stop listening for.
 * @param {Function} callback - The function to remove.
 */
export const off = (eventName, callback) => {
    if (listeners[eventName]) {
        listeners[eventName] = listeners[eventName].filter(cb => cb !== callback);
    }
};

/**
 * Triggers an event, executing all registered callbacks for that event.
 * Any additional arguments passed will be forwarded to the callbacks.
 * @param {string} eventName - The name of the event to trigger.
 * @param {...any} args - Arguments to pass to the event listeners.
 */
export const emit = (eventName, ...args) => {
    if (listeners[eventName]) {
        listeners[eventName].forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in event listener for ${eventName}:`, error);
            }
        });
    }
};

// --- Common Game Events (Constants for event names) ---
export const GAME_EVENTS = {
    PLAYER_AGED: 'playerAged',                  // Triggered when player's age increases
    STAT_CHANGED: 'statChanged',                // Triggered when any player stat changes
    SCENARIO_PRESENTED: 'scenarioPresented',    // Triggered when a new scenario is shown
    CHOICE_MADE: 'choiceMade',                  // Triggered after player makes a choice
    RELATIONSHIP_UPDATED: 'relationshipUpdated',// Triggered when a relationship changes
    MISSION_STARTED: 'missionStarted',          // Triggered when a new mission begins
    MISSION_COMPLETED: 'missionCompleted',      // Triggered when a mission ends
    GAME_OVER: 'gameOver',                      // Triggered when the game ends
    NEW_GAME_STARTED: 'newGameStarted',         // Triggered when a new game session begins
    // Add more specific events as your game grows
};
