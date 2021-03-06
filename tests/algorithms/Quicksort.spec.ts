// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";

// tslint:disable-next-line:no-implicit-dependencies
import { QuickSort } from "../../src/sorter/algorithms/Quicksort";
import { Numbers } from "../../src/sorter/collections/Numbers";
import { Direction } from "../../src/sorter/options/SortingOptions";

describe("Mergesort", () => {
    it("should sort an unsorted array", () => {
        const unsorterArray = new Numbers([5, 3, 1, 8, 30, 21]);
        const sortedArray = new Numbers([1, 3, 5, 8, 21, 30]);
        const sorter = new QuickSort(unsorterArray);
        expect(sorter.sort(Direction.Ascending).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should sort an unsorted array in descending order", () => {
        const unsorterArray = new Numbers([5, 3, 1, 8, 30, 21]);
        const sortedArray = new Numbers([30, 21 , 8, 5, 3, 1]);
        const sorter = new QuickSort(unsorterArray);
        expect(sorter.sort(Direction.Descending).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should sort an unsorted array a bigger array sorted", () => {
        const unsorterArray = new Numbers([5, 3, 1, 8, 30, 21, 100, 23, 2, 2, 99, 1000]);
        const sortedArray = new Numbers([1, 2, 2, 3, 5, 8, 21, 23, 30, 99, 100, 1000]);
        const sorter = new QuickSort(unsorterArray);
        expect(sorter.sort(Direction.Ascending).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should return same array when only one element", () => {
        const unsorterArray = new Numbers([5]);
        const sortedArray = new Numbers([5]);
        const sorter = new QuickSort(unsorterArray);
        expect(sorter.sort(Direction.Ascending).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should return the index of the first item", () => {
        const array = new Numbers([5]);
        expect(array.getFirstRowIndex()).to.be.equals(0);
    });
});