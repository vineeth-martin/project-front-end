export interface Item {
    itemId: number;
    description: string;
    partNo: string;
    unitPrice: number;
    make: string; // New field
    quantity?: number; // Optional field for quantity
    total?: number;    // Optional field for total
  
  }
  