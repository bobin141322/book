import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from '../book.service'
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/book';
import {Delivery } from 'src/app/models/delivery';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil, tap, switchMap, filter, catchError, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  @Input() bookId;
  book: Book;
  costs:any;
  delieveryInfo: any;
  delivery: Delivery;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {
    //init cost
    this.costs = [
      { name: 'motobike', baseCost: 5, summer: 0.5, sept: 1.5 },
      { name: 'train', baseCost: 10, summer: 0.8, sept: 1.8 },
      { name: 'aircraft', baseCost: 20, summer: 0.8, sept: 2 }
    ];
  }

  ngOnInit(): void {
    const month = + new Date().getMonth;
    if(month > 5 && month < 9){
      this.costs.map(e=>{
        return e.baseCost *= e.summer
      });
    } else if(month== 9){
      this.costs.map(e=>{
        return e.baseCost *= e.sept
      });
    }
  }

  ngOnChanges(){
    if(this.bookId){
      this.getDetail();
      this.delivery = null;
    }
  }

  getDetail() {
    this.bookService.retrieveBook(this.bookId).pipe(
      tap(data=> this.book = data)
    ).subscribe()
  }

  selectDelivery(name, cost){
    this.delieveryInfo = {
      name: name,
      cost: cost
    };
  }
  buyBook(){
    this.delivery = this.bookService.deliveryInforGenerator(this.delieveryInfo.name, this.delieveryInfo.cost);
  }
}
