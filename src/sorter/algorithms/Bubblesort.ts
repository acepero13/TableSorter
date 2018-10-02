import { Comparator } from "../comparables/comparators/Comparator";
import { Direction } from "../options/SortingOptions";
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

    private switchWithNextRow(row: number): void {
        const node = this.table.getRow(row);
        this.table.getRow(row + 1).insertBefore(this.table.getRow(row)[0]);
    }

    private shouldSwitchRows(comparator: Comparator<any>): number {
        let rowIndex = this.table.getFirstRowIndex();
        let switchRows = false;
        while (this.alreadySorted(rowIndex, switchRows)) {
            switchRows = this.shouldSwitch(comparator, rowIndex);
            rowIndex++;
        }
        return (switchRows) ? rowIndex - 1 : -1;
    }

    private alreadySorted(rowIndex: number, switchRows: boolean): boolean {
        return rowIndex < this.table.getTotalRows() - 1 && !switchRows;
    }

    private shouldSwitch(comparator: Comparator<any>, rowIndex: number): boolean {
        const currentRow = this.table.getCellValue({ columnIndex: this.columnToSort, rowIndex: rowIndex });
        const nextRow = this.table.getCellValue({ columnIndex: this.columnToSort, rowIndex: rowIndex + 1 });
        return comparator.compare(currentRow, nextRow);
    }
}