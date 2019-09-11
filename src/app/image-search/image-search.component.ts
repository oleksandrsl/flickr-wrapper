import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;
  
  constructor() { }

  ngOnInit() {
  }
  updateResults(results: SearchResult[]) {
    this.results = results;
  }
}
