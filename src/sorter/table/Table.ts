import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { SortingOptions } from "../options/SortingOptions";
import { Body } from "./structure/Body";
import { Cell } from "./structure/Cell";
import { Header } from "./structure/Header";
import { TableLike } from "./TableLike";

export class Table implements TableLike {

    private readonly attributeRetriever: ColumnAttributeRetriever;
    private readonly options: SortingOptions;
    private readonly table: JQuery<Element>;
    private readonly body: Body;
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.table = table;
        this.options = options;
        this.body = new Body(table, options);
        this.attributeRetriever = new ColumnAttributeRetriever(this, options.tableHasHeader(), new Header(table, options));
    }

    public getRows(): JQuery<Element> {
        return this.table.find(this.options.getRowSelector());
    }

    public getColumnByIndexFrom(row: JQuery<Element>, colIndex: number): JQuery<Element> {
        return row.find(this.options.getColumnSelector()).eq(colIndex);
    }

    public getTotalRows(): number {
        return this.getRows().length;
    }

    public getRow(index: number): JQuery<Element> {
        return this.getRows().eq(index);
    }

    public getCell(cell: Cell): JQuery<Element> {
        const row = this.getRow(cell.rowIndex);
        const column = this.getColumnByIndexFrom(row, cell.columnIndex);
        if (row.length <= 0 || column.length <= 0) {
            throw new Error("Index out of bounds");
        }
        return column;
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

    public html(): string {
        return this.table.html();
    }

    public clone(): Table {
        return new Table(this.table.clone(false), this.options);
    }

    public replace(): void {
        this.table.html();
    }

}