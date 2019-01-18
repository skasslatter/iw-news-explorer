import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'iwerk-angular-ui';
import { of } from 'rxjs';
import { FeedStoreService } from '../services/feed-store.service';
import { NewsApiService } from '../services/news-api.service';
import { FeedComponent } from './feed.component';


describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent],
      imports: [DialogModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: NewsApiService,
        useValue: {
          getSources: () => of([])
        }
      }, {
        provide: FeedStoreService,
        useValue: {}
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
