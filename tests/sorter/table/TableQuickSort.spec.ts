// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { QuickSort } from "../../../src/sorter/algorithms/Mergesort";
import { DomTable } from "../../../src/sorter/collections/DomTable";
import { SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { Table } from "../../../src/sorter/table/Table";
import { createTable, createTableAsc, createTableAscWithDivs, createTableDescWithDivs } from "../../utils/TableCreator";

describe("Quick sort Table", () => {
    it("should given an html table structure sort it in DESCENDING order by string without extra information", () => {
        const options = new SortingOptions(false);
        const unsortedTable = createTable();
        const sortedTable = createTableAsc();
        const table = new Table(unsortedTable, options);
        const tableSorter = new QuickSort(new DomTable(table, 1));
        const result = tableSorter.sort();
        expect(result.getRaw()).to.be.equals(sortedTable.html());
    });
});

describe("HTML Table-Like sorter", () => {
    it("should given an html table structure represented as divs, sort it by string without extra information", () => {
        const options = new SortingOptions(false, ".row", ".col");
        const unsortedTable = createTableDescWithDivs();
        const table = new Table(unsortedTable, options);
        const tableSorter = new QuickSort(new DomTable(table, 1));
        const sortedTable = createTableAscWithDivs();
        const result = tableSorter.sort();
        expect(result.getRaw()).to.be.equals(sortedTable.html());
    });
});