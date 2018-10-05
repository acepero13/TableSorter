import { SortingOptions } from "../../options/SortingOptions";

export class Body {
    private body: any = "";
    private options: SortingOptions;
    private table: JQuery<Element>;

    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.options = options;
        this.body = table.find(this.options.getBodySelector());
        this.table = table;
    }
    public replace(body: string): void {
        return this.body.html(body);
    }

    public getFirstItemIndex(): number {
        return this.options.tableHasHeader() ? this.getFirstSortableRowIndex() : 0;
    }

    private getFirstSortableRowIndex(): number {
        if (this.body.length > 0) {
            const totalRows = this.table.find(this.options.getRowSelector()).length;
            const totalRowsInsideBody = this.body.find(this.options.getRowSelector()).length;
            return totalRows - totalRowsInsideBody;
        }
        return this.table.find(this.options.getHeaderRowSelector()).index() + 1;
    }
}