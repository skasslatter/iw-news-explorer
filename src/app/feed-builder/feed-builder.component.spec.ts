import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedBuilderComponent } from './feed-builder.component';


describe('FeedBuilderComponent', () => {
  let component: FeedBuilderComponent;
  let fixture: ComponentFixture<FeedBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedBuilderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedBuilderComponent);
    component = fixture.componentInstance;
    component.availableSources = [];
    component.filter = {
      q: '',
      sources: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
