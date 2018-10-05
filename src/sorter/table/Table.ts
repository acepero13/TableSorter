import { AbstractTable } from "./AbstractTable";
import { Cell } from "./structure/Cell";

export class Table extends AbstractTable {

    private getRows(): JQuery<Element> {
        return this.getTable().find(this.getOptions().getRowSelector());
    }

    public getColumnByIndexFrom(row: JQuery<Element>, colIndex: number): JQuery<Element> {
        return row.find(this.getOptions().getColumnSelector()).eq(colIndex);
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

    public replace(): void {
        this.getTable().html();
    }

}