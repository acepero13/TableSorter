// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { DateComparable } from "../../../src/sorter/comparables/Date";

describe("Date comparable Equality Parser", () => {
    it("should parse a valid date with format", () => {
        const date = DateComparable.parse("03.01.2003", "DD.MM.YYYY");
        expect(date.getValue().format("YYYY/MM/DD")).to.be.equals("2003/01/03");
    });

    it("should parse a valid date without format", () => {
        const date = DateComparable.parse("2003-01-03");
        expect(date.getValue().format("YYYY/MM/DD")).to.be.equals("2003/01/03");
    });

    it("should return equals when comparing same date", () => {
        const date = DateComparable.parse("2003-01-03");
        const sameDate = DateComparable.parse("2003-01-03");
        // tslint:disable-next-line:no-unused-expression
        expect(date.equals(sameDate)).to.be.true;
    });

    it("should return false when comparing two different dates", () => {
        const date = DateComparable.parse("2003-01-03");
        const sameDate = DateComparable.parse("2003-01-04");
        // tslint:disable-next-line:no-unused-expression
        expect(date.equals(sameDate)).to.be.false;
    });

});

describe("Date comparable greater than", () => {
    it("should return that 2018-10-11 is greater than 2016-10-11", () => {
        const october2018 = DateComparable.parse("2018-10-11");
        const october2016 = DateComparable.parse("2016-10-1");
        // tslint:disable-next-line:no-unused-expression
        expect(october2018.greaterThan(october2016)).to.be.true;
    });

    it("should return that 2018-10-11 is NOT greater than 2016-10-11", () => {
        const october2018 = DateComparable.parse("2018-10-11");
        const october2016 = DateComparable.parse("2016-10-1");
        // tslint:disable-next-line:no-unused-expression
        expect(october2016.greaterThan(october2018)).to.be.false;
    });

});

describe("Date comparable smaller than", () => {
    it("should return that 2018-10-11 is greater than 2016-10-11", () => {
        const october2018 = DateComparable.parse("2018-10-11");
        const october2016 = DateComparable.parse("2016-10-1");
        // tslint:disable-next-line:no-unused-expression
        expect(october2016.lessThan(october2018)).to.be.true;
    });

    it("should return that 2018-10-11 is NOT smaller than 2016-10-11", () => {
        const october2018 = DateComparable.parse("2018-10-11");
        const october2016 = DateComparable.parse("2016-10-1");
        // tslint:disable-next-line:no-unused-expression
        expect(october2018.lessThan(october2016)).to.be.false;
    });

});