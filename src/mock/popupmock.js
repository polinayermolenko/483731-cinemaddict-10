import {FILM_TITLES, POSTERS, DESCRIPTIONS, GENRES, AGE, COUNTRY, PEOPLE, EMOJI} from '../const.js';
import {getRandomInteger, getRandomElement, generateFloatingPointNumber, generateRandomElements, generateDuration, getRandomDate} from '../util.js';

const filmTitle = getRandomElement(FILM_TITLES);


export const generatePopup = () => {
  return {
    title: filmTitle,
    original: filmTitle,
    poster: getRandomElement(POSTERS),
    age: getRandomElement(AGE),
    totalRating: generateFloatingPointNumber(0, 101),
    userRating: getRandomInteger(1, 10),
    director: getRandomElement(PEOPLE),
    writers: generateRandomElements(1, 3, PEOPLE),
    actors: generateRandomElements(1, 3, PEOPLE),
    releaseDate: getRandomDate(),
    runTime: generateDuration(),
    country: getRandomElement(COUNTRY),
    genres: generateRandomElements(1, 3, GENRES),
    description: generateRandomElements(1, 3, DESCRIPTIONS),
    isAddToWatchlistPressed: Math.random() > 0.5,
    isMarkAsWatchedPressed: Math.random() > 0.5,
    isMarkAsFavoritePressed: Math.random() > 0.5
  };
};


export const generateComment = () => {
  return {
    emoji: getRandomElement(EMOJI),
    text: getRandomElement(DESCRIPTIONS),
    author: getRandomElement(PEOPLE),
    day: getRandomDate(),
    count: 1
  };
};

export const generateComments = () => {
  return new Array(4).fill(``).map(() => {
    return generateComment();
  });
};

