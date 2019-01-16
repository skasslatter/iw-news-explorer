import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DialogModule as IwDialogModule } from 'iwerk-angular-ui';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppComponent } from './app.component';
import { FeedArticlesComponent } from './feed-articles/feed-articles.component';
import { FeedBuilderComponent } from './feed-builder/feed-builder.component';
import { FeedComponent } from './feed/feed.component';
import { MenuComponent } from './menu/menu.component';
import { FeedStoreService } from './services/feed-store.service';
import { NewsApiService } from './services/news-api.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FeedComponent,
    FeedBuilderComponent,
    FeedArticlesComponent
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
    IwDialogModule
  ],
  providers: [
    FeedStoreService,
    NewsApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
