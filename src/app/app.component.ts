import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { MiscActions } from './state/actions/misc.actions';
import { IRootState } from './state/reducers/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @select((s: IRootState) => s.misc.isInitialLoading)
  isLoading$: Observable<boolean>;

  @select((s: IRootState) => s.misc.isGettingFeed)
  isLoadingFeed$: Observable<boolean>;

  explorerLoadingIcon = faSpaceShuttle;

  constructor(
    private redux: NgRedux<IRootState>,
    private actions: MiscActions
  ) {
  }

  ngOnInit() {
    this.redux.dispatch(this.actions.loadInitialData());
  }
}
