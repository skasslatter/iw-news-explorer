import { select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRootState } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  @select((s: IRootState) => s.feeds.feeds)
  feeds$: Observable<NewsFeed[]>;

  getFeedLink(feed: NewsFeed) {
    return [feed.id];
  }

  getFeedName(feed: NewsFeed): string {
    return feed.name;
  }

}
