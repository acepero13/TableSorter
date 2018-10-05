import { Collection } from "../collections/Collection";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";
import { Direction } from "../options/SortingOptions";
import { Sortable } from "./Sortable";

export class Bubblesort implements Sortable {
    private toSort: Collection<any>;
    private comparator!: Comparator<any>;

    public constructor(unsorted: Collection<any>) {
        this.toSort = unsorted;
    }

    public sort(direction: Direction): any {
        this.comparator = this.createComparator(direction);
        let switching = true;
        while (switching) {
            switching = this.switchRows();
        }
        return this.toSort.getRaw();
    }
    public createComparator(direction: Direction): Comparator<any> {
        if (direction === Direction.Ascending) {
            return new GreaterThanComparator();
        }
        return new SmallerThanComparator();
    }

    private switchRows(): boolean {
        let shouldSwitch = false;
        const switchRows = this.shouldSwitchRows();
        if (switchRows >= 0) {
            this.toSort.swap(switchRows, switchRows + 1);
            shouldSwitch = true;
        }
        return shouldSwitch;
    }

    private shouldSwitchRows(): number {
        let rowIndex = this.toSort.getFirstRowIndex();
        let switchRows = false;
        while (this.alreadySorted(rowIndex, switchRows)) {
            switchRows = this.shouldSwitch(rowIndex);
            rowIndex++;
        }
        return (switchRows) ? rowIndex - 1 : -1;
    }

    private alreadySorted(rowIndex: number, switchRows: boolean): boolean {
        return rowIndex < this.toSort.size() - 1 && !switchRows;
    }

    private shouldSwitch(rowIndex: number): boolean {
        const currentRow = this.toSort.get(rowIndex);
        const nextRow = this.toSort.get(rowIndex + 1);
        return this.comparator.compare(currentRow, nextRow);
    }
}