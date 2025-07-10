// src/Lore/clans/clans.js

/**
 * This file defines data for various shinobi clans, including their origins, notable members, and abilities.
 */

export const CLAN_DATA = {
    "Uzumaki": {
        origin: "Originally from Uzushiogakure, known for their strong life force, large chakra reserves, and sealing jutsu.",
        notableMembers: ["Naruto Uzumaki", "Kushina Uzumaki", "Nagato"],
        abilities: "Strong life force, exceptional chakra reserves, and mastery of sealing techniques (fūinjutsu). They also possess longevity."
    },
    "Uchiha": {
        origin: "One of the four noble clans of Konohagakure, famed for their Sharingan and powerful fire-style jutsu.",
        notableMembers: ["Sasuke Uchiha", "Itachi Uchiha", "Madara Uchiha", "Obito Uchiha", "Shisui Uchiha"],
        abilities: "Sharingan (enhanced perception, jutsu copying, genjutsu), Mangekyō Sharingan (unique abilities like Amaterasu, Tsukuyomi, Kamui), Susanoo, and powerful fire-based ninjutsu."
    },
    "Hyuga": {
        origin: "One of the four noble clans of Konohagakure, renowned for their Byakugan and Gentle Fist fighting style.",
        notableMembers: ["Hinata Hyuga", "Neji Hyuga", "Hiashi Hyuga"],
        abilities: "Byakugan (360-degree vision, X-ray vision, chakra pathway sight), Gentle Fist (targets chakra points, internal damage)."
    },
    "Nara": {
        origin: "A clan from Konohagakure known for their intelligence, shadow manipulation jutsu, and deer companions.",
        notableMembers: ["Shikamaru Nara", "Shikaku Nara", "Yoshino Nara"],
        abilities: "Shadow Manipulation techniques (Shadow Imitation Jutsu, Shadow Stitching Jutsu), strategic thinking, and high intelligence."
    },
    "Yamanaka": {
        origin: "A clan from Konohagakure specializing in mind-related jutsu, often working with Nara and Akimichi clans.",
        notableMembers: ["Ino Yamanaka", "Inoichi Yamanaka"],
        abilities: "Mind-related jutsu (Mind Transfer Jutsu, Mind Body Switch Technique), sensory abilities, and communication through thoughts."
    },
    "Akimichi": {
        origin: "A clan from Konohagakure known for their body expansion jutsu and immense physical strength, often working with Nara and Yamanaka clans.",
        notableMembers: ["Choji Akimichi", "Choza Akimichi"],
        abilities: "Body Expansion Jutsu (Partial Multi-Size Technique, Multi-Size Technique), Super-Calorie Pills for temporary power boosts, and immense physical strength."
    },
    "Aburame": {
        origin: "A clan from Konohagakure that uses insects as their primary weapon. They have a symbiotic relationship with kikaichū (bugs) that can drain chakra from enemies and be used for reconnaissance.",
        notableMembers: ["Shino Aburame"],
        abilities: "Symbiotic relationship with insects (kikaichū) for combat, reconnaissance, chakra absorption, and tracking."
    },
    "Sarutobi": {
        origin: "A respected clan in Konohagakure, known for their strong will and fire-style jutsu.",
        notableMembers: ["Hiruzen Sarutobi", "Asuma Sarutobi", "Konohamaru Sarutobi"],
        abilities: "Versatility in ninjutsu, strong affinity for Fire Release techniques, and known for wisdom and leadership."
    },
    "Senju": {
        origin: "One of the clans responsible for founding Konohagakure, known for their strong will and diverse abilities, descendants of the Sage of Six Paths.",
        notableMembers: ["Hashirama Senju", "Tobirama Senju", "Tsunade Senju"],
        abilities: "Strong life force, diverse abilities including Wood Release (Mokuton), powerful healing techniques, and exceptional chakra control."
    },
    "Ōtsutsuki": {
        origin: "An ancient celestial clan, progenitors of chakra on Earth and many ninja clans.",
        notableMembers: ["Kaguya Ōtsutsuki", "Hagoromo Ōtsutsuki", "Hamura Ōtsutsuki"],
        abilities: "God-like powers, massive chakra manipulation, space-time ninjutsu, and various Kekkei Genkai like the Rinnegan and Byakugan."
    },
    "Kaguya": { // This is the clan of Kimimaro, distinct from Kaguya Ōtsutsuki
        origin: "An ancient clan known for their barbaric fighting style and unique kekkei genkai.",
        notableMembers: ["Kimimaro Kaguya"],
        abilities: "Shikotsumyaku (Dead Bone Pulse), allowing manipulation of their skeletal structure for combat and defense."
    },
    "Yuki": {
        origin: "A clan from the Land of Water, known for their Ice Release (Hyōton) kekkei genkai.",
        notableMembers: ["Haku Yuki"],
        abilities: "Ice Release (Hyōton) techniques, allowing creation and manipulation of ice, often combined with high speed."
    },
    "Hōzuki": {
        origin: "A clan from Kirigakure, known for their ability to turn their bodies into water.",
        notableMembers: ["Suigetsu Hōzuki", "Mangetsu Hōzuki"],
        abilities: "Hydrification Technique (liquefy their bodies), Water Release ninjutsu, and skilled in silent killing."
    },
    "Kurotsuchi": {
        origin: "A clan from Iwagakure (Hidden Stone Village), known for their Earth Release techniques.",
        notableMembers: ["Kurotsuchi"], // The Fourth Tsuchikage
        abilities: "Proficiency in Earth Release techniques, particularly those manipulating mud and rock."
    },
    // Other previously defined clans (no new ability info provided, keeping existing)
    "Hatake": {
        origin: "A prominent clan in Konohagakure, though not as large as the noble clans, known for their exceptional ninja.",
        notableMembers: ["Kakashi Hatake", "Sakumo Hatake"]
    },
    "Lee": {
        origin: "A unique family line in Konohagakure specializing in taijutsu, known for their dedication and hard work.",
        notableMembers: ["Rock Lee", "Metal Lee", "Might Guy"]
    },
    "Haruno": {
        origin: "A civilian family in Konohagakure, with members like Sakura Haruno achieving great ninja prowess.",
        notableMembers: ["Sakura Haruno"]
    },
    "Sabaku": {
        origin: "The ruling family of Sunagakure, known for their unique wind and sand manipulation abilities.",
        notableMembers: ["Gaara", "Temari", "Kankuro"]
    },
    "Mitsashi": {
        origin: "A family from Konohagakure, known for their weapon specialization.",
        notableMembers: ["Tenten Mitsashi"]
    },
    "Namikaze": {
        origin: "A clan known for their speed and exceptional ninjutsu, with a prominent member becoming Hokage.",
        notableMembers: ["Minato Namikaze"]
    },
    "Inuzuka": {
        origin: "A clan from Konohagakure known for their ninja dog companions and beast-like fighting style.",
        notableMembers: ["Kiba Inuzuka"]
    },
    "Fūma": {
        origin: "A clan from the Land of Sound, known for their large shuriken and ninja tools.",
        notableMembers: [] // No prominent members widely known in the main series
    },
    "Iburi": {
        origin: "A clan with the ability to turn into smoke, making them difficult to capture.",
        notableMembers: []
    },
    "Shimura": {
        origin: "A clan from Konohagakure, known for its connection to Danzo Shimura.",
        notableMembers: ["Danzo Shimura"]
    },
    "Tsuchigumo": {
        origin: "A clan known for their forbidden jutsu that can cause massive explosions.",
        notableMembers: ["Hotaru"]
    },
    "Kurama": {
        origin: "A clan from Konohagakure known for their powerful genjutsu abilities.",
        notableMembers: ["Yakumo Kurama"]
    },
};
