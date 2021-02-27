export const getRandomElement = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];

export const pseudoShuffle = <T>(array: T[]) => array.sort(() => 0.5 - Math.random());
