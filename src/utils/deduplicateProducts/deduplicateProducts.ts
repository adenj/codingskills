import { FlattenedCompany } from "../../types/types";

export const deduplicateProducts = (products: FlattenedCompany[]) => {
  const results = [];
  products.forEach((element) => {
    products.forEach((iteratedElement) => {
      const hasDuplicateProducts =
        element.linkedBarcodes.some((r) =>
          iteratedElement.linkedBarcodes.includes(r)
        ) && products.indexOf(iteratedElement) !== products.indexOf(element);
      if (hasDuplicateProducts) {
        products.splice(products.indexOf(iteratedElement), 1);
      }
    });
    results.push({
      SKU: element.SKU,
      Description: element.Description,
      Source: element.source,
    });
  });
  return results;
};
