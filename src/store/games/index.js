// Services
import firebase, {
  createGame,
  addPlayerToGame,
} from './../../services/firebase';

// Helpers
import { checkObjEmpty } from './../../utilities/helpers';

// Actions
const CREATE_GAME_REQUEST = 'app/games/CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'app/games/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'app/games/CREATE_GAME_FAILURE';
const ADD_PLAYER_REQUEST = 'app/games/ADD_PLAYER_REQUEST';
const ADD_PLAYER_SUCCESS = 'app/games/ADD_PLAYER_SUCCESS';
const ADD_PLAYER_FAILURE = 'app/games/ADD_PLAYER_FAILURE';
const WATCH_GAME_START = 'app/games/WATCH_GAME_START';
const WATCH_GAME_UPDATE = 'app/games/WATCH_GAME_UPDATE';

const initialState = {
  allGames: [],
  currentGame: {},
  currentPlayer: {},
  lastFetched: null,
  isFetching: false,
};

// const games = firebase.database().ref('games');

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
        currentGame: {},
      });
    case CREATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
      });
    case CREATE_GAME_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
        errorMessage: action.message,
        currentGame: {},
      });
    case ADD_PLAYER_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case ADD_PLAYER_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
      });
    case ADD_PLAYER_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
      });
    case WATCH_GAME_START:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case WATCH_GAME_UPDATE:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        currentGame: action.game,
      });
    default:
      return state;
  }
}

// Action Creators

export function createGameRequest() {
  return { type: CREATE_GAME_REQUEST };
}

export function createGameSuccess() {
  return { type: CREATE_GAME_SUCCESS };
}

export function createGameFailure(error) {
  return { type: CREATE_GAME_FAILURE, error };
}

export function addPlayerRequest(playerData) {
  return { type: ADD_PLAYER_REQUEST, playerData };
}

export function addPlayerSuccess(e) {
  return { type: ADD_PLAYER_SUCCESS, e };
}

export function addPlayerFailure(error) {
  return { type: ADD_PLAYER_FAILURE, error };
}

export function watchGameRequest() {
  return { type: WATCH_GAME_START };
}

export function watchGameUpdate(game) {
  return { type: WATCH_GAME_UPDATE, game };
}

// Create game thunk
export function create(gameCode, gameType) {
  return dispatch => {
    dispatch(createGameRequest());
    return createGame(gameCode, gameType)
      .then(() => dispatch(createGameSuccess()))
      .catch(error => {
        dispatch(createGameFailure(error));
        throw error;
      });
  };
}

// Add player thunk
export function addPlayer(gameCode, playerData) {
  return dispatch => {
    dispatch(addPlayerRequest(playerData));
    return addPlayerToGame(gameCode, playerData)
      .then(e => dispatch(addPlayerSuccess(e)))
      .catch(error => {
        dispatch(addPlayerFailure(error));
        throw error;
      });
  };
}

// Watch single game and receive updates
export function watchGame(gameCode) {
  return dispatch => {
    dispatch(watchGameRequest());
    firebase
      .database()
      .ref(`games/${gameCode}`)
      .on('value', snapshot => {
        const game = snapshot.val() || {};
        dispatch(watchGameUpdate(game));
      });
  };
}

// Selectors
export function singleGameLoaded(state) {
  return !checkObjEmpty(state.currentGame);
}
