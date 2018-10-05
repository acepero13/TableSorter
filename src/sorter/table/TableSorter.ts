import { Bubblesort } from "../algorithms/Bubblesort";
import { QuickSort } from "../algorithms/Quicksort";
import { Sortable } from "../algorithms/Sortable";
import { DomTable } from "../collections/DomTable";
import { TableCollection } from "../collections/TableCollection";
import { Direction, SortingOptions } from "../options/SortingOptions";
import { Table } from "./Table";
import { TableLike } from "./TableLike";
import { TableStructure } from "./TableStructure";

export class TableSorter {

    public static readonly QUICK_SORT: string = "quick";
    public static readonly BUBBLE_SORT: string = "bubble";
    public static readonly TABLE_TYPE_DOM: string = "table";
    public static readonly TABLE_TYPE_CACHED: string = "cached";

    private readonly table: TableLike;
    private readonly algorithm: string;

    public constructor(table: JQuery<Element>, options: SortingOptions,
        tableType: string = TableSorter.TABLE_TYPE_DOM,
        algorithm: string = TableSorter.BUBBLE_SORT) {

        this.table = TableSorter.createTable(tableType, table, options);
        this.algorithm = algorithm;
    }

    public sort(direction: Direction, columnIndexToSort: number): TableLike {
        const sortingAlgorithm = this.createAlgorithm(columnIndexToSort);
        const sorted = sortingAlgorithm.sort(direction);
        this.table.replace(sorted);
        return this.table;
    }

    private createAlgorithm(columnIndexToSort: number): Sortable {
        return this.algorithm === TableSorter.QUICK_SORT
            ? new QuickSort(new TableCollection(this.table, columnIndexToSort))
            : new Bubblesort(new DomTable(this.table, columnIndexToSort));
    }

    private static createTable(tableType: string, table: JQuery<Element>, options: SortingOptions): TableLike {
        if (tableType === TableSorter.TABLE_TYPE_CACHED) {
            return new TableStructure(table, options);
        }
        return new Table(table, options);
    }
}