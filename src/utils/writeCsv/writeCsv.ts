import ObjectToCsv from "objects-to-csv";
import path from "path";

export const writeCsv = async (data, output = "output.csv") => {
  const filePath = path.join(process.cwd(), "output", output);
  const csv = new ObjectToCsv(data);
  await csv.toDisk(filePath);
};
