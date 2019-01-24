import { Reducer } from 'redux';
import { FeedLoadedAction } from '../actions/misc.actions';
import { LOAD_INITIAL, SET_INITIAL_DATA, LOAD_FEED, FEED_LOADED } from '../actions/actions.enum';

export interface IMiscState {
  isGettingFeed: boolean;
  currentFeed: NewsFeed;
  isInitialLoading: boolean;
  sourceResult: NewsAPI.SourceResult;
}

export const miscReducer: Reducer<IMiscState> = (state, action) => {
  if (!state) {
    return {
      isGettingFeed: false,
      isInitialLoading: false,
      currentFeed: null,
      sourceResult: null
    };
  }

  switch (action.type) {
    case LOAD_INITIAL: return {
      ...state,
      isInitialLoading: true
    };
    case SET_INITIAL_DATA: return {
      ...state,
      isInitialLoading: false,
      sourceResult: action.sourceResult
    };
    case LOAD_FEED: return {
      ...state,
      isGettingFeed: true
    };
    case FEED_LOADED: return {
      ...state,
      currentFeed: (action as FeedLoadedAction).feed,
      isGettingFeed: false
    };
  }

  return state;
};
