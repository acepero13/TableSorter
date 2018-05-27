import { SortingOptions, Direction } from "../options/SortingOptions";
import { Bubblesort } from "../algorithms/Bubblesort";
import { Table } from "./Table";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";

export class TableSorter {

    private readonly table: Table;
    private readonly sortingAlgorithm: Bubblesort;
    public constructor(table: JQuery<Element>, options: SortingOptions) {

        this.table = new Table(table, options);
        this.sortingAlgorithm = new Bubblesort(this.table, this.createComparator(options));
    }

    public sort(): Table {
        this.sortingAlgorithm.sort();
        return this.table;
    }

    private createComparator(options: SortingOptions): Comparator<any> {
        if (options.getSortingDirection() === Direction.Ascending) {
            return new GreaterThanComparator();
        }
        return new SmallerThanComparator();
    }


}