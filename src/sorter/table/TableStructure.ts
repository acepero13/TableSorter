import { JSDOM } from "jsdom";
import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { NumberComparable } from "../comparables/Number";
import { SortingOptions } from "../options/SortingOptions";
import { Cell } from "./structure/Cell";
import { TableLike } from "./TableLike";
import { Body } from "./structure/Body";
import { Header } from "./structure/Header";

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
    private rows: JQuery<Element>[];
    private readonly body: Body;
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.table = table;
        this.options = options;
        this.tableStructure = [];
        this.rows = [];
        this.body = new Body(table, options);
        this.prepareTableStructure();
        this.attributeRetriever = new ColumnAttributeRetriever(this, options.tableHasHeader(), new Header(table, options));
    }

    private prepareTableStructure(): any {
        this.table.find(this.options.getRowSelector()).each((rowIndex: number, row: Element) => {
            this.tableStructure[rowIndex] = [];
            this.rows.push($(row));
            $(row).children(this.options.getColumnSelector()).each((colIndex: number, column: Element) => {
                this.tableStructure[rowIndex][colIndex] = $(column);
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
        return this.rows[rowIndex];
    }

    public getFirstRowIndex(): number {
        return this.body.getFirstItemIndex();
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