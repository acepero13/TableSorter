import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { SortingOptions } from "../options/SortingOptions";
import { Body } from "./structure/Body";
import { Cell } from "./structure/Cell";
import { Header } from "./structure/Header";
import { TableLike } from "./TableLike";

export abstract class AbstractTable implements TableLike {
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

    public getCellValue(cell: Cell): Comparable<any> {
        const column = this.getCell(cell);
        const value = column.html();
        return this.options.parse(value, cell, this.attributeRetriever);
    }

    public abstract getTotalRows(): number;
    public abstract getCell(cell: Cell): JQuery<Element>;

    public abstract getRow(rowIndex: number): JQuery<Element>;

    public abstract replace(sorted: string): void;

    public getFirstRowIndex(): number {
        return this.body.getFirstItemIndex();
    }

    public getCellAttribute(cell: Cell, attribute: string): string {
        return this.attributeRetriever.getAttributeFrom(cell, attribute);
    }

    public html(): string {
        return this.table.html();
    }

    protected getTable(): JQuery<Element> {
        return this.table;
    }

    protected getOptions(): SortingOptions {
        return this.options;
    }
}