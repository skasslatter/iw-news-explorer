import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDirective } from 'iwerk-angular-ui';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';
import { FeedStoreService } from '../services/feed-store.service';
import { NewsApiService } from '../services/news-api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  @ViewChild('createDialog') createDialog: DialogDirective;

  newsResult: NewsAPI.NewsResult;
  newsFilter$: Observable<NewsFeedFilter>;
  isNewFeed$: Observable<boolean>;
  isSavedFeed$: Observable<boolean>;

  filterForBuilder = new BehaviorSubject<NewsFeedFilter>({ q: '', sources: [] });
  pagination = new BehaviorSubject<{pageSize: number, page: number}>({
    pageSize: 10, page: 1
  });
  newFeedName = '';
  availableSources: NewsAPI.Source[];
  isLoaded = false;
  targetResetFilter: NewsFeedFilter;
  name: string;

  constructor(
    private api: NewsApiService,
    private route: ActivatedRoute,
    private store: FeedStoreService,
    private router: Router
  ) {
    const feedId = this.route.params.pipe(
      map(p => <string>p.id)
    );
    this.isNewFeed$ = feedId.pipe(map(id => !id));
    this.isSavedFeed$ = this.isNewFeed$.pipe(map(p => !p));

    const feed$ = feedId.pipe(
      switchMap(id => id ? this.store.get(id) : of(<NewsFeed>undefined))
    ).pipe(share());

    feed$.subscribe(feed => {
      const filter = feed ? feed.filters : { q: '', sources: [] };
      this.name = feed ? feed.name : '';
      this.targetResetFilter = filter;
      this.filterForBuilder.next(filter);
    });

    const requestParameters = combineLatest(
      this.filterForBuilder,
      this.pagination
    ).pipe(map(([filter, pagination]) => {
      return {
        page: pagination.page,
        pageSize: pagination.pageSize,
        q: filter.q,
        sources: filter.sources
      };
    }));

    requestParameters.subscribe(parameters => {
      this.api.getNews(parameters)
        .subscribe(r => {
          this.newsResult = r;
        });
    });
  }

  ngOnInit() {
    this.api.getSources()
      .subscribe(s => {
        this.availableSources = s.sources;
        this.isLoaded = true;
      });
  }

  onFilterChange($event: NewsFeedFilter) {
    this.filterForBuilder.next($event);
  }

  create() {
    this.newFeedName = '';
    this.createDialog.open();
  }

  confirmCreate() {
    this.store.create({
      name: this.newFeedName,
      filters: this.filterForBuilder.value
    }).subscribe(feed => {
      this.router.navigate([feed.id]);
    });
  }

  cancel() {
    this.createDialog.close();
  }

  save() {
    this.store.update(this.route.snapshot.params.id, {
      filters: this.filterForBuilder.value
    }).subscribe();
  }

  reset() {
    this.filterForBuilder.next(this.targetResetFilter);
  }

  delete() {
    this.store.remove(this.route.snapshot.params.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  setPagination(pagination: {pageSize: number, page: number}) {
    this.pagination.next(pagination);
  }
}
