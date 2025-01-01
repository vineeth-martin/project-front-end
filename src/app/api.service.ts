

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from './models/vendor.model';
import { Item } from './models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private baseUrl = 'http://localhost:8080/api';  // Backend URL

  constructor(private http: HttpClient) { }

  // Vendor API methods
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors`);
  }

  saveVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.baseUrl}/vendors`, vendor);
  }
  deleteVendor(vendorId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vendors/${vendorId}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }

  saveItem(item: Item): Observable<Item> {
      // Create new item
      return this.http.post<Item>(`${this.baseUrl}/items`, item);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${itemId}`);
  }
  
  // Other APIs can be added similarly
}
