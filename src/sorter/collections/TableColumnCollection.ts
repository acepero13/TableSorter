import { Comparable } from "../comparables/Comparable";
import { Cell } from "../table/structure/Cell";
import { TableLike } from "../table/TableLike";
import { Collection } from "./Collection";

export class TableColumnCollection implements Collection<Comparable<any>> {

    private readonly table: TableLike;
    private readonly columnIndex: number;
    private readonly tableArray: Sort[];

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
        const html: any[] = [];
        this.tableArray.forEach(row => {
            const dst = row.id;
            html.push(this.table.getRow(dst)[0].outerHTML);
        });
        return html.join("");
    }

    public getFirstRowIndex(): number {
        return this.table.getFirstRowIndex();
    }

    private cell(row: number): Cell {
        return { rowIndex: row, columnIndex: this.columnIndex };
    }

    private prepareTable(): any {
        //TODO: Check validity of array index
        const size = this.table.getTotalRows();
        for (let counter = this.table.getFirstRowIndex(); counter < size; counter++) {
            this.tableArray.push({ value: this.table.getCellValue(this.cell(counter)), order: counter, id: counter });
        }
    }

}

interface Sort {
    value: Comparable<any>;
    order: number;
    id: number;

}