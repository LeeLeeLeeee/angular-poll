import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit, OnChanges, OnDestroy {
  @Input() page : number;
  @Input() pageSize : number;
  @Input() lastPage : number;
  @Input() totalCount : number;
  @Output() changePage = new EventEmitter<number>()
  @ViewChild('pageInput') pageInput : ElementRef
  private clicks = new Subject();
  private subscription : Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(100)
    ).subscribe((e : any) => this.changePage.emit(e))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes): void {
    
  }

  keyDownPageHandler(event : KeyboardEvent) {
    if( event.key === 'Enter' ) {
      const page : number = +(event.target as HTMLInputElement).value
      if( page <= this.lastPage && page > 0 && !!page ) {
        this.changePage.emit(page)
      } else {
        this.pageInput.nativeElement.value = this.page;
      }
      
    } 
  }

  changePageWithDebouncing(page: number) {
    this.clicks.next(page);
  }
}
