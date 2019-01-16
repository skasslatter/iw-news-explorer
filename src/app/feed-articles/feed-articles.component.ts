import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-feed-articles',
  templateUrl: './feed-articles.component.html',
  styleUrls: ['./feed-articles.component.sass']
})
export class FeedArticlesComponent implements OnChanges {
  @Input() newsResult: NewsAPI.NewsResult;
  @Output() pagination = new EventEmitter<{page: number, pageSize: number}>();

  rows = 10;

  constructor() { }

  ngOnChanges() {
  }

  get articles() {
    return this.newsResult.articles;
  }

  get error() {
    return this.newsResult.error;
  }

  get isOk() {
    return this.newsResult.status === 'ok';
  }

  get totalRecords() {
    return this.newsResult.totalResults;
  }

  setPage($event: { first: number }) {
    this.pagination.emit({
      page: 1 + $event.first / this.rows,
      pageSize: this.rows
    });
  }

}
