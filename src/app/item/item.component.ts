

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  items: Item[] = []; // List of all items
  newItem: Item = {
    itemId: 0, description: '', partNo: '', unitPrice: 0,
    make: ''
  }; // Item to add or update
  filteredItems: Item[] = []; // Items filtered by search
  searchQuery: string = ''; // Query for search input

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // Load items from the backend
  loadItems(): void {
    this.apiService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addItem(): void {
    this.apiService.saveItem(this.newItem).subscribe({
      next: (item) => {
        if (!this.items.some((i) => i.itemId === item.itemId)) {
          // Add new item to the list
          this.items.push(item);
        } else {
          // Update existing item in the list
          const index = this.items.findIndex((i) => i.itemId === item.itemId);
          this.items[index] = item;
        }
        this.newItem = { itemId: 0, description: '', partNo: '', unitPrice: 0, make: '' }; // Reset the form
      },
      error: (err) => {
        console.error('Error saving item:', err);
        alert(err.error.message);
      }
    });
  }
  

  onSearchQueryChange(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredItems = [];
      return;
    }
  
    // Filter items based on search query (match description or part number)
    this.filteredItems = this.items.filter((item) =>
      `${item.description} - ${item.partNo}`.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  
    // Extract the part number from the search query (if formatted as "description - partNo")
    const partNoFromQuery = this.searchQuery.split(' - ').pop()?.trim();
  
    // Populate the form if a matching item is found based on the unique part number
    const selectedItem = this.items.find((item) => item.partNo.toLowerCase() === partNoFromQuery?.toLowerCase());
  
    if (selectedItem) {
      this.newItem = { ...selectedItem };
    }
  }
  
  deleteItem(itemId: number): void {
      this.apiService.deleteItem(itemId).subscribe(() => {
        this.items= this.items.filter(item => item.itemId !== itemId);
      });
    }

}
