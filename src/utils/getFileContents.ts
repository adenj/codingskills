import { createReadStream } from "fs";
import csv from "csv-parser";
import path from "path";
import { Supplier, Product, Barcode } from "../types/types";

export const getFileContents = (fileName: string): any =>
  new Promise<Supplier[] | Product[] | Barcode[]>((resolve, reject) => {
    const filePath = path.join(process.cwd(), "input", fileName);
    const results: Supplier[] | Product[] | Barcode[] = [];
    createReadStream(filePath)
      .pipe(csv())
      .on("error", (error) => {
        console.log("ERROR: ", error);
        reject;
      })
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
