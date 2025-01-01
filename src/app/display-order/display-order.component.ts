import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../models/item.model';
import { Vendor } from '../models/vendor.model';

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {
  items: Item[] = [];
  orderItems: Item[] = [];
  vendors: Vendor[] = [];
  displayedVendorColumns: string[] = ['label', 'value'];
  selectedVendor: Vendor | null = null;
  vatPercent: number = 5; // Default VAT percentage
  purchaseOrderDate: Date | null = new Date(); // Default purchase order date
  purchaseOrderNo: string = ''; // Purchase Order Number
  projectNo: string = ''; // Project Number

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Initialize 8 unique empty rows
    this.orderItems = Array.from({ length: 8 }, () => ({
      itemId: null,
      partNo: '',
      make: '',
      description: '',
      unitPrice: 0,
      quantity: 0,
      total: 0
    }));

    // Fetch items and vendors
    this.apiService.getItems().subscribe((items) => (this.items = items));
    this.apiService.getVendors().subscribe((vendors) => (this.vendors = vendors));
  }

  loadItemDetails(rowIndex: number, partNo: string): void {
    const selectedItem = this.items.find(
      (item) => item.partNo.toLowerCase() === partNo.toLowerCase()
    );
  
    if (selectedItem) {
      // Populate row with item details
      this.orderItems[rowIndex] = {
        ...selectedItem,
        quantity: 0,
        total: 0
      };
    } else {
      alert('Part number not found!');
      // Clear the row if no match is found
      this.orderItems[rowIndex] = {
        itemId: null,
        partNo: partNo,
        make: '',
        description: '',
        unitPrice: 0,
        quantity: 0,
        total: 0
      };
    }
  }

  validateQuantity(item: Item): void {
    if (item.quantity < 0) {
      alert('Quantity cannot be negative.');
      item.quantity = 0; // Reset to zero
    }
  }
  
  // Calculate total for a single row
  calculateTotal(item: any): void {
    item.total = item.unitPrice * (item.quantity || 0);
  }

  // Calculate total before VAT
calculateTotalBeforeVAT(): number {
  return this.orderItems.reduce((sum, item) => sum + item.total, 0);
}

calculateVATAmount(): number {
  const totalBeforeVat = this.calculateTotalBeforeVAT();
  return (totalBeforeVat * this.vatPercent) / 100;
}

  // Calculate grand total with VAT
  calculateGrandTotal(): number {
    const totalBeforeVat = this.orderItems.reduce((sum, item) => sum + item.total, 0);
    const vatAmount = (totalBeforeVat * this.vatPercent) / 100;
    return totalBeforeVat + vatAmount;
  }
  addNewItemRow(): void {
    this.orderItems.push({
      itemId: null,
      partNo: '',
      make: '',
      description: '',
      unitPrice: 0,
      quantity: 0,
      total: 0
    });
  }
  
}
