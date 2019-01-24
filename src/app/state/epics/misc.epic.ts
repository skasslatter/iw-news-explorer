import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, delay } from 'rxjs/operators';
import { NewsApiService } from '../../services/news-api.service';
import { InitialLoadAction, MiscActions, LoadFeedAction } from '../actions/misc.actions';
import { forkJoin, of } from 'rxjs';
import { FeedStoreService } from '../../services/feed-store.service';

@Injectable({
  providedIn: 'root'
})
export class MiscEpic {
  constructor(
    private api: NewsApiService,
    private storeApi: FeedStoreService,
    private miscActions: MiscActions
  ) {
  }

  fetch = (action$: ActionsObservable<InitialLoadAction>) => {
    return action$
      .pipe(
        ofType('LOAD_INITIAL'),
        mergeMap(() => {
          return forkJoin(
            this.api.getSources(),
            this.storeApi.list()
          )
            .pipe(delay(2000))
            .pipe(map(([sources, feeds]) => this.miscActions.setInitialData(sources, feeds)));
        })
      );
  }

  loadFeed = (action$: ActionsObservable<LoadFeedAction>) => {
    return action$
      .pipe(
        ofType('LOAD_FEED'),
        mergeMap(action => {
          if (!action.feedId) {
            return of(this.miscActions.feedLoaded(undefined));
          }
          return this.storeApi.get(action.feedId)
            .pipe(
              delay(1000),
              map(feed => this.miscActions.feedLoaded(feed))
            );
        })
      );
  }
}
