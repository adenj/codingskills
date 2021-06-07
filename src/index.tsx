import minimist from "minimist";
import { Company } from "./types/types";
import { flattenCompanyData } from "./utils/flattenCompanyData/flattenCompanyData";
import { getFileContents } from "./utils/getFileContents/getFileContents";
import { deduplicateProducts } from "./utils/deduplicateProducts/deduplicateProducts";
import { writeCsv } from "./utils/writeCsv/writeCsv";

const expectedArgs = [
  "aCatalog",
  "aBarcodes",
  "aSuppliers",
  "bCatalog",
  "bBarcodes",
  "bSuppliers",
];

const argv = minimist(process.argv.slice(2));
const {
  aCatalog,
  aBarcodes,
  aSuppliers,
  bCatalog,
  bBarcodes,
  bSuppliers,
  output,
} = argv;

const app = async () => {
  expectedArgs.forEach((arg) => {
    if (!eval(arg)) {
      const error = `Missing ${arg} argument`;
      throw new Error(error);
    }
  });

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
  writeCsv(products, output);
};

app();
