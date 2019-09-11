import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SearchResult } from '../search-result';
import { ImageSearchService } from '../image-search.service';
import { map, filter, debounceTime, tap, exhaust, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private searchService: ImageSearchService, private el: ElementRef) { }


  ngOnInit() {
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      debounceTime(250),
      tap(() => this.loading.emit(true)),
      map((query: string) => this.searchService.search(query)),
      switchAll()
    )
      .subscribe((data: any) => {

        this.loading.emit(false);
        this.results.emit(data);
      }),
      (err: any) => {
        console.log(err);
        this.loading.emit(false);
      },
      () => {
        this.loading.emit(false);
      }
  }

}
