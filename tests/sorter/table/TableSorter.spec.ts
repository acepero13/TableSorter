import { TableSorter } from "../../../src/sorter/table/TableSorter";
import { expect } from "chai";
import * as jquery from "jquery";
import { JSDOM } from "jsdom";
import { createTable, createTableAsc, createTableDescWithDivs, createTableAscWithDivs, TableBuilder } from "../../utils/TableCreator";
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

    it("should given an html table structure sort it in DESCENDING order by string without extra information", () => {
        const options = new SortingOptions(Direction.Descending, 1, false);
        const unsortedTable = createTable();
        const sortedTable = createTableAsc();
        const tableSorter = new TableSorter(sortedTable, options);
        const result = tableSorter.sort();
        expect(result.html()).to.be.equals(unsortedTable.html());
    });
});


describe("HTML Table-Like sorter", () => {
    it("should given an html table structure represented as divs, sort it by string without extra information", () => {
        const options = new SortingOptions(Direction.Ascending, 1, false, ".row", ".col");
        const unsortedTable = createTableDescWithDivs();
        const tableSorter = new TableSorter(unsortedTable, options);
        const sortedTable = createTableAscWithDivs();
        const result = tableSorter.sort();
        expect(result.html()).to.be.equals(sortedTable.html());
    });
});


describe("HTML Table-Like sorter", () => {
    it("should not sort a table with lexicographic string order (11 lexicographically comes before 2)", () => {
        const options = new SortingOptions(Direction.Ascending, 0, false);
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
        const result = tableSorter.sort();

        expect(result.html()).to.be.equals(unsortedTableBuilder.build().html());
    });
});


describe("HTML With data supplied", () => {
    it("should  sort a table parsing the valies to integer", () => {
        const options = new SortingOptions(Direction.Ascending, 0, false);
        const unsortedTableBuilder = new TableBuilder();
        const sortedTableBuilder = new TableBuilder();
        unsortedTableBuilder
            .createRow()
            .addColumn("11", "<td>")
            .appendRow()
            .createRow()
            .addColumn("2", "<td>")
            .appendRow()
            ;

        const dataFlags: { [key: string]: string; } = {};
        dataFlags.type = "number";

            sortedTableBuilder
            .createRow()
            .addColumn("2", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("11", "<td>", dataFlags)
            .appendRow()
            ;

        console.log(unsortedTableBuilder.build().html());
        const tableSorter = new TableSorter(unsortedTableBuilder.build(), options);
        const result = tableSorter.sort();

        expect(result.html()).to.be.equals(sortedTableBuilder.build().html());
    });
});


