import {FILM_TITLES, POSTERS, GENRES, DESCRIPTIONS} from '../const.js';
import {getRandomInteger, getRandomElement, generateFloatingPointNumber, generateRandomElements,
  generateYear, generateCommentsNumber, generateDuration} from '../util.js';

const generateFilm = () => {
  return (
    {
      title: getRandomElement(FILM_TITLES),
      rating: generateFloatingPointNumber(0, 101),
      year: generateYear(),
      duration: generateDuration(),
      genre: getRandomElement(GENRES),
      poster: getRandomElement(POSTERS),
      description: generateRandomElements(1, 3, DESCRIPTIONS).join(` `),
      commentsNumber: generateCommentsNumber(),
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
