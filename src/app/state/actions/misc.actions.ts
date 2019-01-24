import { Injectable } from '@angular/core';
import { Action } from 'redux';

export type InitialLoadAction = Action<'LOAD_INITIAL'>;
export type SetInitialDataAction = Action<'SET_INITIAL_DATA'> & {
  sourceResult: NewsAPI.SourceResult
  feeds: NewsFeed[]
};

export type LoadFeedAction = Action<'LOAD_FEED'> & {
  feedId: string
};

export type FeedLoadedAction = Action<'FEED_LOADED'> & {
  feed: NewsFeed
};

@Injectable({
  providedIn: 'root'
})
export class MiscActions {

  loadInitialData(): InitialLoadAction {
    return { type: 'LOAD_INITIAL' };
  }

  setInitialData(sourceResult: NewsAPI.SourceResult, feeds: NewsFeed[]): SetInitialDataAction {
    return { type: 'SET_INITIAL_DATA', sourceResult, feeds };
  }

  loadFeed(feedId: string): LoadFeedAction {
    return { type: 'LOAD_FEED', feedId };
  }

  feedLoaded(feed: NewsFeed): FeedLoadedAction {
    return { type: 'FEED_LOADED', feed };
  }

}
