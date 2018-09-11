// Angular Dependency Injection. Dependency Injection (DI) is a way to create objects that depend upon other objects.
// A Dependency Injection system supplies the dependent objects (called the dependencies) when it creates an instance of an object.
// https://angular.io/guide/dependency-injection
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiBaseUrl = '//localhost:4000'

  constructor(private http: HttpClient) { }

  addItem(name, price) {
    const payload = {
      name: name,
      price: price
    };
    return this.http.post(`${this.apiBaseUrl}/items`, payload);
  }

  getItems() {
   return this
          .http
          .get(`${this.apiBaseUrl}/items`);
  }

  getItem(id) {
    return this
          .http
          .get(`${this.apiBaseUrl}/items/${id}`)
    }

  updateItem(name, price, id) {
      const payload = {
          name: name,
          price: price
      };

      return this
        .http
        .put(`${this.apiBaseUrl}/items/${id}`, payload);
  }

  deleteItem(id) {
    return this
          .http
          .delete(`${this.apiBaseUrl}/items/${id}`)
  }


}
