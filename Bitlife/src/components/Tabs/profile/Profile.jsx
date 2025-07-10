// src/components/Tabs/profile/Profile.jsx
import React from 'react';
import { getMoralityStatus } from '../../../logic/coreLogic/moralityCalculator'; // Adjusted path
import { PLAYER_STAT_RANGES } from '../../../logic/constants'; // Adjusted path

/**
 * Profile component displays the player's current stats, name, rank, money,
 * and provides navigation to the Legacy page.
 * @param {Object} props - The component props.
 * @param {Object} props.player - The current player object.
 * @param {Function} props.onTabChange - Callback function to change the active tab in the main App.
 */
const Profile = ({ player, onTabChange }) => {
    if (!player) {
        return (
            <div className="p-4 bg-gray-800 text-white min-h-screen flex items-center justify-center rounded-lg shadow-lg">
                <p className="text-xl text-gray-400">No player data available. Start a new game!</p>
            </div>
        );
    }

    // Determine player's rank (placeholder logic)
    // This can be expanded with more complex ranking based on missions completed, age, stats, etc.
    const getPlayerRank = (playerAge) => {
        if (playerAge < 12) return "Academy Student";
        if (playerAge >= 12 && playerAge < 14 && player.ninjutsuSkill >= 40 && player.taijutsuSkill >= 40) return "Genin";
        if (playerAge >= 14 && player.ninjutsuSkill >= 60 && player.taijutsuSkill >= 60 && player.smarts >= 50) return "Chunin";
        if (playerAge >= 18 && player.ninjutsuSkill >= 80 && player.taijutsuSkill >= 80 && player.chakra >= 70) return "Jonin";
        if (playerAge >= 25 && player.smarts >= 90 && player.chakra >= 90) return "Elite Jonin";
        return "Villager"; // Default if not a ninja yet or not meeting criteria
    };

    const playerRank = getPlayerRank(player.age);
    const moralityStatus = getMoralityStatus(player); // Get morality status

    const statsToDisplay = [
        { name: 'Health', value: player.health, range: PLAYER_STAT_RANGES.health },
        { name: 'Happiness', value: player.happiness, range: PLAYER_STAT_RANGES.happiness },
        { name: 'Smarts', value: player.smarts, range: PLAYER_STAT_RANGES.smarts },
        { name: 'Looks', value: player.looks, range: PLAYER_STAT_RANGES.looks },
        { name: 'Chakra', value: player.chakra, range: PLAYER_STAT_RANGES.chakra },
        { name: 'Ninjutsu Skill', value: player.ninjutsuSkill, range: PLAYER_STAT_RANGES.ninjutsuSkill },
        { name: 'Taijutsu Skill', value: player.taijutsuSkill, range: PLAYER_STAT_RANGES.taijutsuSkill },
    ];

    // Helper for stat bar color
    const getStatColor = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage > 75) return 'bg-green-500';
        if (percentage > 50) return 'bg-yellow-500';
        if (percentage > 25) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="p-4 bg-gray-800 text-white min-h-screen rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Your Profile</h2>

            <div className="bg-gray-700 p-6 rounded-xl shadow-md w-full max-w-2xl mb-6">
                <h3 className="text-2xl font-semibold mb-3 text-blue-300">
                    {player.firstName} {player.lastName} ({player.clan} Clan)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <p><span className="font-bold">Age:</span> {player.age}</p>
                    <p><span className="font-bold">Rank:</span> {playerRank}</p>
                    <p><span className="font-bold">Money:</span> ¥{player.money.toLocaleString()}</p>
                    <p><span className="font-bold">Morality:</span> {moralityStatus}</p>
                </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-xl shadow-md w-full max-w-2xl mb-6">
                <h3 className="text-2xl font-semibold mb-3 text-blue-300">Stats</h3>
                <div className="grid grid-cols-1 gap-4">
                    {statsToDisplay.map(stat => (
                        <div key={stat.name} className="flex items-center mb-2">
                            <span className="w-1/3 font-semibold text-lg">{stat.name}:</span>
                            <div className="w-2/3 bg-gray-600 rounded-full h-4 relative">
                                <div
                                    className={`h-full rounded-full ${getStatColor(stat.value, stat.range.max)}`}
                                    style={{ width: `${(stat.value / stat.range.max) * 100}%` }}
                                ></div>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                    {stat.value} / {stat.range.max}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <button
                    className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                    onClick={() => onTabChange('legacy')} // Assuming 'legacy' is the key for the Legacy tab
                >
                    View Legacy
                </button>
            </div>
        </div>
    );
};

export default Profile;
