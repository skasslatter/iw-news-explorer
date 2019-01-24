import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesActions } from '../state/actions/articles.actions';
import { IRootState } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-feed-articles',
  templateUrl: './feed-articles.component.html',
  styleUrls: ['./feed-articles.component.sass']
})
export class FeedArticlesComponent {
  @select((s: IRootState) => s.articles.result.articles)
  articles$: Observable<NewsAPI.Article[]>;

  @select((s: IRootState) => s.articles.result.error)
  error$: Observable<string>;

  @select((s: IRootState) => s.articles.pagination.pageSize)
  pageSize$: Observable<string>;

  @select((s: IRootState) => s.articles.result.totalResults)
  totalRecords$: Observable<string>;

  @select((s: IRootState) => s.articles.result.status === 'ok')
  isOk$: Observable<NewsAPI.Article[]>;

  @select((s: IRootState) => (s.articles.pagination.page - 1) * s.articles.pagination.pageSize)
  first$: Observable<NewsAPI.Article[]>;

  constructor(
    private redux: NgRedux<IRootState>,
    private articlesActions: ArticlesActions
  ) {

  }

  setPage($event: { first: number }) {
    const pageSize = this.redux.getState().articles.pagination.pageSize;
    this.redux.dispatch(this.articlesActions.setFiltersPagination(
      {
        page: 1 + $event.first / pageSize,
        pageSize
      },
      this.redux.getState().articles.filter
    ));
  }

}
