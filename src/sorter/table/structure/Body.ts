import { SortingOptions } from "../../options/SortingOptions";

export class Body {
    private body: any = "";
    private options: SortingOptions;
    private table: JQuery<Element>;

    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.options = options;
        this.body = "";
        this.table = table;
    }
    public replace(body: string): void {
        this.body.html(body);
    }

    public getFirstItemIndex(): number {

        return this.options.tableHasHeader() ? this.getHeaderIndex() + 1 : 0;
    }

    private getHeaderIndex(): number {
        return this.table.find(this.options.getHeaderRowSelector()).index();
    }
}