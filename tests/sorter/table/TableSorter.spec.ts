import { TableSorter } from "../../../src/sorter/table/TableSorter";
import { expect } from "chai";
import * as jquery from "jquery";
import { JSDOM } from "jsdom";
import { createTable, createTableAsc, createTableDescWithDivs, createTableAscWithDivs } from "../../utils/TableCreator";
import { Direction, SortingOptions } from "../../../src/sorter/options/SortingOptions";


describe("HTML Table sorter", () => {
    it("should given an html table structure sort it by string without extra information", () => {
        const options = new SortingOptions(Direction.Ascending, 1, false);
        const unsortedTable = createTable();
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAsc();
        const result = tableSorter.sort();
        expect(result.html()).to.be.equals(sortedTable.html());
    });
});


describe("HTML Table-Like sorter", () => {
    it("should given an html table structure represented as divs, sort it by string without extra information", () => {
        const options = new SortingOptions(Direction.Ascending, 1, false, ".row", ".col");
        const unsortedTable = createTableDescWithDivs();
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAscWithDivs();
        const result = tableSorter.sort();
        console.log(result.html());
        expect(result.html()).to.be.equals(sortedTable.html());
    });
});

