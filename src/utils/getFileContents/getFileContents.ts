import { createReadStream, existsSync, fstat } from "fs";
import csv from "csv-parser";
import path from "path";
import { Supplier, Product, Barcode } from "../../types/types";

export const getFileContents = (
  fileName: string,
  test: boolean = false
): any => {
  const inputFolder = test ? "test-input" : "input";
  const filePath = path.join(process.cwd(), inputFolder, fileName);
  const fileType = fileName.split(".").pop();
  if (fileType !== "csv") {
    throw Error("File type must be .csv");
  }

  if (existsSync(filePath)) {
    return new Promise<Supplier[] | Product[] | Barcode[]>(
      (resolve, reject) => {
        const results: Supplier[] | Product[] | Barcode[] = [];
        createReadStream(filePath)
          .pipe(csv())
          .on("error", (error) => {
            console.log("ERROR: ", error);
            reject;
          })
          .on("data", (data) => {
            results.push(data);
          })
          .on("end", () => {
            if (results.length < 1) {
              const errorMessage = `Error in ${fileName}: CSV data empty`;
              throw new Error(errorMessage);
            }
            resolve(results);
          });
      }
    );
  } else {
    const error = `${filePath} does not exist`;
    throw new Error(error);
  }
};
