import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedArticlesComponent } from './feed-articles.component';


describe('FeedArticlesComponent', () => {
  let component: FeedArticlesComponent;
  let fixture: ComponentFixture<FeedArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedArticlesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedArticlesComponent);
    component = fixture.componentInstance;
    component.newsResult = {
      articles: [],
      error: null,
      status: 'ok',
      totalResults: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
