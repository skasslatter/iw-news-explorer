import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticlesActions } from '../state/actions/articles-actions';
import { MiscActions } from '../state/actions/misc.actions';
import { IRootState } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent {

  @select((s: IRootState) => s.misc.isGettingFeed)
  isLoadingFeed$: Observable<boolean>;

  @select((s: IRootState) => s.articles.result)
  newsResult$: Observable<NewsAPI.NewsResult>;

  @select((s: IRootState) => s.misc.currentFeed)
  feed$: Observable<NewsFeed>;

  targetResetFilter: NewsFeedFilter;
  feedLoadingIcon = faSpinner;

  constructor(
    private redux: NgRedux<IRootState>,
    private articlesActions: ArticlesActions,
    private miscActions: MiscActions,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(map(p => p.id))
      .subscribe(id => {
        this.redux.dispatch(this.miscActions.loadFeed(id));
      });

    this.feed$.subscribe(feed => {
      const feedFilter = feed ? feed.filters : { q: '', sources: [] };
      this.targetResetFilter = feedFilter;
      this.redux.dispatch(this.articlesActions.setFiltersPagination(
        { pageSize: 10, page: 1 }, feedFilter
      ));
    });
  }

  onReset() {
    this.redux.dispatch(this.articlesActions.setFiltersPagination(
      this.redux.getState().articles.pagination,
      this.targetResetFilter
    ));
  }
}
