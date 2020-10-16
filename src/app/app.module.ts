import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule as IwDialogModule } from 'iwerk-angular-ui';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { AppComponent } from './app.component';
import { FeedArticlesComponent } from './feed-articles/feed-articles.component';
import { FeedBuilderComponent } from './feed-builder/feed-builder.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';
import { FeedComponent } from './feed/feed.component';
import { MenuComponent } from './menu/menu.component';
import { ArticlesEpic } from './state/epics/articles.epic';
import { MiscEpic } from './state/epics/misc.epic';
import { IRootState, rootReducer } from './state/reducers/root.reducer';
import { ArticleSummaryComponent } from './article-summary/article-summary.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FeedComponent,
    FeedBuilderComponent,
    FeedArticlesComponent,
    FeedHeaderComponent,
    ArticleSummaryComponent
  ],
  imports: [
    BrowserModule,
    TabMenuModule,
    PaginatorModule,
    RouterModule.forRoot([{
      path: '',
      component: FeedComponent
    }, {
      path: ':id',
      component: FeedComponent
    }]),
    HttpClientModule,
    DialogModule,
    MultiSelectModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    IwDialogModule,
    NgReduxModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IRootState>,
    articlesEpic: ArticlesEpic,
    miscEpic: MiscEpic
  ) {
    const epicMiddleware = createEpicMiddleware();
    ngRedux.configureStore(rootReducer, {
      misc: undefined,
      articles: {
        filter: {
          q: '',
          sources: []
        },
        pagination: {
          page: 1,
          pageSize: 10
        },
        result: {
          articles: [],
          status: 'ok',
          totalResults: 0,
        }
      },
      feeds: {
        feeds: []
      }
    }, [
        createLogger(),
        epicMiddleware
      ]);
    epicMiddleware.run(combineEpics(
      articlesEpic.fetch,
      miscEpic.loadInitialData,
      miscEpic.loadFeed
    ));
  }
}
