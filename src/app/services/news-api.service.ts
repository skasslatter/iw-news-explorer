import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  getSources() {
    return this.http.get<NewsAPI.SourceResult>('https://newsapi.org/v2/sources', {
      params: {
        apiKey: environment.apiKey
      }
    });
  }

  getNews(options: {
    page: number
    pageSize: number
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
    q: string
    sources: string[]
  }) {
    // used to avoid to reach API limits while testing
    // return of(<NewsAPI.NewsResult>{
    //   articles: [],
    //   status: 'ok',
    //   totalResults: 0
    // });
    return this.http.get<NewsAPI.NewsResult>('https://newsapi.org/v2/everything', {
      params: {
        page: String(options.page),
        pageSize: String(options.pageSize),
        sortBy: options.sortBy ? String(options.sortBy) : '',
        q: encodeURIComponent(options.q),
        sources: options.sources.join(','),
        apiKey: environment.apiKey
      }
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return of(<NewsAPI.NewsResult>{
            articles: [],
            status: 'error',
            totalResults: 0,
            error: error.error.message
          });
        }
      })
    );
  }
}
