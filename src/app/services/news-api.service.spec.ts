import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewsApiService } from './news-api.service';

describe('NewsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsApiService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([NewsApiService], (service: NewsApiService) => {
    expect(service).toBeTruthy();
  }));
});
