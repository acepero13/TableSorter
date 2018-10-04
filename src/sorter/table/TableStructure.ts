import { JSDOM } from "jsdom";
import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { NumberComparable } from "../comparables/Number";
import { SortingOptions } from "../options/SortingOptions";
import { Cell } from "./Cell";
import { TableLike } from "./TableLike";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
// tslint:disable-next-line:no-require-imports
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-require-imports
const $ = require("jquery")(window) as JQueryStatic;

export class TableStructure implements TableLike {

    private readonly attributeRetriever: ColumnAttributeRetriever;
    private readonly options: SortingOptions;
    private readonly table: JQuery<Element>;
    private tableStructure: JQuery<Element>[][];
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.table = table;
        this.options = options;
        this.tableStructure = [];
        this.prepareTableStructure();
        this.attributeRetriever = new ColumnAttributeRetriever(this, options.tableHasHeader());
    }

    private prepareTableStructure(): any {
        this.table.find(this.options.getRowSelector()).each((rowIndex: number, row: Element) => {
            const jRow = $(row);
            this.tableStructure[rowIndex] = [];
            jRow.children(this.options.getColumnSelector()).each((colIndex: number, column: Element) => {
                const jCol = $(column);
                this.tableStructure[rowIndex][colIndex] = jCol;
            });
        });
    }

    public getTotalRows(): number {
        return this.tableStructure.length;
    }

    public getCell(cell: Cell): JQuery<Element> {
        if (this.tableStructure.length <= cell.rowIndex || this.tableStructure[cell.rowIndex].length <= cell.columnIndex) {
            throw new Error("Index out of bounds");
        }
        return this.tableStructure[cell.rowIndex][cell.columnIndex];
    }

    public getRow(rowIndex: number): JQuery<Element> {
        // let a = $("<" + this.options.getRowSelector() + "/>");
        return this.table.find(this.options.getRowSelector()).eq(rowIndex);
    }

    public getFirstRowIndex(): number {
        return this.options.tableHasHeader() ? 1 : 0;
    }

    public getCellValue(cell: Cell): Comparable<any> {
        const column = this.getCell(cell);
        const value = column.html();
        return this.options.parse(value, cell, this.attributeRetriever);
    }

    public getCellAttribute(cell: Cell, attribute: string): string {
        return this.attributeRetriever.getAttributeFrom(cell, attribute);
    }

    public html() {
        return this.table.html();
    }

    public clone(): TableStructure {
        return new TableStructure(this.table.clone(false), this.options);
    }

}