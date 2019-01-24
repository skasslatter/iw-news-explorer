import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ArticlesActions } from '../state/actions/articles-actions';
import { IRootState } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-feed-builder',
  templateUrl: './feed-builder.component.html',
  styleUrls: ['./feed-builder.component.sass']
})
export class FeedBuilderComponent {
  onQueryChange: (query: string) => void;

  @select((state: IRootState) => state.misc.sourceResult.sources.map(s => (<SelectItem>{
    id: s.id,
    value: s.id,
    label: s.name
  })))
  availableSources$: Observable<SelectItem[]>;

  @select((s: IRootState) => s.articles.filter.q || '')
  query$: Observable<string>;

  @select((s: IRootState) => s.articles.filter.sources || [])
  sources$: Observable<string[]>;

  constructor(
    private redux: NgRedux<IRootState>,
    private articlesActions: ArticlesActions
  ) {
    this.onQueryChange = (() => {
      const subj = new Subject<string>();
      subj.pipe(debounceTime(1000))
        .subscribe(query => {
          this.dispatch({
            q: query,
            sources: this.redux.getState().articles.filter.sources
          });
        });
      return (query: string) => {
        subj.next(query);
      };
    })();
  }

  onSourcesChange(sources: string[]) {
    this.dispatch({
      q: this.redux.getState().articles.filter.q,
      sources
    });
  }

  private dispatch(filter: NewsFeedFilter) {
    this.redux.dispatch(this.articlesActions.setFiltersPagination(
      this.redux.getState().articles.pagination,
      filter
    ));
  }
}
