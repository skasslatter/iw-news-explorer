import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedStoreService {
  create(options: {
    name: string
    filters: NewsFeedFilter
  }): Observable<NewsFeed> {
    return new Observable(obs => {
      const filter: NewsFeed = Object.assign({
        id: String( Math.floor(Math.random() * 1000000) )
      }, options);
      const feeds = this.read();
      feeds.push(filter);
      this.write(feeds);
      obs.next(filter);
      obs.complete();
    });
  }

  remove(id: string): Observable<void> {
    return new Observable(obs => {
      const feeds = this.read();
      const idx = feeds.findIndex(f => f.id === id);
      if (idx === -1) {
        return;
      }
      feeds.splice(idx, 1);
      this.write(feeds);
      obs.next();
      obs.complete();
    });
  }

  update(id: string, options: {
    name?: string
    filters?: NewsFeedFilter
  }): Observable<NewsFeed> {
    return new Observable(obs => {
      const feeds = this.read();
      const idx = feeds.findIndex(f => f.id === id);
      if (idx === -1) {
        return;
      }
      feeds[idx] = {
        filters: options.filters || feeds[idx].filters,
        id: feeds[idx].id,
        name: options.name || feeds[idx].name
      };
      this.write(feeds);
      obs.next(feeds[idx]);
      obs.complete();
    });
  }

  get(id: string): Observable<NewsFeed> {
    return new Observable(obs => {
      obs.next(this.read().find(f => f.id === id));
      obs.complete();
    });
  }

  list(): Observable<NewsFeed[]> {
    return new Observable(obs => {
      obs.next(this.read());
      obs.complete();
    });
  }

  private read(): NewsFeed[] {
    const str = localStorage.getItem('newsFeeds');
    if (!str) {
      return [];
    }
    return JSON.parse(str);
  }

  private write(feeds: NewsFeed[]) {
    localStorage.setItem('newsFeeds', JSON.stringify(feeds));
  }
}
