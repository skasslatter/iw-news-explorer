import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { NewsApiService } from '../../services/news-api.service';
import { SET_FILTERS_PAGINATION } from '../actions/actions.enum';
import { ArticlesActions, SetFiltersPaginationAction } from '../actions/articles.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticlesEpic {
  constructor(
    private api: NewsApiService,
    private articlesActions: ArticlesActions
  ) {
  }

  fetch = (action$: ActionsObservable<SetFiltersPaginationAction>) => {
    return action$
      .pipe(
        ofType(SET_FILTERS_PAGINATION),
        mergeMap(a => {
          return this.api.getNews({
            page: a.pagination.page,
            pageSize: a.pagination.pageSize,
            q: a.filter.q,
            sources: a.filter.sources
          }).pipe(
            map(r => this.articlesActions.setResult(r)),
            // we "cancel" previous requests
            takeUntil(action$.pipe(ofType(SET_FILTERS_PAGINATION)))
          );
        })
      );
  }
}
