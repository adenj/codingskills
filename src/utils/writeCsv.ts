import ObjectToCsv from "objects-to-csv";
import path from "path";

const filePath = path.join(process.cwd(), "output", "output.csv");

export const writeCsv = async (data) => {
  const csv = new ObjectToCsv(data);
  await csv.toDisk(filePath);
};
