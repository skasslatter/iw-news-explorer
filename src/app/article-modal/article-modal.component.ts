import { Component, Input } from '@angular/core';
import Article = NewsAPI.Article;

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.sass']
})
export class ArticleModalComponent {
  displayModal: boolean;

  @Input()
  article: Article

  showModal() {
    this.displayModal = true;
  }
}
