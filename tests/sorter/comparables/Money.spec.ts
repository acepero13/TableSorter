import { expect } from "chai";
import { MoneyComparable } from "../../../src/sorter/comparables/Money";

describe("Money comparable Equality", () => {
    it("should return parse valid money in euros", () => {
        const value = MoneyComparable.parse("99 EUR");
        expect(value.getValue()).to.be.equals(99);
    });

    it("should return parse valid money in euros with floating point", () => {
        const value = MoneyComparable.parse("99.55 EUR");
        expect(value.getValue()).to.be.equals(99.55);
    });
});

describe("Money GreaterThan", () => {
    it("should 100 euros be greater than 50 euros", () => {
        const eur100 = MoneyComparable.parse("100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur100.greaterThan(eur50)).to.be.true;
    });

    it("should 50 euros NOT be greater than 100 euros", () => {
        const eur100 = MoneyComparable.parse("100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur50.greaterThan(eur100)).to.be.false;
    });

    it("should 100,00 euros be greater than 50,5 euros", () => {
        const eur100 = MoneyComparable.parse("100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur100.greaterThan(eur50)).to.be.true;
    });

    it("should -100,00 euros NOT be greater than 50,5 euros", () => {
        const minusEur100 = MoneyComparable.parse("-100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(minusEur100.greaterThan(eur50)).to.be.false;
    });
});

describe("Money SmallerThan", () => {
    it("should 50 euros be smaller than 100 euros", () => {
        const eur100 = MoneyComparable.parse("100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur50.lessThan(eur100)).to.be.true;
    });

    it("should 800 euros be smaller than 1200 euros", () => {
        const eur800 = MoneyComparable.parse("800,00 EUR", ",");
        const eur1200 = MoneyComparable.parse("1.200,00 EUR", ",");
        // tslint:disable-next-line:no-unused-expression
        expect(eur800.lessThan(eur1200)).to.be.true;
    });

    it("should 50 euros NOT be smaller than 100 euros", () => {
        const eur100 = MoneyComparable.parse("100 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur100.lessThan(eur50)).to.be.false;
    });
});

describe("Money Equality", () => {
    it("should 50 euros be equal to 50 euros", () => {
        const eur502 = MoneyComparable.parse("50 EUR");
        const eur50 = MoneyComparable.parse("50 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur502.equals(eur50)).to.be.true;
    });

    it("should 50 euros be equal to 50 euros using different formats", () => {
        const eur502 = MoneyComparable.parse("50.50 EUR");
        const eur50 = MoneyComparable.parse("50.5 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur502.equals(eur50)).to.be.true;
    });

    it("should 50 euros NOT be equal to 100 euros using different formats", () => {
        const eur50 = MoneyComparable.parse("50 EUR");
        const eur100 = MoneyComparable.parse("100 EUR");
        // tslint:disable-next-line:no-unused-expression
        expect(eur50.equals(eur100)).to.be.false;
    });
});