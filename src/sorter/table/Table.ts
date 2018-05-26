import { SortingOptions } from "../options/SortingOptions";

export class Table {

    private readonly rows: JQuery<Element>;
    private readonly options: SortingOptions;
    private readonly table: JQuery<Element>;
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.table = table;
        this.options = options;
        this.rows = this.getRows();
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

    public getColumnFromRow(columnIndex: number, rowIndex: number): JQuery<Element> {
        const row = this.getRow(rowIndex);
        const column = this.getColumnByIndexFrom(row, columnIndex);
        if (row.length <= 0 || column.length <= 0) {
            throw new Error("Index out of bounds");
        }
        return column;
    }

    public html() {
        return this.table.html();
    }

}