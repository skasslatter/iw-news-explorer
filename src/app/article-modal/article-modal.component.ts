import { Component, Input, OnInit } from '@angular/core';
import Article = NewsAPI.Article;

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.sass']
})
export class ArticleModalComponent implements OnInit {
  displayModal: boolean;

  @Input() article: Article

  constructor() {
  }

  ngOnInit() {
  }

  showDialog() {
    this.displayModal = true;
  }
}
