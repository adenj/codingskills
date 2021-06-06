type Sku = string;

export type CompanySource = "A" | "B";

export interface Product {
  SKU: Sku;
  Description: string;
}

export interface Barcode {
  SupplierID: string;
  SKU: Sku;
  Barcode: string;
}

export interface Supplier {
  ID: string;
  Name: string;
}

export interface Company {
  catalog: Product[];
  barcodes: Barcode[];
  suppliers: Supplier[];
}

export interface FlattenedCompany extends Product {
  linkedBarcodes: string[];
  source: CompanySource;
}
