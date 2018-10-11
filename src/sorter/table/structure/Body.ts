import { SortingOptions } from "../../options/SortingOptions";

export class Body {
    private readonly body: any = "";
    private readonly options: SortingOptions;
    private readonly table: JQuery<Element>;
    private initialBodyRowIndex: number;

    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.options = options;
        this.body = table.find(this.options.getBodySelector());
        this.table = table;
        this.initialBodyRowIndex = -1;
    }
    public replace(body: string): void {
        return this.body.html(body);
    }

    public getFirstItemIndex(): number {
        return this.options.tableHasHeader() ? this.getFirstSortableRowIndex() : 0;
    }

    private getFirstSortableRowIndex(): number {
        if (this.initialBodyRowIndex > 0) {
            return this.initialBodyRowIndex;
        }
        if (this.body.length > 0) {
            const totalRows = this.table.find(this.options.getRowSelector()).length;
            const totalRowsInsideBody = this.body.find(this.options.getRowSelector()).length;
            return this.initialBodyRowIndex = totalRows - totalRowsInsideBody;
        }
        return this.initialBodyRowIndex = this.table.find(this.options.getHeaderRowSelector()).index() + 1;
    }
}