import {getRandomInteger} from '../mock/filmmock.js';
export const createUserRank = () => {
  const watchedMoviesTotal = getRandomInteger(0, 30);

  let userProfile = ``;

  switch (true) {
    case watchedMoviesTotal <= 10 && watchedMoviesTotal > 0 :
      userProfile = `Novice`;
      break;

    case watchedMoviesTotal <= 20:
      userProfile = `Fan`;
      break;

    case watchedMoviesTotal > 20:
      userProfile = `Movie Buff`;
      break;

    default:
      userProfile = userProfile;
  }

  return (
    ` <section class="header__profile profile">
    <p class="profile__rating">${userProfile}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};
