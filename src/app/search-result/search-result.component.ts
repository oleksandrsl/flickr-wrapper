import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../search-result';
import { ImageSearchService } from '../image-search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() image: SearchResult;

  constructor(private iamgeSearchService: ImageSearchService) { }

  ngOnInit() {
  }

  like() {
    this.iamgeSearchService.likePhoto(this.image.id).subscribe(result => {
      this.image.liked = true;
    })
  }

  unlike() {
    console.log('not implemented')
  }
}
