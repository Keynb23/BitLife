// src/components/Tabs/player/Player.jsx
import React, { useState, useEffect } from 'react';
import { createNewPlayer } from '../profile/playerStats'; // Import the player creation logic
import { initializeRelationships } from '../../../logic/RelationshipLogic/relationshipIndex'; // Import relationship initialization
import { initializeMissionState } from '../Jobs/missions/missionArc'; // Import mission initialization

/**
 * Player component serves as the main display for the current player character's overview.
 * It also handles the initial creation of a new player and associated game states.
 * @param {Object} props - The component props.
 * @param {Object} props.player - The current player object from the game state.
 * @param {Function} props.setPlayer - Function to update the player object in the game state.
 * @param {Object} props.relationships - The current relationships object.
 * @param {Function} props.setRelationships - Function to update the relationships object.
 * @param {Object} props.missionState - The current mission state object.
 * @param {Function} props.setMissionState - Function to update the mission state object.
 */
const Player = ({ player, setPlayer, relationships, setRelationships, missionState, setMissionState }) => {
    // This component will primarily display the player's high-level information.
    // Detailed stats, legacy, jutsu, etc., will be handled by their respective tabs.

    // Effect to create a new player and initialize related states if no player exists
    useEffect(() => {
        if (!player || Object.keys(player).length === 0) {
            console.log("No player found, creating a new one...");
            const newPlayer = createNewPlayer();
            setPlayer(newPlayer);

            // Initialize relationships for the new player
            const initialRelationships = initializeRelationships(newPlayer);
            setRelationships(initialRelationships);

            // Initialize mission state for the new player
            const initialMissionState = initializeMissionState();
            setMissionState(initialMissionState);

            console.log("New player created:", newPlayer);
            console.log("Initial relationships:", initialRelationships);
            console.log("Initial mission state:", initialMissionState);
        }
    }, [player, setPlayer, setRelationships, setMissionState]); // Dependencies to re-run if player is reset

    if (!player || Object.keys(player).length === 0) {
        return (
            <div className="p-4 bg-gray-800 text-white min-h-screen flex items-center justify-center rounded-lg shadow-lg">
                <p className="text-xl text-gray-400">Loading new character...</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-800 text-white min-h-screen rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Your Current Character</h2>

            <div className="bg-gray-700 p-6 rounded-xl shadow-md w-full max-w-xl text-center">
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">
                    {player.firstName} {player.lastName}
                </h3>
                <p className="text-xl text-gray-300 mb-4">{player.clan} Clan</p>
                <p className="text-lg text-gray-400">Age: {player.age}</p>
                <p className="text-lg text-gray-400">Money: ¥{player.money.toLocaleString()}</p>

                {player.inheritedOtsutsukiTrait && (
                    <div className="mt-4 p-3 bg-purple-800 rounded-lg text-sm italic border border-purple-500">
                        <p className="font-bold text-purple-200">Rare Genetic Reawakening:</p>
                        <p className="text-purple-100">{player.inheritedOtsutsukiTrait.name}</p>
                        <p className="text-purple-300 text-xs">{player.inheritedOtsutsukiTrait.description}</p>
                    </div>
                )}

                <div className="mt-6">
                    <p className="text-gray-300 text-sm">
                        Navigate using the tabs above to view detailed stats, missions, relationships, and more.
                    </p>
                </div>
            </div>

            {/* In a full application, this component might also contain buttons for
                "New Game", "Load Game", etc., if it's part of a start screen.
                For now, it assumes the player object is managed by a parent component (like App.js). */}
        </div>
    );
};

export default Player;
