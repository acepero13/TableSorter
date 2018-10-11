import { JSDOM } from "jsdom";
import { SortingOptions } from "../options/SortingOptions";
import { AbstractTable } from "./AbstractTable";
import { Cell } from "./structure/Cell";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
const $ = require("jquery")(window) as JQueryStatic;

export class TableStructure extends AbstractTable {

    private readonly tableStructure: JQuery<Element>[][];
    private readonly rows: JQuery<Element>[];
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        super(table, options);
        this.tableStructure = [];
        this.rows = [];
        this.prepareTableStructure();
    }

    private prepareTableStructure(): any {
        this.getTable().find(this.getOptions().getRowSelector()).each((rowIndex: number, row: Element) => {
            this.tableStructure[rowIndex] = [];
            this.rows.push($(row));
            $(row).children(this.getOptions().getColumnSelector()).each((colIndex: number, column: Element) => {
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

    public replace(): void {
        this.getTable().html();
    }

}