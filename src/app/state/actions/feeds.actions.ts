import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { REMOVE_FEED, ADD_FEED, UPDATE_FEED } from './actions.enum';

export type RemoveFeedAction = Action<string> & {
  type: 'REMOVE_FEED'
  feedId: string
};

export type AddFeedAction = Action<string> & {
  type: 'ADD_FEED'
  feed: NewsFeed
};

export type UpdateFeedAction = Action<string> & {
  type: 'UPDATE_FEED'
  feed: NewsFeed
};

@Injectable({
  providedIn: 'root'
})
export class FeedsActions {
  remove(feedId: string): RemoveFeedAction {
    return {
      type: REMOVE_FEED,
      feedId
    };
  }

  add(feed: NewsFeed): AddFeedAction {
    return {
      type: ADD_FEED,
      feed
    };
  }

  update(feed: NewsFeed): UpdateFeedAction {
    return {
      type: UPDATE_FEED,
      feed
    };
  }
}
