import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<SearchResult[]> {
    const page = 0
    const queryUrl = `api/image/search?q=${query}&p=${page}`;

    return this.http.get(queryUrl).pipe(
      map(response => {

        return <any>response['data'].map(item => {

          return new SearchResult({
            id: item.id,
            owner: item.owner,
            secret: item.secret,
            farm: item.farm,
            title: item.title,
            server: item.server,
            liked: item.liked
          });
        })
      }))
  }
  
  loadHistory(): Observable<string[]> {
    return this.http.get('api/image/history').pipe(
      map(response => {
        return <any>response['data'].map(item => {
          return item.query;
        })
      })
    )
  }

  likePhoto(photoId: string): Observable<any> {
    return this.http.post('api/image/like', { photoId })
  }
}
