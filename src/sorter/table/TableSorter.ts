import { Bubblesort } from "../algorithms/Bubblesort";
import { QuickSort } from "../algorithms/Quicksort";
import { DomTable } from "../collections/DomTable";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";
import { Direction, SortingOptions } from "../options/SortingOptions";
import { Table } from "./Table";

export class TableSorter {

    private readonly table: Table;
    public constructor(table: JQuery<Element>, options: SortingOptions) {
        this.table = new Table(table, options);
    }

    public sort(direction: Direction, columnIndexToSort: number): Table {
        const sortingAlgorithm = new Bubblesort(new DomTable(this.table, columnIndexToSort));
        sortingAlgorithm.sort(direction);
        return this.table;
    }

    private createAlgorithm(name: string, columnIndexToSort: number) {
        return name === "quick"
            ? new QuickSort(new DomTable(this.table, columnIndexToSort))
            : new Bubblesort(new DomTable(this.table, columnIndexToSort));
    }

}