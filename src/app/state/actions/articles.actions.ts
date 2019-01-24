import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { SET_FILTERS_PAGINATION, SET_RESULT } from './actions.enum';

export type SetFiltersPaginationAction = Action<string> & {
  type: 'SET_FILTERS_PAGINATION'
  pagination: {pageSize: number, page: number};
  filter: NewsFeedFilter;
};

export type SetResultAction = Action<string> & {
  type: 'SET_RESULT'
  result: NewsAPI.NewsResult
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesActions {

  setFiltersPagination(
    pagination: {pageSize: number, page: number},
    filter: NewsFeedFilter
  ): SetFiltersPaginationAction {
    return {
      type: SET_FILTERS_PAGINATION,
      pagination,
      filter
    };
  }

  setResult(result: NewsAPI.NewsResult):  SetResultAction {
    return {
      type: SET_RESULT,
      result
    };
  }

}
