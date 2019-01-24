import { combineReducers, Reducer } from 'redux';
import { articlesReducer, ArticlesState } from './articles.reducer';
import { feedsReducer, IFeedsState } from './feeds.reducer';
import { miscReducer, IMiscState } from './misc.reducer';

export interface IRootState {
  misc: IMiscState;
  articles: ArticlesState;
  feeds: IFeedsState;
}

export const rootReducer: Reducer<IRootState> = combineReducers({
  misc: miscReducer,
  articles: articlesReducer,
  feeds: feedsReducer
});
