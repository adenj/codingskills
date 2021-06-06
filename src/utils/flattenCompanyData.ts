import { Company, CompanySource } from "../types/types";

export const flattenCompanyData = (company: Company, source: CompanySource) => {
  return company.catalog.map((item) => {
    const linkedBarcodes = company.barcodes
      .filter((barcode) => barcode.SKU === item.SKU)
      .map((barcode) => barcode.Barcode);
    if (linkedBarcodes) {
      return {
        ...item,
        linkedBarcodes,
        source,
      };
    }
  });
};
