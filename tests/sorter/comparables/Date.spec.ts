import { DateComparable } from "../../../src/sorter/comparables/Date";
import { expect } from "chai";

describe("Date comparable Equality Parser", () => {
    it("should parse a valid date with format", () => {
        const date = DateComparable.parse('03.01.2003', 'DD.MM.YYYY');
        expect(date.getValue().format("YYYY/MM/DD")).to.be.equals('2003/01/03');
    });

    it("should parse a valid date without format", () => {
        const date = DateComparable.parse('2003-01-03');
        expect(date.getValue().format("YYYY/MM/DD")).to.be.equals('2003/01/03');
    });

    it("should return equals when comparing same date", () => {
        const date = DateComparable.parse('2003-01-03');
        const sameDate = DateComparable.parse('2003-01-03');
        expect(date.equals(sameDate)).to.be.true;
    });

    it("should return false when comparing two different dates", () => {
        const date = DateComparable.parse('2003-01-03');
        const sameDate = DateComparable.parse('2003-01-04');
        expect(date.equals(sameDate)).to.be.false;
    });
});