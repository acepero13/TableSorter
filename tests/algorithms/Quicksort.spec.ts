// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { QuickSort } from "../../src/sorter/algorithms/Mergesort";
import { Numbers } from "../../src/sorter/collections/Numbers";

describe("Mergesort", () => {
    it("should sort an unsorted array", () => {
        const unsorterArray = new Numbers([5, 3, 1, 8, 30, 21]);
        const sortedArray = new Numbers([1, 3, 5, 8, 21, 30]);
        const sorter = new QuickSort();
        expect(sorter.sort(unsorterArray).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should sort an unsorted array a bigger array sorted", () => {
        const unsorterArray = new Numbers([5, 3, 1, 8, 30, 21, 100, 23, 2, 2, 99, 1000]);
        const sortedArray = new Numbers([1, 2, 2, 3, 5, 8, 21, 23, 30, 99, 100, 1000]);
        const sorter = new QuickSort();
        expect(sorter.sort(unsorterArray).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });

    it("should return same array when only one element", () => {
        const unsorterArray = new Numbers([5]);
        const sortedArray = new Numbers([5]);
        const sorter = new QuickSort();
        expect(sorter.sort(unsorterArray).getRaw()).to.be.deep.equal(sortedArray.getRaw());
    });
});