import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import {Delivery } from 'src/app/models/delivery';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  private delivery: Delivery[];
  constructor(private http: HttpClient) {

    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    this.delivery = [
      {name: 'motobike', sender:'Driver Name', senderName: Math.random().toString(36).slice(2),  contactName: 'Mobile', contactValue: Math.floor(Math.random() * 1000000000).toString(), senderDate: 'Delivery Date', dateValue: myDate.setDate(myDate.getDate() + 10).toString(), cost: 0, days: 10},
      {name: 'train',sender:'Train no', senderName: Math.random().toString(36).slice(2), contactName: 'Station of arrival', contactValue: Math.floor(Math.random() * 1000000000).toString(), senderDate: 'Date of arrival', dateValue: myDate.setDate(myDate.getDate() + 7).toString(), cost: 0, days: 7},
      {name: 'aircraft',sender:'Flight no', senderName: Math.random().toString(36).slice(2), contactName: 'Gate of arrival', contactValue: Math.floor(Math.random() * 1000000000).toString(), senderDate: 'Date of arrival', dateValue: myDate.setDate(myDate.getDate() + 2).toString(), cost: 0, days: 2}]
   }

  searchBooks<T = Book[]>(queryTitle: string) {
    return this.http.get<{ items: T }>(`${this.API_PATH}?q=${queryTitle}`);
    //.map(res => res.json().items || []);
  }

  retrieveBook<T = Book>(volumeId: string) {
    return this.http.get<T>(`${this.API_PATH}/${volumeId}`);
  }

  deliveryInforGenerator(service: string, cost: number){
    const object = this.delivery.find( e=> e.name == service);
    object.cost = cost;
    return object;
  }
}