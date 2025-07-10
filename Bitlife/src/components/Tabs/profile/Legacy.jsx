// src/components/Tabs/profile/Legacy.jsx
import React, { useState } from 'react';
import { CLAN_DATA } from '../../../Lore/clans/clans'; // Corrected path to the new clans data file

/**
 * Legacy component displays the player's clan history and family tree (past lives).
 * It uses a tabbed interface for organization.
 * @param {Object} props - The component props.
 * @param {Object} props.player - The current player object, including their name, clan, and parents.
 * @param {Array<Object>} props.pastLives - An array of previous player characters, if the game supports lineage.
 */
const Legacy = ({ player, pastLives = [] }) => {
    const [activeTab, setActiveTab] = useState('clanHistory'); // 'clanHistory' or 'familyLegacy'

    const playerClanData = CLAN_DATA[player.clan] || {
        origin: "Origin unknown or not recorded.",
        notableMembers: ["No notable members recorded."]
    };

    return (
        <div className="p-4 bg-gray-800 text-white min-h-screen rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Your Legacy</h2>

            <div className="flex justify-center mb-6">
                <button
                    className={`px-6 py-3 rounded-l-lg font-semibold transition-colors duration-200 ${
                        activeTab === 'clanHistory'
                            ? 'bg-yellow-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-yellow-700 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('clanHistory')}
                >
                    Clan History
                </button>
                <button
                    className={`px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200 ${
                        activeTab === 'familyLegacy'
                            ? 'bg-yellow-600 text-white shadow-md'
                            : 'bg-gray-700 text-gray-300 hover:bg-yellow-700 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('familyLegacy')}
                >
                    Family Legacy
                </button>
            </div>

            <div className="bg-gray-700 p-6 rounded-xl shadow-md">
                {activeTab === 'clanHistory' && (
                    <div className="text-gray-200">
                        <h3 className="text-2xl font-semibold mb-3 text-blue-300">The {player.clan} Clan</h3>
                        <p className="mb-4">
                            <span className="font-bold">Origin:</span> {playerClanData.origin}
                        </p>
                        <h4 className="text-xl font-semibold mb-2 text-purple-300">Notable Members:</h4>
                        <ul className="list-disc list-inside ml-4">
                            {playerClanData.notableMembers.length > 0 ? (
                                playerClanData.notableMembers.map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))
                            ) : (
                                <li>No specific notable members listed for this clan.</li>
                            )}
                        </ul>
                    </div>
                )}

                {activeTab === 'familyLegacy' && (
                    <div className="text-gray-200">
                        <h3 className="text-2xl font-semibold mb-3 text-blue-300">Your Immediate Family</h3>
                        <p className="mb-2">
                            <span className="font-bold">Current Character:</span> {player.firstName} {player.lastName} ({player.clan} Clan)
                        </p>

                        {player.parents && player.parents.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-xl font-semibold mb-2 text-purple-300">Parents:</h4>
                                <ul className="list-disc list-inside ml-4">
                                    {player.parents.map((parent, index) => (
                                        <li key={index}>
                                            {parent.firstName} {parent.lastName} ({parent.clan} Clan)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pastLives.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-xl font-semibold mb-2 text-purple-300">Past Lives (Ancestors):</h4>
                                <ul className="list-disc list-inside ml-4">
                                    {pastLives.map((life, index) => (
                                        <li key={index}>
                                            {life.firstName} {life.lastName} (Age {life.age}, {life.clan} Clan)
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-gray-400 text-sm">
                                    This list would expand as you continue playing as descendants!
                                </p>
                            </div>
                        )}

                        {!player.parents && pastLives.length === 0 && (
                            <p className="text-gray-400 italic">No family history recorded yet. Start your journey!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Legacy;
