// logic/utils/randomness.js

/**
 * This file provides utility functions for generating random numbers
 * and making weighted random selections, essential for game events and scenarios.
 */

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum possible value.
 * @param {number} max - The maximum possible value.
 * @returns {number} A random integer.
 */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random float between min (inclusive) and max (exclusive).
 * @param {number} min - The minimum possible value.
 * @param {number} max - The maximum possible value.
 * @returns {number} A random float.
 */
export const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
};

/**
 * Selects a random element from an array.
 * @param {Array<any>} arr - The array to select from.
 * @returns {any} A random element from the array.
 */
export const getRandomElement = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return undefined;
    }
    return arr[getRandomInt(0, arr.length - 1)];
};

/**
 * Selects an item based on a weighted probability.
 * Each item in the array should be an object with a 'weight' property.
 * Example: [{ item: 'Rare Item', weight: 10 }, { item: 'Common Item', weight: 90 }]
 * @param {Array<Object>} weightedItems - An array of objects, each with an 'item' and 'weight' property.
 * @returns {any} The selected item.
 */
export const getWeightedRandom = (weightedItems) => {
    if (!Array.isArray(weightedItems) || weightedItems.length === 0) {
        return undefined;
    }

    const totalWeight = weightedItems.reduce((sum, item) => sum + (item.weight || 0), 0);
    if (totalWeight === 0) {
        // Handle case where all weights are 0 or undefined
        return getRandomElement(weightedItems.map(item => item.item));
    }

    let randomNumber = getRandomFloat(0, totalWeight);

    for (let i = 0; i < weightedItems.length; i++) {
        const item = weightedItems[i];
        if (randomNumber < (item.weight || 0)) {
            return item.item;
        }
        randomNumber -= (item.weight || 0);
    }

    // Fallback in case of floating point inaccuracies or if no item is selected
    return getRandomElement(weightedItems.map(item => item.item));
};

/**
 * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
 * @param {Array<any>} array - The array to shuffle.
 * @returns {Array<any>} The shuffled array (same array instance).
 */
export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};
