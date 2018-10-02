import { Cell } from "../table/Cell";
import { Table } from "../table/Table";
import { Collection } from "./Collection";

export class DomTable implements Collection<Cell> {
    private table: Table;
    private columnIndex: number;

    public constructor(table: Table, columnIndex: number) {
        this.table = table;
        this.columnIndex = columnIndex;
    }
    public get(index: number): Cell {
        throw new Error("Method not implemented.");
    }
    public size(): number {
        throw new Error("Method not implemented.");
    }
    public swap(src: number, dst: number): void {
        throw new Error("Method not implemented.");
    }
    public getRaw(): Cell[] {
        throw new Error("Method not implemented.");
    }
}