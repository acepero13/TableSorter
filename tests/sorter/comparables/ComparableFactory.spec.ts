// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { Attributable } from "../../../src/sorter/attributes/Attributable";
import { DateComparable } from "../../../src/sorter/comparables/Date";
import { MoneyComparable } from "../../../src/sorter/comparables/Money";
import { StringComparable } from "../../../src/sorter/comparables/String";
import { ColumnComparableFactory } from "../../../src/sorter/factories/ColumnComparableFactory";
import { Direction, SortingOptions } from "../../../src/sorter/options/SortingOptions";

describe("Comparable Factory", () => {
    it("should return number comparable when number provided", () => {
        const factory = new ColumnComparableFactory();
        const fakeAttribute = new FakeAttributeRetriever();
        fakeAttribute.attribute.type = "number";
        const value = factory.parse("12", 0, 0, fakeAttribute);
        expect(value.getValue()).to.be.equals(12);
    });

    it("should return string comparable when not type provided", () => {
        const factory = new ColumnComparableFactory();
        const fakeAttribute = new FakeAttributeRetriever();
        fakeAttribute.attribute.type = "";
        const value = factory.parse("12", 0, 0, fakeAttribute);
        expect(value).to.be.an.instanceOf(StringComparable);
    });

    it("should return date comparable when date type provided", () => {
        const factory = new ColumnComparableFactory();
        const fakeAttribute = new FakeAttributeRetriever();
        fakeAttribute.attribute.type = "date";
        const value = factory.parse("2013-05-10", 0, 0, fakeAttribute);
        expect(value).to.be.an.instanceOf(DateComparable);
    });

    it("should return money comparable when money type provided", () => {
        const factory = new ColumnComparableFactory();
        const fakeAttribute = new FakeAttributeRetriever();
        fakeAttribute.attribute.type = "money";
        const value = factory.parse("100 EUR", 0, 0, fakeAttribute);
        expect(value).to.be.an.instanceOf(MoneyComparable);
    });
});

class FakeAttributeRetriever implements Attributable {
    public attribute: { [key: string]: string; } = {};
    public getAttributeFrom(columnIndex: number, rowIndex: number, attributeName: string): string {
        return this.attribute[attributeName];
    }
}