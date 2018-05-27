import { SortingOptions } from "../options/SortingOptions";
import { Table } from "../table/Table";
import { Comparator } from "../comparables/comparators/Comparator";

export class Bubblesort {
    private comparator: Comparator<any>;
    private table: Table;
    public constructor(table: Table, comparator: Comparator<any>) {
        this.table = table;
        this.comparator = comparator;
    }

    public sort(): any {
        let switching = true;
        while (switching) {
            switching = this.switchRows();
        }
        return this.table;
    }

    private switchRows(): boolean {
        let shouldSwitch = false;
        const switchRows = this.shouldSwitchRows();
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

    private shouldSwitchRows(): number {
        let shouldSwitch = false, i;
        for (i = this.table.getFirstRowIndex(); i < this.table.getTotalRows() - 1; i++) {
            if (this.comparator.compare(this.table.getSortingValueForRow(i), this.table.getSortingValueForRow(i + 1))) {
                shouldSwitch = true;
                return i;
            }
        }
        return -1;
    }
}