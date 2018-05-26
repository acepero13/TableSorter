import { ColumnComparableFactory } from "../../../src/sorter/factories/ColumnComparableFactory";
import { SortingOptions, Direction } from "../../../src/sorter/options/SortingOptions";
import { expect } from "chai";
import { StringComparable } from "../../../src/sorter/comparables/String";

describe("Comparable Factory", () => {
    it("should return number comparable when number provided", () => {
        const factory = new ColumnComparableFactory();
        const value = factory.parse("12", "number");
        expect(value.getValue()).to.be.equals(12);
    });

    it("should return string comparable when not type provided", () => {
        const factory = new ColumnComparableFactory();
        const value = factory.parse("12");
        expect(value).to.be.an.instanceOf(StringComparable);
    });
});