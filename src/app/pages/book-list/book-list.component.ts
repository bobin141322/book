import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service'
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/book';
import { map, takeUntil, tap, switchMap, filter, catchError, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  searchTerm = new FormControl('');
  dataSource = new BehaviorSubject<Book[]>([]);
  bookId = 0;

  constructor(private bookService: BookService) {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(''),
        tap(() => {
        })).subscribe(() => {
          this.getBookList();
          console.log('search');
        });

  }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList() {
    const query  = !this.searchTerm.value? 'wind' : this.searchTerm.value;
    this.bookService.searchBooks(query).pipe(
      tap(res => {
        this.dataSource.next(res.items)
      }))
      .subscribe();
  }

  openPopup(id) {
    this.bookId = id;
  }

}
