import { flattenCompanyData } from "./flattenCompanyData";

describe("flattenCompanyData", () => {
  it("should return company data in merged array format", () => {
    const props = {
      catalog: [
        { SKU: "647-vyk-317", Description: "Walkers Special Old Whiskey" },
        { SKU: "280-oad-768", Description: "Bread - Raisin" },
        { SKU: "165-rcy-650", Description: "Tea - Decaf 1 Cup" },
        {
          SKU: "650-epd-782",
          Description: "Carbonated Water - Lemon Lime",
        },
      ],
      barcodes: [
        {
          SupplierID: "00005",
          SKU: "647-vyk-317",
          Barcode: "r4059282550570",
        },
        {
          SupplierID: "00005",
          SKU: "280-oad-768",
          Barcode: "k3213966445562",
        },
        {
          SupplierID: "00005",
          SKU: "165-rcy-650",
          Barcode: "a3343396882074",
        },
      ],
      suppliers: [
        { ID: "00001", Name: "Twitterbridge" },
        { ID: "00002", Name: "Thoughtsphere" },
        { ID: "00003", Name: "Photobug" },
        { ID: "00004", Name: "Jatri" },
        { ID: "00005", Name: "Trunyx" },
      ],
    };

    const expected = [
      {
        SKU: "647-vyk-317",
        Description: "Walkers Special Old Whiskey",
        linkedBarcodes: ["r4059282550570"],
        source: "A",
      },
      {
        SKU: "280-oad-768",
        Description: "Bread - Raisin",
        linkedBarcodes: ["k3213966445562"],
        source: "A",
      },
      {
        SKU: "165-rcy-650",
        Description: "Tea - Decaf 1 Cup",
        linkedBarcodes: ["a3343396882074"],
        source: "A",
      },
      {
        SKU: "650-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        linkedBarcodes: [],
        source: "A",
      },
    ];

    const actual = flattenCompanyData(props, "A");
    expect(actual).toEqual(expected);
  });

  it("should throw an error if one of the required properties is missing or has zero length", () => {
    const props = {
      catalog: [],
      barcodes: [
        {
          SupplierID: "00005",
          SKU: "647-vyk-317",
          Barcode: "r4059282550570",
        },
      ],
      suppliers: [{ ID: "00001", Name: "Twitterbridge" }],
    };

    expect(() => {
      flattenCompanyData(props, "A");
    }).toThrow();
  });
});
