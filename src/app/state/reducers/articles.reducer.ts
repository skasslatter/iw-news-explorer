import { Reducer, Action } from 'redux';
import { SetResultAction, SetFiltersPaginationAction } from '../actions/articles-actions';

export interface ArticlesState {
  result: NewsAPI.NewsResult;
  pagination: {pageSize: number, page: number};
  filter: NewsFeedFilter;
}

export const articlesReducer: Reducer<ArticlesState> = (state: ArticlesState, action: Action): ArticlesState => {
  if (!state) {
    return null;
  }
  if (action.type === 'SET_RESULT') {
    return {
      ...state,
      result: (action as SetResultAction).result
    };
  }
  if (action.type === 'SET_FILTERS_PAGINATION') {
    return {
      ...state,
      filter: (action as SetFiltersPaginationAction).filter,
      pagination: (action as SetFiltersPaginationAction).pagination
    };
  }

  return state;
};

