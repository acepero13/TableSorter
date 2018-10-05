import { SortingOptions } from "../../options/SortingOptions";

export class Header {
    private options: SortingOptions;
    private header: any = "";
    public constructor(options: SortingOptions) {
        this.options = options;
    }

    public getIndex(): number {
        return 1;
    }
}