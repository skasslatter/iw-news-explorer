import { Reducer } from 'redux';
import { RemoveFeedAction, AddFeedAction, UpdateFeedAction } from '../actions/feeds.actions';
import { SetInitialDataAction } from '../actions/misc.actions';
import { REMOVE_FEED, ADD_FEED, UPDATE_FEED, SET_INITIAL_DATA } from '../actions/actions.enum';

export interface IFeedsState {
  feeds: NewsFeed[];
}

function updateFeed(state: IFeedsState, action: UpdateFeedAction): IFeedsState {
  return {
    feeds: state.feeds.map(f => f.id === action.feed.id ? action.feed : f)
  };
}

export const feedsReducer: Reducer<IFeedsState> = (state, action) => {
  if (!state) {
    return {
      feeds: []
    };
  }

  switch (action.type) {
    case REMOVE_FEED:
      return {
        feeds: state.feeds.filter(f => f.id !== (action as RemoveFeedAction).feedId)
      };
    case ADD_FEED:
      return {
        feeds: state.feeds.concat([(action as AddFeedAction).feed])
      };
    case UPDATE_FEED:
      return updateFeed(state, action as UpdateFeedAction);
    case SET_INITIAL_DATA:
      return {
        feeds: (action as SetInitialDataAction).feeds
      };
  }

  return state;
};
