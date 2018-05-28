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
        this.sortingAlgorithm = new Bubblesort(this.table);
    }

    public sort(direction: Direction, columnIndexToSort: number): Table {
        this.sortingAlgorithm.sort(direction, columnIndexToSort);
        return this.table;
    }

    public static createComparator(direction: Direction): Comparator<any> {
        if (direction === Direction.Ascending) {
            return new GreaterThanComparator();
        }
        return new SmallerThanComparator();
    }


}