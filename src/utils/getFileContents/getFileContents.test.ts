import { getFileContents } from "./getFileContents";

describe("getFileContents", () => {
  it("should return the correct file contents from a CSV", async () => {
    const expected = [
      { Name: "Darcy Parish", Team: "Essendon Bombers" },
      { Name: "Dustin Martin", Team: "Richmond Tigers" },
      { Name: "Brodie Grundy", Team: "Collingwood Magpies" },
      { Name: "Joel Selwood", Team: "Geelong Cats" },
      { Name: "David Mundy", Team: "Fremantle Dockers" },
    ];
    const csvFileName = "football-players.csv";
    const actual = await getFileContents(csvFileName, true);
    expect(actual).toEqual(expected);
  });

  it("should throw an error if there is no data in CSV file", () => {
    const csvFileName = "football-players-no-data.csv";
    const errorMessage = `Error in ${csvFileName}: CSV data empty`;

    expect(async () => {
      await getFileContents(csvFileName, true);
    }).rejects.toThrow(new Error(errorMessage));
  });

  it("should throw an error if the file is not a CSV", async () => {
    const fileName = "football-players.txt";
    expect(async () => {
      await getFileContents(fileName, true);
    }).rejects.toThrow();
  });

  it("should throw an error if the file does not exist", () => {
    const fileName = "i-dont-exist.csv";
    expect(async () => {
      await getFileContents(fileName, true);
    }).rejects.toThrow(`i-dont-exist.csv does not exist`);
  });
});
