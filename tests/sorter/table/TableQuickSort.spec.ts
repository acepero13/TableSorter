// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { QuickSort } from "../../../src/sorter/algorithms/Quicksort";
import { DomTable } from "../../../src/sorter/collections/DomTable";
import { TableCollection } from "../../../src/sorter/collections/TableCollection";
import { Direction, SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { Table } from "../../../src/sorter/table/Table";
import { createTable, createTableAsc, createTableAscWithDivs, createTableDescWithDivs, TableBuilder } from "../../utils/TableCreator";

describe("Quick sort Table", () => {
    it("should given an html table structure sort it in DESCENDING order by string without extra information", () => {
        const options = new SortingOptions(false);
        const unsortedTable = createTable();
        const sortedTable = createTableAsc();
        const table = new Table(unsortedTable, options);
        const tableSorter = new QuickSort(new DomTable(table, 1));
        const result = tableSorter.sort(Direction.Ascending);
        expect(result.getRaw()).to.be.equals(sortedTable.html());
    });
});

describe("HTML Table-Like sorter", () => {
    it("should given an html table structure represented as divs, sort it by string without extra information. ", () => {
        const options = new SortingOptions(false, ".row", ".col");
        const unsortedTable = createTableDescWithDivs();
        const table = new Table(unsortedTable, options);
        const tableSorter = new QuickSort(new DomTable(table, 1));
        const sortedTable = createTableAscWithDivs();
        const result = tableSorter.sort(Direction.Ascending);
        expect(result.getRaw()).to.be.equals(sortedTable.html());
    });

    it("should given an html table structure sort it in DESCENDING order by string without extra information", () => {
        const options = new SortingOptions(false);
        const unsortedTable = createTable();
        const sortedTable = createTableAsc();
        const table = new Table(sortedTable, options);
        const tableSorter = new QuickSort(new DomTable(table, 1));
        const result = tableSorter.sort(Direction.Descending);
        expect(result.getRaw()).to.be.equals(unsortedTable.html());
    });
});

describe("HTML Table-Like optimized sorter With 1000 entries. Algorithms comparison", () => {
    it("FASTER! should given an html table structure represented as divs, sort it by string without extra information", () => {
        const options = new SortingOptions(false);

        const unsortedTable = "";
        const unsortedTableBuilder = new TableBuilder();
        const sortedTableBuilder = new TableBuilder();
        const dataFlags: { [key: string]: string; } = {};
        const max = 500;
        dataFlags.type = "number";
        for (let i = max; i > 0; i--) {
            unsortedTableBuilder
                .createRow()
                .addColumn("cell" + i.toString(), "<td>", dataFlags)
                .addColumn(i.toString() + "", "<td>", dataFlags)
                .appendRow()
                ;
        }

        for (let i = 1; i <= max; i++) {
            sortedTableBuilder
                .createRow()
                .addColumn("cell" + i.toString(), "<td>", dataFlags)
                .addColumn(i.toString() + "", "<td>", dataFlags)
                .appendRow()

                ;
        }
        const table = new Table(unsortedTableBuilder.build(), options);
        const tableSorter = new QuickSort(new TableCollection(table, 1));
        const result = tableSorter.sort(Direction.Ascending);
        expect(result.getRaw()).to.be.equals(sortedTableBuilder.build().html());
    });

});