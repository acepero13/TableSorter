import { Comparable } from "../comparables/Comparable";
import { Cell } from "../table/Cell";
import { Table } from "../table/Table";
import { TableLike } from "../table/TableLike";
import { Collection } from "./Collection";

export class TableCollection implements Collection<Comparable<any>> {

    private table: TableLike;
    private columnIndex: number;
    private tableArray: Sort[];

    public constructor(table: TableLike, columnIndex: number) {
        this.table = table;
        this.columnIndex = columnIndex;
        this.tableArray = [];
        this.prepareTable();
    }
    public get(index: number): Comparable<any> {
        return this.tableArray[index].value;
    }
    public size(): number {
        return this.tableArray.length;
    }
    public swap(src: number, dst: number): void {
        const tmpSrcValue = this.tableArray[src].value;
        const tmpSrcId = this.tableArray[src].id;
        this.tableArray[src].value = this.tableArray[dst].value;
        this.tableArray[src].id = this.tableArray[dst].id;
        this.tableArray[dst].value = tmpSrcValue;
        this.tableArray[dst].id = tmpSrcId;
    }
    public getRaw(): any {
        console.time('clone');
        const clonedTable = this.table.clone();
        console.timeEnd('clone')
        console.time('raw');
        let html = "";
        this.tableArray.forEach(row => {
            const dst = row.order;
            html = "<tr>" + this.table.getRow(dst).html() + "</tr>";
        });
        console.timeEnd('raw')
        return html;
        //return this.table.html();
    }

    public getFirstRowIndex(): number {
        return this.table.getFirstRowIndex();
    }

    private cell(row: number): Cell {
        return { rowIndex: row, columnIndex: this.columnIndex };
    }

    private prepareTable(): any {
        //TODO: get first item
        //TODO: Check validity of array index
        const size = this.table.getTotalRows();
        console.time('prepare')
        for (let counter = 0; counter < size; counter++) {
            this.tableArray.push({ value: this.table.getCellValue(this.cell(counter)), order: counter, id: counter });
        }
        console.timeEnd('prepare');
    }

}

interface Sort {
    value: Comparable<any>;
    order: number;
    id: number;

}