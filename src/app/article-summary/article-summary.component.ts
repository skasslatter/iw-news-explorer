import { Component, Input, OnInit } from '@angular/core';
import Article = NewsAPI.Article;

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.sass']
})
export class ArticleSummaryComponent implements OnInit {

  @Input() article: Article

  constructor() { }

  ngOnInit() {
  }

}
