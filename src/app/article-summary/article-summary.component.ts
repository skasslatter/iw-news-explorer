import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.sass']
})
export class ArticleSummaryComponent implements OnInit {

  @Input() title: string
  @Input() author: string
  @Input() publishedAt: string
  @Input() description: string

  constructor() { }

  ngOnInit() {
  }

}
