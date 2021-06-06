import minimist from "minimist";
import { Company } from "./types/types";
import { flattenCompanyData } from "./utils/flattenCompanyData";
import { getFileContents } from "./utils/getFileContents";
import { deduplicateProducts } from "./utils/dedupelicateProducts";
import { writeCsv } from "./utils/writeCsv";

const argv = minimist(process.argv.slice(2));
const { aCatalog, aBarcodes, aSuppliers, bCatalog, bBarcodes, bSuppliers } =
  argv;

const app = async () => {
  const parentCompanyFiles: Company = {
    catalog: await getFileContents(aCatalog),
    barcodes: await getFileContents(aBarcodes),
    suppliers: await getFileContents(aSuppliers),
  };

  const aquiredCompanyFiles: Company = {
    catalog: await getFileContents(bCatalog),
    barcodes: await getFileContents(bBarcodes),
    suppliers: await getFileContents(bSuppliers),
  };

  const mergedCompanies = [
    ...flattenCompanyData(parentCompanyFiles, "A"),
    ...flattenCompanyData(aquiredCompanyFiles, "B"),
  ];

  const products = deduplicateProducts(mergedCompanies);
  writeCsv(products);
};

app();
