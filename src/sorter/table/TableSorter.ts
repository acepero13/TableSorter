import { Bubblesort } from "../algorithms/Bubblesort";
import { QuickSort } from "../algorithms/Quicksort";
import { Sortable } from "../algorithms/Sortable";
import { DomTable } from "../collections/DomTable";
import { Direction, SortingOptions } from "../options/SortingOptions";
import { Table } from "./Table";
import { TableLike } from "./TableLike";
import { TableStructure } from "./TableStructure";

export class TableSorter {

    private readonly table: TableLike;
    private algorithm: string;

    public constructor(table: JQuery<Element>, options: SortingOptions, tableType: string = "table", algorithm: string = "bubble") {

        this.table = this.createTable(tableType, table, options);
        this.algorithm = algorithm;
    }

    public sort(direction: Direction, columnIndexToSort: number): TableLike {
        const sortingAlgorithm = this.createAlgorithm(columnIndexToSort);
        sortingAlgorithm.sort(direction);
        return this.table;
    }

    private createAlgorithm(columnIndexToSort: number): Sortable {
        return this.algorithm === "quick"
            ? new QuickSort(new DomTable(this.table, columnIndexToSort))
            : new Bubblesort(new DomTable(this.table, columnIndexToSort));
    }

    private createTable(tableType: string, table: JQuery<Element>, options: SortingOptions): TableLike {
        if (tableType === "cached") {
            return new TableStructure(table, options);
        }
        return new Table(table, options);
    }
}