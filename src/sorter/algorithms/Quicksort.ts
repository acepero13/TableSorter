import { Collection } from "../collections/Collection";
import { Comparable } from "../comparables/Comparable";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";
import { Direction } from "../options/SortingOptions";
import { Sortable } from "./Sortable";

export class QuickSort implements Sortable {
    private toSort: Collection<any>;
    private comparator!: Comparator<any>;

    public constructor(unsorted: Collection<any>) {
        this.toSort = unsorted;
    }

    public sort(direction: Direction): Collection<any> {
        this.comparator = this.createComparator(direction);
        this.quickSort(0, this.toSort.size() - 1);
        this.toSort.getRaw();
        return this.toSort;
    }

    public createComparator(direction: Direction): Comparator<any> {
        if (direction === Direction.Ascending) {
            return new SmallerThanComparator();
        }
        return new GreaterThanComparator();
    }

    private quickSort(low: number, high: number): void {
        if (low < high) {
            const partitionIndex = this.partition(low, high);
            this.quickSort(low, partitionIndex - 1);
            this.quickSort(partitionIndex + 1, high);
        }
    }
    private partition(low: number, high: number): any {
        const pivot = this.toSort.get(high);
        const partitionIndex = this.computePartitionIndex(low, high, pivot);
        this.toSort.swap(partitionIndex + 1, high);
        return partitionIndex + 1;
    }
    private computePartitionIndex(low: number, high: number, pivot: Comparable<any>): number {
        let i = low - 1;
        for (let j = low; j < high; j++) {
            i = this.swapWhenNecessary(j, pivot, i);
        }
        return i;
    }

    private swapWhenNecessary(j: number, pivot: Comparable<any>, i: number): number {
        let index = i;
        if (this.comparator.compare(this.toSort.get(j), pivot)) {
            index++;
            this.toSort.swap(index, j);
        }
        return index;
    }
}