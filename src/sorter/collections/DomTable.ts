import { Comparable } from "../comparables/Comparable";
import { Cell } from "../table/structure/Cell";
import { Table } from "../table/Table";
import { TableLike } from "../table/TableLike";
import { Collection } from "./Collection";

export class DomTable implements Collection<Comparable<any>> {

    private table: TableLike;
    private columnIndex: number;

    public constructor(table: TableLike, columnIndex: number) {
        this.table = table;
        this.columnIndex = columnIndex;
    }
    public get(index: number): Comparable<any> {
        return this.table.getCellValue(this.cell(index));
    }
    public size(): number {
        return this.table.getTotalRows();
    }
    public swap(src: number, dst: number): void {
        const node = this.table.getRow(src);
        this.table.getRow(dst).insertBefore(this.table.getRow(src)[0]);
    }
    public getRaw(): any {
        return this.table.html();
    }

    public getFirstRowIndex(): number {
        return this.table.getFirstRowIndex();
    }

    private cell(row: number): Cell {
        return { rowIndex: row, columnIndex: this.columnIndex };
    }

}