export class SortingOptions {
    private columnSelector  = "";
    private rowSelector = "" ;
    private readonly hasHeader: boolean;
    private readonly columnToSort: number;
    private readonly direction: Direction;
    public constructor(direction: Direction
        , columnToSort: number
        , hasHeader: boolean
        , rowIdentifier?: string
        , columnIdentifier?: string) {
        this.direction = direction;
        this.columnToSort = columnToSort;
        this.hasHeader = hasHeader;
        this.setRowSelector(rowIdentifier);
        this.setColumnSelector(columnIdentifier);
    }

    public getSortingDirection(): Direction {
        return this.direction;
    }

    public getColumnToSort(): number {
        return this.columnToSort;
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
}


export enum Direction {
    Ascending = "asc",
    Descending = "desc"
}