import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { delay, map, mergeMap, takeUntil } from 'rxjs/operators';
import { FeedStoreService } from '../../services/feed-store.service';
import { NewsApiService } from '../../services/news-api.service';
import { LOAD_FEED, LOAD_INITIAL } from '../actions/actions.enum';
import { InitialLoadAction, LoadFeedAction, MiscActions } from '../actions/misc.actions';
import { STD_SMOOTH_DELAY } from '../../config';

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

  loadInitialData = (action$: ActionsObservable<InitialLoadAction>) => {
    return action$
      .pipe(
        ofType(LOAD_INITIAL),
        mergeMap(() => {
          return forkJoin(
            this.api.getSources(),
            this.storeApi.list()
          )
            .pipe(delay(2 * STD_SMOOTH_DELAY))
            .pipe(map(([sources, feeds]) => this.miscActions.setInitialData(sources, feeds)));
        })
      );
  }

  loadFeed = (action$: ActionsObservable<LoadFeedAction>) => {
    return action$
      .pipe(
        ofType(LOAD_FEED),
        mergeMap(action => {
          if (!action.feedId) {
            return of(this.miscActions.feedLoaded(undefined));
          }
          return this.storeApi.get(action.feedId)
            .pipe(
              delay(STD_SMOOTH_DELAY),
              map(feed => this.miscActions.feedLoaded(feed)),
              // we cancel the previous requests
              takeUntil(action$.pipe(ofType(LOAD_FEED)))
            );
        })
      );
  }
}
