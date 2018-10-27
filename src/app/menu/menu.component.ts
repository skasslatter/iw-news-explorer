import { Component, OnInit } from '@angular/core';
import { FeedStoreService } from '../services/feed-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  feeds$: Observable<NewsFeed[]>;

  constructor(
    private store: FeedStoreService
  ) {
    this.feeds$ = this.store.newsFeeds;
  }

  ngOnInit() {
  }

  getFeedLink(feed: NewsFeed) {
    return [feed.id];
  }

  getFeedName(feed: NewsFeed): string {
    return feed.name;
  }

}
