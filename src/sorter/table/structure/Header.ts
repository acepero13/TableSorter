import { SortingOptions } from "../../options/SortingOptions";

export class Header {

    private readonly options: SortingOptions;
    private readonly header: DOMStringMap[] = [];
    private readonly table: JQuery<Element>;
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.options = options;
        this.table = table;
        this.cacheHeader();
    }

    public getAttribute(columnIndex: number, attribute: string): string | undefined {
        const dataset = this.header[columnIndex];
        if (dataset && dataset[attribute]) {
            return dataset[attribute];
        }
        return "";
    }

    private cacheHeader(): void {
        if (this.options.tableHasHeader()) {
            this.getHeaderFromTable();
        }
    }
    private getHeaderFromTable(): void {
        const header = this.table.find(this.options.getHeaderRowSelector()).first();
        header.children().each((index: number, element: Element) => {
            this.header.push((element as HTMLElement).dataset);
        });
    }

}