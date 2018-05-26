import { SortingOptions, Direction } from "../options/SortingOptions";
import { Bubblesort } from "../algorithms/Bubblesort";
import { Table } from "./Table";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";

export class TableSorter {

    private readonly table: Table;
    private readonly sortAlgorithm: Bubblesort;
    public constructor(table: JQuery<Element>, options: SortingOptions) {

        this.table = new Table(table, options);
        this.sortAlgorithm = new Bubblesort(this.table, this.createComparator(options));
    }

    public sort(): any {
        this.sortAlgorithm.sort();
        return this.table;
    }

    private createComparator(options: SortingOptions): Comparator<any> {
        if (options.getSortingDirection() === Direction.Ascending) {
            return new GreaterThanComparator();
        }
        return new SmallerThanComparator();
    }


}