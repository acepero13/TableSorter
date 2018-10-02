import { Collection } from "../collections/Collection";
import { Direction } from "../options/SortingOptions";

export class QuickSort {
    private toSort: any;

    public sort(unsorted: Collection<any>): Collection<any> {
        this.toSort = unsorted;
        this.quickSort(0, this.toSort.size() - 1);
        return this.toSort;
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
    private computePartitionIndex(low: number, high: number, pivot: any) {
        let i = low - 1;
        for (let j = low; j < high; j++) {
            i = this.swapWhenNecessary(j, pivot, i);
        }
        return i;
    }

    private swapWhenNecessary(j: number, pivot: any, i: number) {
        if (this.toSort.get(j) <= pivot) {
            i++;
            this.toSort.swap(i, j);
        }
        return i;
    }
}