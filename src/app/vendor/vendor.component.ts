

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Vendor } from '../models/vendor.model';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendors: Vendor[] = [];
  newVendor: Vendor = { vendorId: 0, name: '', address: '', postAddress: '', trn: '' };
  filteredVendors: any[] = []; // Filtered vendors for the dropdown
  searchQuery: string = ''; // For search input

  constructor(private apiService: ApiService) {
    console.log('DisplayOrderComponent initialized');

   }

  ngOnInit(): void {
    console.log('DisplayOrderComponent initialized');

    this.loadVendors();
  }

  loadVendors(): void {
    this.apiService.getVendors().subscribe((vendors) => {
      this.vendors = vendors;
    });
  }

  addVendor(): void {
    this.apiService.saveVendor(this.newVendor).subscribe((vendor) => {
      this.vendors.push(vendor);
      this.newVendor = { vendorId: 0, name: '', address: '', postAddress: '', trn: '' };  // Reset the form
    });
  }
  onSearchQueryChange() {
    if (this.searchQuery.trim() === '') {
      this.filteredVendors = [];
      return;
    }

    this.filteredVendors = this.vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // If an exact match is found, populate the form fields
    const selectedVendor = this.vendors.find(
      (vendor) => vendor.name.toLowerCase() === this.searchQuery.toLowerCase()
    );

    if (selectedVendor) {
      this.newVendor = { ...selectedVendor };
    }
  }
  deleteVendor(vendorId: number): void {
    this.apiService.deleteVendor(vendorId).subscribe(() => {
      this.vendors = this.vendors.filter(vendor => vendor.vendorId !== vendorId);
    });
  }

}

