# Coding Skills Challenge

### Background

This project was built using Node and Typescript.

Yarn or npm is required to run it.

Some assumptions made were that Company A is always the aquiring company, and Company B are the aquired company, and that the file structures always match that of the given examples.

### Setup

```sh
git clone git@github.com:adenj/codingskills.git
cd codingskills
yarn
```

## Usage

> Note: It is expected that all input csv files live in the `input` folder

Run the script with `yarn merge` followed by the list of expected arguments and a .csv will be produced in the output folder.

**Expected arguments**

```
--aBarcodes=[.csv file]
--aCatalog=[.csv file]
--aSuppliers=[.csv file]
--bBarcodes=[.csv file]
--bCatalog=[.csv file]
--bSuppliers=[.csv file]
--output=[fileName.csv] [optional]
```

**Example usage**

`yarn merge --aBarcodes=barcodesA.csv --aCatalog=catalogA.csv --aSuppliers=suppliersA.csv --bBarcodes=barcodesB.csv --bCatalog=catalogB.csv --bSuppliers=suppliersB.csv --output=cool-file-name.csv`

**Testing**

Run unit tests with `yarn test`
