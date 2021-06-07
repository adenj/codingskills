import { CompanySource } from "../../types/types";
import { deduplicateProducts } from "./deduplicateProducts";

describe("deduplicateProducts", () => {
  const props = [
    {
      SKU: "647-vyk-317",
      Description: "Walkers Special Old Whiskey",
      linkedBarcodes: [
        "z2783613083817",
        "z2783613083818",
        "z2783613083819",
        "n7405223693844",
        "c7417468772846",
      ],
      source: "A" as CompanySource,
    },
    {
      SKU: "280-oad-768",
      Description: "Bread - Raisin",
      linkedBarcodes: [
        "p2359014924610",
        "a7802303764525",
        "o5194275040472",
        "j9023946968130",
        "x5678105140949",
      ],
      source: "A" as CompanySource,
    },
    {
      SKU: "165-rcy-650",
      Description: "Tea - Decaf 1 Cup",
      linkedBarcodes: [
        "u5160747892301",
        "m8967092785598",
        "l7342139757479",
        "p1667270888414",
        "v0874763455559",
        "p9774916416859",
      ],
      source: "A" as CompanySource,
    },
    {
      SKU: "167-eol-949",
      Description: "Cheese - Grana Padano",
      linkedBarcodes: [
        "a6971219877032",
        "a7340270328026",
        "a0126648261918",
        "a9858014383660",
        "a2338856941909",
        "a5056026479965",
      ],
      source: "A" as CompanySource,
    },
    {
      SKU: "650-epd-782",
      Description: "Carbonated Water - Lemon Lime",
      linkedBarcodes: [
        "n8954999835177",
        "d2381485695273",
        "y0588794459804",
        "v8710606253394",
      ],
      source: "A" as CompanySource,
    },
    {
      SKU: "999-vyk-317",
      Description: "Walkers Special Old Whiskey test",
      linkedBarcodes: [
        "z2783613083817",
        "n7405223693844",
        "c7417468772846",
        "w3744746803743",
      ],
      source: "B" as CompanySource,
    },
    {
      SKU: "999-oad-768",
      Description: "Bread - Raisin",
      linkedBarcodes: [
        "p2359014924610",
        "a7802303764525",
        "o5194275040472",
        "j9023946968130",
      ],
      source: "B" as CompanySource,
    },
    {
      SKU: "165-rcy-650",
      Description: "Tea - Decaf 1 Cup",
      linkedBarcodes: [
        "u5160747892301",
        "m8967092785598",
        "l7342139757479",
        "p1667270888414",
        "v0874763455559",
      ],
      source: "B" as CompanySource,
    },
    {
      SKU: "999-eol-949",
      Description: "Cheese - Grana Padano",
      linkedBarcodes: [
        "x6971219877032",
        "x7340270328026",
        "x0126648261918",
        "x9858014383660",
        "x2338856941909",
      ],
      source: "B" as CompanySource,
    },
    {
      SKU: "999-epd-782",
      Description: "Carbonated Water - Lemon Lime",
      linkedBarcodes: ["b8954999835177", "b2381485695273", "b0588794459804"],
      source: "B" as CompanySource,
    },
  ];

  it("should remove duplicate items based on barcode", () => {
    const expected = [
      {
        SKU: "647-vyk-317",
        Description: "Walkers Special Old Whiskey",
        Source: "A",
      },
      { SKU: "280-oad-768", Description: "Bread - Raisin", Source: "A" },
      { SKU: "165-rcy-650", Description: "Tea - Decaf 1 Cup", Source: "A" },
      {
        SKU: "167-eol-949",
        Description: "Cheese - Grana Padano",
        Source: "A",
      },
      {
        SKU: "650-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "A",
      },
      {
        SKU: "999-eol-949",
        Description: "Cheese - Grana Padano",
        Source: "B",
      },
      {
        SKU: "999-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "B",
      },
    ];
    const actual = deduplicateProducts(props);

    expect(actual).toEqual(expected);
  });
});
