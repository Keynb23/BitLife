// src/components/Tabs/player/Jutsu.jsx
import React from "react";
import { getRandomInt } from "../../../logic/Random/Randomness"; // Adjusted path

// --- Jutsu Skill Ranges (for initial generation and display) ---
export const JUTSU_SKILL_RANGES = {
  ninjutsuSkill: { min: 10, max: 50 },
  taijutsuSkill: { min: 10, max: 50 },
  genjutsuSkill: { min: 5, max: 40 }, // Added initial range for Genjutsu
  // Add ranges for other learnable sub-jutsu types if they have distinct skill values
  medicalNinjutsuSkill: { min: 0, max: 30 }, // Start lower, often learned later
  fuinjutsuSkill: { min: 0, max: 20 }, // Sealing Jutsu
  kenjutsuSkill: { min: 5, max: 35 }, // Sword Techniques
  senjutsuSkill: { min: 0, max: 5 }, // Sage Mode, very rare, starts low
};

// --- Jutsu Rank Mapping ---
// Maps a skill value to a ninja rank for display purposes
const getJutsuRank = (skillValue) => {
  if (skillValue >= 90) return "S-rank (Master)";
  if (skillValue >= 75) return "A-rank (Expert)";
  if (skillValue >= 50) return "B-rank (Proficient)";
  if (skillValue >= 30) return "C-rank (Competent)";
  if (skillValue >= 10) return "D-rank (Basic)";
  if (skillValue > 0) return "E-rank (Novice)";
  return "Unknown";
};

/**
 * Generates initial random Ninjutsu, Taijutsu, and Genjutsu skill values for a new character.
 * Other specialized skills start at 0 or a very low base.
 * @returns {{ninjutsuSkill: number, taijutsuSkill: number, genjutsuSkill: number, ...}} An object containing the randomized skill values.
 */
export const generateInitialJutsuSkills = () => {
  return {
    ninjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.ninjutsuSkill.min,
      JUTSU_SKILL_RANGES.ninjutsuSkill.max
    ),
    taijutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.taijutsuSkill.min,
      JUTSU_SKILL_RANGES.taijutsuSkill.max
    ),
    genjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.genjutsuSkill.min,
      JUTSU_SKILL_RANGES.genjutsuSkill.max
    ),
    medicalNinjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.medicalNinjutsuSkill.min,
      JUTSU_SKILL_RANGES.medicalNinjutsuSkill.max
    ),
    fuinjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.fuinjutsuSkill.min,
      JUTSU_SKILL_RANGES.fuinjutsuSkill.max
    ),
    kenjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.kenjutsuSkill.min,
      JUTSU_SKILL_RANGES.kenjutsuSkill.max
    ),
    senjutsuSkill: getRandomInt(
      JUTSU_SKILL_RANGES.senjutsuSkill.min,
      JUTSU_SKILL_RANGES.senjutsuSkill.max
    ),
    // Initialize other skills to 0 or a base if they are not part of the randomized initial set
    barrierNinjutsuSkill: 0,
    bukijutsuSkill: 0,
    chakraAbsorptionSkill: 0,
    chakraFlowSkill: 0,
    cloneTechniquesSkill: 0,
    cooperationNinjutsuSkill: 0,
    hidenSkill: 0,
    juinjutsuSkill: 0,
    jujutsuSkill: 0,
    kinjutsuSkill: 0, // Forbidden techniques, usually not a 'skill' to learn openly
    nintaijutsuSkill: 0,
    regenerationSkill: 0,
    reincarnationNinjutsuSkill: 0,
    scientificNinjaToolSkill: 0,
    shinjutsuSkill: 0,
    shurikenjutsuSkill: 0,
    spaceTimeNinjutsuSkill: 0,
  };
};

// Define all possible Jutsu types with descriptions
const ALL_JUTSU_TYPES = [
  {
    id: "ninjutsuSkill",
    name: "Ninjutsu",
    description:
      "Mystical arts using chakra and hand seals, covering a wide range of techniques from elemental releases to transformation.",
  },
  {
    id: "genjutsuSkill",
    name: "Genjutsu",
    description:
      "Illusionary techniques that manipulate the opponent's senses and chakra flow to create false realities.",
  },
  {
    id: "taijutsuSkill",
    name: "Taijutsu",
    description:
      "Physical combat techniques, relying on stamina, strength, and martial arts, often without the need for chakra or hand seals.",
  },
  {
    id: "barrierNinjutsuSkill",
    name: "Barrier Ninjutsu",
    description:
      "Techniques that create barriers or seals to defend an area or restrict movement.",
  },
  {
    id: "bukijutsuSkill",
    name: "Bukijutsu",
    description:
      "The art of using weaponry in combat, from kunai to specialized ninja tools.",
  },
  {
    id: "chakraAbsorptionSkill",
    name: "Chakra Absorption Techniques",
    description:
      "Abilities to absorb an opponent's chakra and use it as one's own.",
  },
  {
    id: "chakraFlowSkill",
    name: "Chakra Flow",
    description:
      "Techniques that involve flowing chakra through objects or one's body to enhance properties or gain new effects.",
  },
  {
    id: "cloneTechniquesSkill",
    name: "Clone Techniques",
    description:
      "Techniques to create copies of the user or their tools, used for distraction, combat, or reconnaissance.",
  },
  {
    id: "cooperationNinjutsuSkill",
    name: "Cooperation Ninjutsu",
    description:
      "Combination of two or more jutsu by multiple users to create a more powerful technique.",
  },
  {
    id: "fuinjutsuSkill",
    name: "Fūinjutsu",
    description:
      "Sealing techniques used to seal objects, living beings, or chakra within another object or person.",
  },
  {
    id: "hidenSkill",
    name: "Hiden (Secret Techniques)",
    description:
      "Secret techniques passed down through generations within specific clans or regions.",
  },
  {
    id: "juinjutsuSkill",
    name: "Juinjutsu (Cursed Seal Techniques)",
    description:
      "Techniques used to bring someone under the control of the user by applying a cursed seal.",
  },
  {
    id: "jujutsuSkill",
    name: "Jujutsu (Curse Techniques)",
    description:
      "Techniques that harm the enemy by cursing them, similar to Juinjutsu but without requiring a physical seal.",
  },
  {
    id: "kenjutsuSkill",
    name: "Kenjutsu (Sword Techniques)",
    description:
      "Techniques involving the use of swords, often combined with taijutsu or chakra flow.",
  },
  {
    id: "kinjutsuSkill",
    name: "Kinjutsu (Forbidden Techniques)",
    description:
      "Techniques that have been banned due to their inherent danger, ethical implications, or power.",
  },
  {
    id: "medicalNinjutsuSkill",
    name: "Medical Ninjutsu",
    description:
      "A branch of ninjutsu focused on healing, body manipulation, and extensive knowledge of anatomy and medicine.",
  },
  {
    id: "nintaijutsuSkill",
    name: "Nintaijutsu",
    description:
      "A fighting style that incorporates both ninjutsu and taijutsu, often seen with chakra-enhanced physical abilities.",
  },
  {
    id: "regenerationSkill",
    name: "Regeneration Techniques",
    description:
      "Jutsu focused on rapid self-healing or restoring physical damage.",
  },
  {
    id: "reincarnationNinjutsuSkill",
    name: "Reincarnation Ninjutsu",
    description:
      "Techniques involving the transfer of life force, often requiring the sacrifice of another life.",
  },
  {
    id: "scientificNinjaToolSkill",
    name: "Scientific Ninja Tool Techniques",
    description:
      "Jutsu utilizing technologically advanced weaponry and integrated tools.",
  },
  {
    id: "senjutsuSkill",
    name: "Senjutsu (Sage Techniques)",
    description:
      "Specialized jutsu that involve drawing natural energy into the body to create senjutsu chakra, greatly enhancing power.",
  },
  {
    id: "shinjutsuSkill",
    name: "Shinjutsu (Divine Techniques)",
    description:
      'Chakra-based techniques of the highest order, mainly used by Ōtsutsuki clan members, resembling "works of gods".',
  },
  {
    id: "shurikenjutsuSkill",
    name: "Shurikenjutsu",
    description:
      "Techniques involving the throwing of shuriken, kunai, and other bladed weapons, often enhanced with chakra.",
  },
  {
    id: "spaceTimeNinjutsuSkill",
    name: "Space–Time Ninjutsu",
    description:
      "Techniques that allow users to manipulate the space–time continuum for teleportation or dimensional travel.",
  },
];

/**
 * Jutsu component displays the player's known jutsu types and their proficiency,
 * as well as a list of other jutsu types that can potentially be learned.
 * @param {Object} props - The component props.
 * @param {Object} props.player - The current player object, including their jutsu skills.
 */
const Jutsu = ({ player }) => {
  // Filter known jutsu based on whether the player has a skill value greater than 0
  const knownJutsu = ALL_JUTSU_TYPES.filter(
    (jutsu) => player[jutsu.id] && player[jutsu.id] > 0
  );
  // Filter learnable jutsu (those not yet known or with 0 skill)
  const learnableJutsu = ALL_JUTSU_TYPES.filter(
    (jutsu) => !player[jutsu.id] || player[jutsu.id] === 0
  );

  // Helper for stat bar color (reused from Profile, can be a utility)
  const getSkillColor = (value) => {
    const maxSkill = 100; // Assuming max skill for all jutsu types is 100
    const percentage = (value / maxSkill) * 100;
    if (percentage > 75) return "bg-green-500";
    if (percentage > 50) return "bg-yellow-500";
    if (percentage > 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Jutsu & Skills
      </h2>

      {/* Section: Jutsu You Know */}
      <div className="bg-gray-700 p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-300">
          Jutsu You Know
        </h3>
        {knownJutsu.length === 0 ? (
          <p className="text-gray-400 italic">
            You haven't learned any specific jutsu types yet. Focus on your
            training!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {knownJutsu.map((jutsu) => (
              <div
                key={jutsu.id}
                className="bg-gray-600 p-4 rounded-lg shadow-inner"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xl font-semibold text-white">
                    {jutsu.name}
                  </h4>
                  <span className="text-lg font-bold text-yellow-300">
                    {player[jutsu.id]} / 100 ({getJutsuRank(player[jutsu.id])})
                  </span>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${getSkillColor(
                      player[jutsu.id]
                    )}`}
                    style={{ width: `${(player[jutsu.id] / 100) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {jutsu.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section: Jutsu To Learn */}
      <div className="bg-gray-700 p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-blue-300">
          Jutsu To Learn
        </h3>
        {learnableJutsu.length === 0 ? (
          <p className="text-gray-400 italic">
            You know all the listed jutsu types! Keep training to master them.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learnableJutsu.map((jutsu) => (
              <div
                key={jutsu.id}
                className="bg-gray-600 p-4 rounded-lg shadow-inner"
              >
                <h4 className="text-xl font-semibold text-white">
                  {jutsu.name}
                </h4>
                <p className="text-gray-300 text-sm mt-1">
                  {jutsu.description}
                </p>
                {/* You could add a "Learn" button here in a future iteration */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jutsu;
