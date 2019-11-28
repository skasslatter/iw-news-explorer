import { NgRedux, select } from '@angular-redux/store';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDirective } from 'iwerk-angular-ui';
import { Observable } from 'rxjs';
import { FeedStoreService } from '../services/feed-store.service';
import { FeedsActions } from '../state/actions/feeds.actions';
import { IRootState } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.sass']
})
export class FeedHeaderComponent {
  @select((s: IRootState) => s.misc.currentFeed.name)
  name$: Observable<string>;

  @select((s: IRootState) => !!s.misc.currentFeed)
  isSavedFeed$: Observable<boolean>;

  @select((s: IRootState) => !s.misc.currentFeed)
  isNewFeed$: Observable<string>;

  @Output() reset = new EventEmitter();

  @ViewChild('createDialog', { static: false }) createDialog: DialogDirective;

  newFeedName = '';

  constructor(
    private route: ActivatedRoute,
    private store: FeedStoreService,
    private router: Router,
    private feedsActions: FeedsActions,
    private redux: NgRedux<IRootState>
  ) {

  }

  onCancel() {
    this.createDialog.close();
  }

  onSave() {
    this.store.update(this.route.snapshot.params.id, {
      filters: this.redux.getState().articles.filter
    }).subscribe(feed => {
      this.redux.dispatch(this.feedsActions.update(feed));
    });
  }

  onReset() {
    this.reset.emit();
  }

  onDelete() {
    const id = this.route.snapshot.params.id;
    this.store.remove(id).subscribe(() => {
      this.redux.dispatch(this.feedsActions.remove(id));
      this.router.navigate(['/']);
    });
  }

  onCreate() {
    this.newFeedName = '';
    this.createDialog.open();
  }

  onConfirmCreate() {
    this.store.create({
      name: this.newFeedName,
      filters: this.redux.getState().articles.filter
    }).subscribe(feed => {
      this.redux.dispatch(this.feedsActions.add(feed));
      this.router.navigate([feed.id]);
    });
  }
}
