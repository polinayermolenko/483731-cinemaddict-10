import {FILM_TITLES, POSTERS, PEOPLE, GENRES, AGE, COUNTRY, EMOJI, DESCRIPTIONS} from '../const.js';
import {getRandomInteger, getRandomElement, generateFloatingPointNumber, generateRandomElements, generateDuration, getRandomDate} from '../util.js';

const generateComment = () => {
  return {
    emoji: getRandomElement(EMOJI),
    text: getRandomElement(DESCRIPTIONS),
    author: getRandomElement(PEOPLE),
    day: getRandomDate()
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(() => {
    return generateComment();
  });
};


const generateFilm = () => {
  const filmTitle = getRandomElement(FILM_TITLES);
  return (
    {
      title: filmTitle,
      original: filmTitle,
      rating: generateFloatingPointNumber(0, 101),
      userRating: getRandomInteger(1, 10),
      age: getRandomElement(AGE),
      director: getRandomElement(PEOPLE),
      writers: generateRandomElements(1, 3, PEOPLE),
      actors: generateRandomElements(1, 3, PEOPLE),
      duration: generateDuration(),
      country: getRandomElement(COUNTRY),
      releaseDate: getRandomDate(),
      genres: generateRandomElements(1, 3, GENRES),
      poster: getRandomElement(POSTERS),
      description: generateRandomElements(1, 3, DESCRIPTIONS),
      comments: generateComments(getRandomInteger(1, 100)),
      isAddToWatchlistPressed: Math.random() > 0.5,
      isMarkAsWatchedPressed: Math.random() > 0.5,
      isMarkAsFavoritePressed: Math.random() > 0.5
    }
  );
};

const generateFilms = (count) => {
  return new Array(count)
  .fill(``)
  .map(() => generateFilm());
};

export {generateFilm, generateFilms, getRandomInteger};
