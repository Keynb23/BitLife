// src/logic/coreLogic/nameGenerator.js

import { getRandomElement } from '../Random/Randomness'; // Adjusted path

const FIRST_NAMES = [
    "Naruto", "Sasuke", "Sakura", "Kakashi", "Hinata", "Shikamaru", "Ino", "Choji",
    "Rock", "Neji", "Tenten", "Gaara", "Temari", "Kankuro", "Jiraiya", "Tsunade",
    "Orochimaru", "Itachi", "Minato", "Kushina", "Obito", "Madara", "Hashirama",
    "Tobirama", "Sarutobi", "Konan", "Nagato", "Yahiko", "Deidara", "Kisame",
    "Hidan", "Kakuzu", "Sasori", "Zetsu", "Shisui", "Izuna", "Danzo", "Anko",
    "Kurenai", "Asuma", "Might", "Iruka", "Konohamaru", "Moegi", "Udon",
    "Boruto", "Sarada", "Mitsuki", "Shikadai", "Inojin", "Chocho", "Mirai",
    "Kawaki", "Himawari", "Sumire", "Denki", "Iwabe", "Metal Lee", "Wasabi",
    "Namida", "Tsubaki"
];

const CLAN_NAMES = [
    "Uzumaki", "Uchiha", "Haruno", "Hatake", "Hyuga", "Nara", "Yamanaka", "Akimichi",
    "Lee", "Mitsashi", "Sabaku", "Sarutobi", "Senju", "Namikaze",
    "Aburame", "Inuzuka", "Kaguya", "Hōzuki", "Ōtsutsuki", "Ryūchi", "Yuki",
    "Hoshigaki", "Jūgo", "Kimimaro", "Kurama", "Onikuma", "Rinha", "Shimura",
    "Tsuchigumo", "Fūma", "Iburi", "Kohaku", "Kodokuna", "Kurogane", "Mitarashi",
    "Shiranui", "Tsuchi", "Yoroi", "Zabuza", "Hagoromo"
];

/**
 * Generates a random shinobi first name.
 * @returns {string} A random first name.
 */
export const generateFirstName = () => {
    return getRandomElement(FIRST_NAMES);
};

/**
 * Generates a random shinobi clan name (for the last name).
 * @returns {string} A random clan name.
 */
export const generateClanName = () => {
    return getRandomElement(CLAN_NAMES);
};

/**
 * Generates a complete random shinobi name (first name and clan-based last name).
 * @returns {{firstName: string, lastName: string, clan: string}} An object containing the first name, last name, and clan.
 */
export const generateRandomShinobiName = () => {
    const firstName = generateFirstName();
    const clanName = generateClanName();
    const lastName = clanName; // For simplicity, the last name is the clan name

    return {
        firstName,
        lastName,
        clan: clanName,
    };
};
