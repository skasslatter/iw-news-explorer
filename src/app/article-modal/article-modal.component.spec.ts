import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModalComponent } from './article-modal.component';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('ArticleModalComponent', () => {
  let component: ArticleModalComponent;
  let fixture: ComponentFixture<ArticleModalComponent>;
  const article = {
    author: "John Doe",
    description: "Second Trump-Biden debate has fewer interruptions but more counterpunches. " +
      "Second Trump-Biden debate has fewer interruptions but more counterpunches." +
      "Second Trump-Biden debate has fewer interruptions but more counterpunches." +
      "Second Trump-Biden debate has fewer interruptions but more counterpunches." +
      "Second Trump-Biden debate has fewer interruptions but more counterpunches." +
      "Second Trump-Biden debate has fewer interruptions but more counterpunches.",
    publishedAt: "2020-10-23T08:26:58Z",
    source: {
      id: "1",
      name: "Washington Post",
    },
    title: "Second Presidential Debate",
    url: "www.washingtonpost.com",
    urlToImage: "https://chuckanddons.com/media/wysiwyg/kitten_blog.jpg",
    content: "NASHVILLE — President Trump tried to cast Joe Biden as a ­scandal-plagued politician who had failed over " +
      "decades in office, and Biden sought to portray Trump as a demagogue who criminally abused immigrants and " +
      "mishandled the Coronavirus pandemic as the two presidential contenders counterpunched on a wide range of policy " +
      "issues in their second and final debate.",
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ArticleModalComponent,
        Dialog,
        Button
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModalComponent);
    component = fixture.componentInstance;
    component.article = article;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.displayModal = true
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const title = bannerElement.querySelector('.ui-dialog-title');
    expect(title.innerHTML).toEqual(`${article.title}`);
  });

  it('should display the correct article info', () => {
    component.displayModal = true
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const content = bannerElement.querySelector('p-dialog p');
    expect(content.innerHTML).toEqual(`${article.content}`);
  });

  it('should display the modal', () => {
    component.displayModal = false
    expect(component.displayModal).toBe(false, 'hidden at first');
    component.showModal();
    expect(component.displayModal).toBe(true, 'shown after click');
  });
})
;
