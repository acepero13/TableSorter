import { ColumnAttributeRetriever } from "../attributes/ColumnAttributeRetriever";
import { Comparable } from "../comparables/Comparable";
import { ColumnComparableFactory } from "../factories/ColumnComparableFactory";
import { Cell } from "../table/structure/Cell";

export class SortingOptions {
    private readonly comparableFactory: ColumnComparableFactory;
    private columnSelector: string = "";
    private rowSelector: string = "";
    private readonly hasHeader: boolean;
    private headerSelector: string = "";
    private headerRowSelector: string = "";
    private bodySelector: string = "tbody";

    public constructor(hasHeader: boolean,
        rowIdentifier?: string,
        columnIdentifier?: string,
        headerSelector?: string,
        headerRowSelector?: string,
        bodySelector: string = "tbody"
    ) {
        this.hasHeader = hasHeader;
        this.bodySelector = bodySelector;
        this.setRowSelector(rowIdentifier);
        this.setColumnSelector(columnIdentifier);
        this.setHeaderSelector(headerSelector);
        this.comparableFactory = new ColumnComparableFactory();
        this.setHeaderRowSelector(headerRowSelector);

    }

    public tableHasHeader(): boolean {
        return this.hasHeader;
    }

    public getColumnSelector(): string {
        return this.columnSelector;
    }

    public getHeaderRowSelector(): string {
        return this.headerRowSelector;
    }

    public getRowSelector(): string {
        return this.rowSelector;
    }

    public getHeaderSelector(): string {
        return this.headerSelector;
    }

    public getBodySelector(): string {
        return this.bodySelector;
    }

    public parse(value: string, cell: Cell, attributeRetriever: ColumnAttributeRetriever): Comparable<any> {
        return this.comparableFactory.parse(value, cell, attributeRetriever);
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

    private setHeaderSelector(headerSelector?: string): void {
        if (!headerSelector) {
            this.headerSelector = "td";
        } else {
            this.headerSelector = headerSelector;
        }
    }

    private setHeaderRowSelector(headerRowSelector?: string): void {
        if (!headerRowSelector) {
            this.headerRowSelector = "tr";
        } else {
            this.headerRowSelector = headerRowSelector;
        }
    }
}

export enum Direction {
    Ascending = "asc",
    Descending = "desc"
}