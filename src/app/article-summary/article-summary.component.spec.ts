import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSummaryComponent } from './article-summary.component';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { TruncatePipe } from "../pipes/truncate/truncate.pipe";
import { ArticleModalComponent } from "../article-modal/article-modal.component";
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";

describe('ArticleSummaryComponent', () => {
  let component: ArticleSummaryComponent;
  let fixture: ComponentFixture<ArticleSummaryComponent>;
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
      declarations: [
        ArticleSummaryComponent,
        MatCard,
        MatCardActions,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardAvatar,
        TruncatePipe,
        ArticleModalComponent,
        Dialog,
        Button
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSummaryComponent);
    component = fixture.componentInstance;
    component.article = article;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the article title', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const title = bannerElement.querySelector('mat-card-title');
    expect(title.innerHTML).toEqual(article.title);
  });
  it('should display the article date', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const date = bannerElement.querySelectorAll('mat-card-subtitle small')[0];
    expect(date.innerHTML).toEqual('Oct 23, 2020, 10:26:58 AM');
  });
  it('should display the article author and source', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const author = bannerElement.querySelectorAll('mat-card-subtitle small')[1];
    expect(author.innerHTML).toEqual(`by ${article.author} for ${article.source.name}`);
  });
  it('should display the description limited to 200 characters', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const article = bannerElement.querySelector('mat-card-content p');
    expect(article.innerHTML).toEqual('Second Trump-Biden debate has fewer interruptions but more counterpunches. Second Trump-Biden debate has fewer interruptions but more counterpunches.Second Trump-Biden debate has fewer interruptions b...');
  });
})
;
