import { SortingOptions } from "../options/SortingOptions";
import { Bubblesort } from "../algorithms/Bubblesort";
import { Table } from "./Table";

export class TableSorter {
    private readonly table: Table;
    private readonly sortAlgorithm: Bubblesort;
    public constructor(table: JQuery<Element>, options: SortingOptions) {

        this.table = new Table(table, options);
        this.sortAlgorithm = new Bubblesort(this.table);
    }

    public sort(): any {
        this.sortAlgorithm.sort();
        return this.table;
    }


}