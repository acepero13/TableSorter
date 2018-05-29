// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import * as jquery from "jquery";
// tslint:disable-next-line:no-implicit-dependencies
import { JSDOM } from "jsdom";
import { Direction, SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { Table } from "../../../src/sorter/table/Table";
import { TableSorter } from "../../../src/sorter/table/TableSorter";
import { createTable, createTableAsc, TableBuilder } from "../../utils/TableCreator";

describe("Table", () => {
    it("when asked for total rows shoulld return five", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(table.getTotalRows()).to.be.equals(5);
    });

    it("when asked for total rows and wrong row selector provided should return zero", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false, ".hello");
        const table = new Table(unsortedTable, options);
        expect(table.getTotalRows()).to.be.equals(0);
    });

    it("should return a row", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(table.getRow(0).length).to.be.equals(1);
    });

    it("should return none when index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(table.getRow(10).length).to.be.equals(0);
    });

    it("should return first column whn calling getColumnByIndexFrom", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        const firstRow = table.getRow(0);
        expect(table.getColumnByIndexFrom(firstRow, 1).html()).to.be.equals("5");
    });

    it("should raise error whn calling getColumnByIndexFrom", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(table.getColumnFromRow(1, 0).html()).to.be.equals("5");
    });

    it("should raise error when calling getColumnByIndexFrom with index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(() => table.getColumnFromRow(10, 0)).to.throw("Index out of bounds");
    });

    it("should return none when calling getColumnByIndexFrom with index out of bound", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        expect(() => table.getColumnFromRow(1, 10)).to.throw("Index out of bounds");
    });
});

describe("Get Data Attributes", () => {
    it("should return attribute type from column and no attributes on header", () => {

        const options = new SortingOptions(false);
        const unsortedTableBuilder = new TableBuilder();

        const dataFlags: { [key: string]: string; } = {};
        dataFlags.type = "date";
        dataFlags.format = "YYY-MM-DD";

        unsortedTableBuilder
            .createRow()
            .addColumn("11", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("2", "<td>")
            .appendRow()
            ;

        const table = new Table(unsortedTableBuilder.build(), options);
        expect(table.getAttributeForColumnInRow(0, 0, "type")).to.be.equals("date");
        expect(table.getAttributeForColumnInRow(0, 0, "format")).to.be.equals(dataFlags.format);
    });

    it("should return none when calling asking for non-existing attribute", () => {
        const unsortedTable = createTable();
        const options = new SortingOptions(false);
        const table = new Table(unsortedTable, options);
        // tslint:disable-next-line:no-unused-expression
        expect(table.getAttributeForColumnInRow(0, 0, "format")).to.be.empty;
    });

    it("should return attribute type defined in header column but not in regular column", () => {

        const options = new SortingOptions(true);
        const unsortedTableBuilder = new TableBuilder();

        const dataFlags: { [key: string]: string; } = {};
        dataFlags.type = "date";
        dataFlags.format = "YYY-MM-DD";
        unsortedTableBuilder
            .createRow()
            .addColumn("header", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("11", "<td>", dataFlags)
            .appendRow()
            .createRow()
            .addColumn("2", "<td>")
            .appendRow()
            ;

        const table = new Table(unsortedTableBuilder.build(), options);
        expect(table.getAttributeForColumnInRow(0, 2, "type")).to.be.equals("date");
        expect(table.getAttributeForColumnInRow(0, 2, "format")).to.be.equals(dataFlags.format);
    });

});
