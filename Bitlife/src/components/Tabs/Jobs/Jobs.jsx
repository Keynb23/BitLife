// src/components/Tabs/Jobs/Jobs.jsx
import React from "react";
import { MISSION_ARCS, KonanArc } from "./missions/KonanArcData"; // Import mission data

/**
 * Jobs component displays available mission arcs to the player.
 * In a full game, this would also allow players to select and undertake missions,
 * but for now, it serves as an informational display.
 * @param {Object} props - The component props.
 * @param {Object} props.player - The current player object, used to check age for mission eligibility.
 */
const Jobs = ({ player }) => {
  // Combine all mission arcs into a single array for display
  const allAvailableArcs = [
    ...MISSION_ARCS,
    KonanArc, // Include the Konan Arc
  ];

  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Available Missions
      </h2>

      {allAvailableArcs.length === 0 ? (
        <p className="text-center text-gray-400">
          No mission arcs currently available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAvailableArcs.map((arc) => {
            // Check if the player meets the minimum age requirement for the arc
            const isEligible = player.age >= arc.minAge;
            const eligibilityText = isEligible
              ? "Eligible"
              : `Requires Age ${arc.minAge}`;
            const eligibilityColor = isEligible
              ? "text-green-400"
              : "text-red-400";

            return (
              <div
                key={arc.id}
                className={`bg-gray-700 p-6 rounded-xl shadow-md border-2 ${
                  isEligible ? "border-yellow-500" : "border-gray-600"
                } hover:shadow-xl transition-shadow duration-300`}
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">
                  {arc.name}
                </h3>
                <p className="text-gray-300 mb-4">{arc.description}</p>
                <div className="text-sm font-medium">
                  <span className={eligibilityColor}>{eligibilityText}</span>
                  {arc.maxAge !== Infinity && (
                    <span className="ml-2 text-gray-400">
                      (Up to Age {arc.maxAge})
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-purple-300 mb-2">
                    Stages:
                  </h4>
                  <ul className="list-disc list-inside text-gray-400">
                    {arc.stages.map((stage, index) => (
                      <li key={stage.stageId} className="mb-1">
                        <span className="font-semibold">{stage.name}</span>
                        {stage.requiredStats &&
                          Object.keys(stage.requiredStats).length > 0 && (
                            <span className="text-xs ml-2 italic">
                              (Requires:{" "}
                              {Object.entries(stage.requiredStats)
                                .map(([stat, value]) => `${stat}: ${value}`)
                                .join(", ")}
                              )
                            </span>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* In a future iteration, you might add a "Start Mission" button here
                                    that triggers the mission logic in the main game loop. */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Jobs;
