import { toMap } from '../../utils';

export const TRACK_PLAYER_REQUEST = 'wise-old-man/players/TRACK_REQUEST';
export const TRACK_PLAYER_SUCCESS = 'wise-old-man/players/TRACK_SUCCESS';
export const TRACK_PLAYER_FAILURE = 'wise-old-man/players/TRACK_FAILURE';

export const ASSERT_TYPE_REQUEST = 'wise-old-man/players/ASSERT_TYPE_REQUEST';
export const ASSERT_TYPE_SUCCESS = 'wise-old-man/players/ASSERT_TYPE_SUCCESS';
export const ASSERT_TYPE_FAILURE = 'wise-old-man/players/ASSERT_TYPE_FAILURE';

export const FETCH_PLAYER_REQUEST = 'wise-old-man/players/FETCH_REQUEST';
export const FETCH_PLAYER_SUCCESS = 'wise-old-man/players/FETCH_SUCCESS';
export const FETCH_PLAYER_FAILURE = 'wise-old-man/players/FETCH_FAILURE';

export const SEARCH_PLAYERS_REQUEST = 'wise-old-man/players/SEARCH_REQUEST';
export const SEARCH_PLAYERS_SUCCESS = 'wise-old-man/players/SEARCH_SUCCESS';
export const SEARCH_PLAYERS_FAILURE = 'wise-old-man/players/SEARCH_FAILURE';

const initialState = {
  isFetching: false,
  isSearching: false,
  isTracking: false,
  isAssertingType: false,
  players: {},
  searchResults: {},
  updating: []
};

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case TRACK_PLAYER_REQUEST:
      return { ...state, isTracking: true, updating: [...state.updating, action.username] };

    case TRACK_PLAYER_SUCCESS:
      return {
        ...state,
        isTracking: false,
        updating: [...state.updating.filter(username => username !== action.username)],
        players: { ...state.players, [action.data.id]: { ...action.data } }
      };

    case TRACK_PLAYER_FAILURE:
      return {
        ...state,
        isTracking: false,
        updating: [...state.updating.filter(username => username !== action.username)]
      };

    case ASSERT_TYPE_REQUEST:
      return { ...state, isAssertingType: true };

    case ASSERT_TYPE_SUCCESS:
      return {
        ...state,
        isAssertingType: false,
        players: {
          ...state.players,
          [action.playerId]: { ...state.players[action.playerId], type: action.playerType }
        }
      };

    case ASSERT_TYPE_FAILURE:
      return {
        ...state,
        isAssertingType: false
      };

    case FETCH_PLAYER_REQUEST:
      return { ...state, isFetching: true };

    case FETCH_PLAYER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        players: { ...state.players, [action.player.id]: action.player }
      };

    case FETCH_PLAYER_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case SEARCH_PLAYERS_REQUEST:
      return { ...state, isSearching: true };

    case SEARCH_PLAYERS_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: { ...toMap(action.players, 'id') },
        players: { ...state.players, ...toMap(action.players, 'id') }
      };

    case SEARCH_PLAYERS_FAILURE:
      return { ...state, isSearching: false, error: action.error };

    default:
      return state;
  }
}
