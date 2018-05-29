import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { ColumnComparableFactory } from "../factories/ColumnComparableFactory";

export class SortingOptions {
    private readonly comparableFactory: ColumnComparableFactory;
    private columnSelector: string = "";
    private rowSelector: string = "";
    private readonly hasHeader: boolean;
    public constructor(hasHeader: boolean, rowIdentifier?: string, columnIdentifier?: string) {
        this.hasHeader = hasHeader;
        this.setRowSelector(rowIdentifier);
        this.setColumnSelector(columnIdentifier);
        this.comparableFactory = new ColumnComparableFactory();
    }

    public tableHasHeader(): boolean {
        return this.hasHeader;
    }

    public getColumnSelector(): string {
        return this.columnSelector;
    }

    public getRowSelector(): string {
        return this.rowSelector;
    }

    private setColumnSelector(columnSelector?: string): void {
        if (!columnSelector) {
            this.columnSelector = "td";
        } else {
            this.columnSelector = columnSelector;
        }
    }
    private setRowSelector(rowSelector?: string): void {
        if (!rowSelector) {
            this.rowSelector = "tr";
        } else {
            this.rowSelector = rowSelector;
        }
    }

    public parse(value: string, colIndex: number, rowIndex: number, attributeRetriever: ColumnAttributeRetriever): Comparable<any> {
        return this.comparableFactory.parse(value, colIndex, rowIndex, attributeRetriever);
    }
}

export enum Direction {
    Ascending = "asc",
    Descending = "desc"
}