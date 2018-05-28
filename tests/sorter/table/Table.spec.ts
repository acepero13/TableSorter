import { TableSorter } from "../../../src/sorter/table/TableSorter";
import { expect } from "chai";
import * as jquery from "jquery";
import { JSDOM } from "jsdom";
import { createTable, createTableAsc } from "../../utils/TableCreator";
import { Table } from "../../../src/sorter/table/Table";
import { SortingOptions, Direction } from "../../../src/sorter/options/SortingOptions";


describe("Table", () => {
    it("when asked for total rows shoulld return five", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(table.getTotalRows()).to.be.equals(5);
    });

    it("when asked for total rows and wrong row selector provided should return zero", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false, ".hello");
        const table = new Table(unsortedTable, options);
        expect(table.getTotalRows()).to.be.equals(0);
    });

    it("should return a row", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(table.getRow(0).length).to.be.equals(1);
    });

    it("should return none when index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(table.getRow(10).length).to.be.equals(0);
    });

    it("should return first column whn calling getColumnByIndexFrom", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        const firstRow = table.getRow(0);
        expect(table.getColumnByIndexFrom(firstRow, 1).html()).to.be.equals("5");
    });

    it("should raise error whn calling getColumnByIndexFrom", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(table.getColumnFromRow(1, 0).html()).to.be.equals("5");
    });

    it("should raise error when calling getColumnByIndexFrom with index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(() => table.getColumnFromRow(10, 0)).to.throw("Index out of bounds");
    });

    it("should return none when calling getColumnByIndexFrom with index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions( false);
        const table = new Table(unsortedTable, options);
        expect(() => table.getColumnFromRow(1, 10)).to.throw("Index out of bounds");
    });
});
