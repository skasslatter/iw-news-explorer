import { NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedArticlesComponent } from './feed-articles.component';


describe('FeedArticlesComponent', () => {
  let component: FeedArticlesComponent;
  let fixture: ComponentFixture<FeedArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedArticlesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NgReduxTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
