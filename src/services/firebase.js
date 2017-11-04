import * as firebase from 'firebase';
import config from './../constants/config';

firebase.initializeApp(config);

export function createGame(gameData) {
  return firebase
    .database()
    .ref(`games/${gameData.gameCode}`)
    .set(gameData);
}

export function fetchGames() {
  return firebase
    .database()
    .ref('games')
    .orderByKey();
}

export function addPlayerToGame(gameCode, userData) {
  return firebase
    .database()
    .ref(`games/${gameCode}/players`)
    .push(userData);
}

export function fetchGameByCode(code) {
  return firebase.database().ref(`games/${code}`);
}

export default firebase;
