import { SortingOptions } from "../options/SortingOptions";
import { Table } from "../table/Table";

export class Bubblesort {
    private table: Table;
    public constructor(table: Table) {
        this.table = table;
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
        for (i = 0; i < this.table.getTotalRows() - 1; i++) {
            const currentRow = this.table.getColumnFromRow(1, i);
            const nextRow = this.table.getColumnFromRow(1, i + 1);
            if (currentRow.html().toLowerCase() > nextRow.html().toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        return shouldSwitch ? i : -1;
    }
}