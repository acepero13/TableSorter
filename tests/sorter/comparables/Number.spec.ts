// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { NumberComparable } from "../../../src/sorter/comparables/Number";

describe("Number comparable Equality", () => {
    it("should return true when two numbers are equal", () => {
        const number1 = new NumberComparable(5);
        const number2 = new NumberComparable(5);
        const areEqual = number1.equals(number2);
        // tslint:disable-next-line:no-unused-expression
        expect(areEqual).to.be.true;

    });

    it("should return false when two numbers are NOT equal", () => {
        const number1 = new NumberComparable(5);
        const number2 = new NumberComparable(6);
        const areEqual = number1.equals(number2);
        // tslint:disable-next-line:no-unused-expression
        expect(areEqual).to.be.false;

    });

    it("should return six is greater than five", () => {
        const five = new NumberComparable(5);
        const six = new NumberComparable(6);
        // tslint:disable-next-line:no-unused-expression
        expect(six.greaterThan(five)).to.be.true;

    });

    it("should six be greater than five", () => {
        const five = new NumberComparable(5);
        const six = new NumberComparable(6);
        // tslint:disable-next-line:no-unused-expression
        expect(six.greaterThan(five)).to.be.true;

    });

    it("should five NOT be greater than six", () => {
        const five = new NumberComparable(5);
        const six = new NumberComparable(6);
        // tslint:disable-next-line:no-unused-expression
        expect(five.greaterThan(six)).to.be.false;

    });

    it("should five be smaller than six", () => {
        const five = new NumberComparable(5);
        const six = new NumberComparable(6);
        // tslint:disable-next-line:no-unused-expression
        expect(five.lessThan(six)).to.be.true;

    });

    it("should six NOT be smaller than five", () => {
        const five = new NumberComparable(5);
        const six = new NumberComparable(6);
        // tslint:disable-next-line:no-unused-expression
        expect(six.lessThan(five)).to.be.false;

    });

    it("should parse string five to number", () => {
        expect(NumberComparable.parse("5").getValue()).to.be.equals(5);
    });

    it("should raise an error with a non-numeric string", () => {
        expect(() => NumberComparable.parse("5Hello")).to.throw("Invalid number");
    });

});