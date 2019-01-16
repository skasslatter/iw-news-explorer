import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-feed-builder',
  templateUrl: './feed-builder.component.html',
  styleUrls: ['./feed-builder.component.sass']
})
export class FeedBuilderComponent implements OnInit {
  @Input() filter: NewsFeedFilter;
  @Input() availableSources: NewsAPI.Source[];

  @Output() filterChange = new EventEmitter<NewsFeedFilter>();
  onQueryChange: (query: string) => void;

  get options(): SelectItem[] {
    return this.availableSources.map(s => (<SelectItem>{
      id: s.id,
      value: s.id,
      label: s.name
    }));
  }

  get query() {
    return this.filter ? this.filter.q : '';
  }

  get sources() {
    return this.filter ? this.filter.sources : [];
  }

  constructor() {
    this.onQueryChange = (() => {
      const subj = new Subject<string>();
      subj.pipe(debounceTime(1000))
        .subscribe(query => {
          this.filterChange.emit({
            q: query,
            sources: this.filter.sources
          });
        });
      return (query: string) => {
        subj.next(query);
      };
    })();
  }

  ngOnInit() {
  }

  onSourcesChange(sources: string[]) {
    this.filterChange.emit({
      q: this.filter.q,
      sources
    });
  }
}
