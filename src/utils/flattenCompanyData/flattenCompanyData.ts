import { Company, CompanySource } from "../../types/types";

export const flattenCompanyData = (company: Company, source: CompanySource) => {
  ["catalog", "barcodes", "suppliers"].forEach((i) => {
    if (company[i].length < 1) {
      throw new Error(`${i} property missing`);
    }
  });
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
