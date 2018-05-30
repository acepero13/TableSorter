import { Comparator } from "../comparables/comparators/Comparator";
import { Direction, SortingOptions } from "../options/SortingOptions";
import { Table } from "../table/Table";
import { TableSorter } from "../table/TableSorter";

export class Bubblesort {
    private columnToSort: number = 0;
    private readonly table: Table;
    public constructor(table: Table) {
        this.table = table;
    }

    public sort(direction: Direction, columnIndexToSort: number): any {
        const comparator = TableSorter.createComparator(direction);
        this.columnToSort = columnIndexToSort;
        let switching = true;
        while (switching) {
            switching = this.switchRows(comparator);
        }
        return this.table;
    }

    private switchRows(comparator: Comparator<any>): boolean {
        let shouldSwitch = false;
        const switchRows = this.shouldSwitchRows(comparator);
        if (switchRows >= 0) {
            this.switchWithNextRow(switchRows);
            shouldSwitch = true;
        }
        return shouldSwitch;
    }

    private switchWithNextRow(row: number) {
        const node = this.table.getRow(row);
        if (node.parent() !== null) {
            this.table.getRow(row + 1).insertBefore(this.table.getRow(row)[0]);
        }
    }

    private shouldSwitchRows(comparator: Comparator<any>): number {
        let shouldSwitch = false;
        let i: number;
        for (i = this.table.getFirstRowIndex(); i < this.table.getTotalRows() - 1; i++) {
            if (comparator.compare(this.table.getCellValue({ columnIndex: this.columnToSort, rowIndex: i }),
                this.table.getCellValue({ columnIndex: this.columnToSort, rowIndex: i + 1 }))) {
                shouldSwitch = true;
                return i;
            }
        }
        return -1;
    }
}