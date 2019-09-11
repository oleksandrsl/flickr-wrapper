import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  constructor(private imageSearchService: ImageSearchService) { }
  queries: string[];
  ngOnInit() {
     this.imageSearchService.loadHistory().subscribe(data => {
      this.queries = data;
    });
  }

}
