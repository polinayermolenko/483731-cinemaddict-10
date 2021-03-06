import {MONTHS} from '../const.js';
import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatTime = (time) => {
  return moment(time).format(`YYYY/MM/DD HH:MM`);
};

export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length)];
};

export const generateFloatingPointNumber = (min, max) => {
  let floatingPointNumber = getRandomInteger(min, max) / 10;
  if (floatingPointNumber % 1 === 0) {
    floatingPointNumber = `${floatingPointNumber}.0`;
  }
  return `${floatingPointNumber}`;
};


export const generateRandomElements = (min, max, array) => {
  const arrayLength = getRandomInteger(min, max);
  const elements = new Array(arrayLength);
  return elements.fill(``).map(() => {
    return getRandomElement(array);
  });
};

export const generateDuration = () => {
  let totalDuration = getRandomInteger(10, 171);
  const minutes = totalDuration % 60;
  const hours = (totalDuration - minutes) / 60;
  totalDuration = `${hours}h ${minutes}m`;

  if (minutes === 0) {
    totalDuration = `${hours}h`;
  }
  if (hours === 0) {
    totalDuration = `${minutes}m`;
  }
  return totalDuration;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(0, 40000);
  targetDate.setDate(targetDate.getDate() - diffValue);
  const day = targetDate.getDate();
  const month = MONTHS[targetDate.getMonth()];
  const year = targetDate.getFullYear();
  return `${day} ${month} ${year}`;
};

export const getMostCommentedFilms = (films) => {
  return films.slice().sort((film1, film2) => {
    return film2.comments.length - film1.comments.length;
  })
.slice(0, 2);
};

export const getMostRatedFilms = (films) => {
  return films.slice()
 .sort((film1, film2) => {
   return film2.rating - film1.rating;
 })
.slice(0, 2);
};
