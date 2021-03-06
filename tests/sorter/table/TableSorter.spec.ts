// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import * as jquery from "jquery";
// tslint:disable-next-line:no-implicit-dependencies
import { JSDOM } from "jsdom";
import { Direction, SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { TableSorter } from "../../../src/sorter/table/TableSorter";
import { createTable, createTableAsc, createTableAscWithDivs, createTableDescWithDivs, TableBuilder } from "../../utils/TableCreator";

describe("HTML Table sorter", () => {
    it("should given an html table structure sort it by string without extra information", () => {
        const options = new SortingOptions(false);
        const unsortedTable = createTable();
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAsc();
        const result = tableSorter.sort(Direction.Ascending, 1);
        expect(result.html()).to.be.equals(sortedTable.html());
    });

    it("should given an html table structure sort it in DESCENDING order by string without extra information", () => {
        const options = new SortingOptions(false);
        const unsortedTable = createTable();
        const sortedTable = createTableAsc();
        const tableSorter = new TableSorter(sortedTable, options);
        const result = tableSorter.sort(Direction.Descending, 1);
        expect(result.html()).to.be.equals(unsortedTable.html());
    });
});

describe("HTML Table-Like sorter", () => {
    it("should given an html table structure represented as divs, sort it by string without extra information", () => {
        const options = new SortingOptions(false, ".row", ".col");
        const unsortedTable = createTableDescWithDivs();
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAscWithDivs();
        const result = tableSorter.sort(Direction.Ascending, 1);
        expect(result.html()).to.be.equals(sortedTable.html());
    });
});

describe("HTML Table-Like sorter", () => {
    it("should not sort a table with lexicographic string order (11 lexicographically comes before 2)", () => {
        const options = new SortingOptions(false);
        const unsortedTableBuilder = new TableBuilder();

        unsortedTableBuilder
            .createRow()
            .addColumn("11", "<td>")
            .appendRow()
            .createRow()
            .addColumn("2", "<td>")
            .appendRow()
            ;

        const tableSorter = new TableSorter(unsortedTableBuilder.build(), options);
        const result = tableSorter.sort(Direction.Ascending, 0);

        expect(result.html()).to.be.equals(unsortedTableBuilder.build().html());
    });
});

describe("HTML With data supplied", () => {
    it("should  sort a table parsing the valies to integer", () => {
        const options = new SortingOptions(false);
        const unsortedTableBuilder = new TableBuilder();
        const sortedTableBuilder = new TableBuilder();

        const dataFlags: { [key: string]: string; } = {};
        dataFlags.type = "number";

        unsortedTableBuilder
            .createRow()
            .addColumn("11", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("2", "<td>", dataFlags)
            .appendRow()
            ;

        sortedTableBuilder
            .createRow()
            .addColumn("2", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("11", "<td>", dataFlags)
            .appendRow()
            ;

        const tableSorter = new TableSorter(unsortedTableBuilder.build(), options);
        const result = tableSorter.sort(Direction.Ascending, 0);

        expect(result.html()).to.be.equals(sortedTableBuilder.build().html());
    });
});

describe("HTML Table-Like sorter with header", () => {
    it("should sort table wihtout header row an html table with headers", () => {
        const options = new SortingOptions(true);
        const unsortedTable = createTable("<table>", "<tr>", "<td>", true);
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAsc("<table>", "<tr>", "<td>", true);
        const result = tableSorter.sort(Direction.Ascending, 1);
        expect(result.html()).to.be.equals(sortedTable.html());
    });
});
