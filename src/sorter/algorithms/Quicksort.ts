import { Collection } from "../collections/Collection";
import { Comparable } from "../comparables/Comparable";
import { Comparator } from "../comparables/comparators/Comparator";
import { GreaterThanComparator } from "../comparables/comparators/GreaterThanComparator";
import { SmallerThanComparator } from "../comparables/comparators/SmallerThanComparator";
import { Direction } from "../options/SortingOptions";
import { Sortable } from "./Sortable";

export class QuickSort implements Sortable {
    private readonly toSort: Collection<any>;
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
        while (low < high) {
            const partitionIndex = this.partition(low, high);
            this.quickSort(low, partitionIndex - 1);
            low = partitionIndex + 1;
        }
    }
    private partition(low: number, high: number): any {
        const pivotIndex = this.choosePivotIndex(low, high);
        const pivot = this.toSort.get(pivotIndex);
        this.toSort.swap(high, pivotIndex);
        const partitionIndex = this.computePartitionIndex(low, high, pivot);
        this.toSort.swap(partitionIndex, high);
        return partitionIndex;
    }
    private choosePivotIndex(low: number, high: number): number {
        return low + Math.floor(Math.random() * high) % (high - low + 1);
    }

    private computePartitionIndex(low: number, high: number, pivot: Comparable<any>): number {
        let i = low - 1;
        for (let j = low; j <= high; j++) {
            i = this.swapWhenNecessary(j, pivot, i);
        }
        return i + 1;
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