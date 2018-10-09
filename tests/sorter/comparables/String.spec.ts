// tslint:disable-next-line:no-implicit-dependencies
import { expect } from "chai";
import { StringComparable } from "../../../src/sorter/comparables/String";

describe("String comparable Equality", () => {
    it("should return true when two strings are equal", () => {
        const string1 = new StringComparable("Hello");
        const string2 = new StringComparable("Hello");
        const areEqual = string1.equals(string2);
        // tslint:disable-next-line:no-unused-expression
        expect(areEqual).to.be.true;

    });

    it("should return true when two strings are equal but different casing", () => {
        const string1 = new StringComparable("hello");
        const string2 = new StringComparable("Hello");
        const areEqual = string1.equals(string2);
        // tslint:disable-next-line:no-unused-expression
        expect(areEqual).to.be.true;

    });

    it("should return false when two strings are NOT equal", () => {
        const string1 = new StringComparable("hello");
        const string2 = new StringComparable("World");
        const areEqual = string1.equals(string2);
        // tslint:disable-next-line:no-unused-expression
        expect(areEqual).to.be.false;

    });

    it("should return hello is greater than world", () => {
        const hello = new StringComparable("hello");
        const world = new StringComparable("World");
        // tslint:disable-next-line:no-unused-expression
        expect(world.greaterThan(hello)).to.be.true;

    });

    it("should hello NOT be greater than world", () => {
        const hello = new StringComparable("hello");
        const world = new StringComparable("World");
        // tslint:disable-next-line:no-unused-expression
        expect(hello.greaterThan(world)).to.be.false;

    });

    it("should hello be smaller than world", () => {
        const hello = new StringComparable("hello");
        const world = new StringComparable("World");
        // tslint:disable-next-line:no-unused-expression
        expect(hello.lessThan(world)).to.be.true;

    });

    it("should world NOT be smaller than hello", () => {
        const hello = new StringComparable("hello");
        const world = new StringComparable("World");
        // tslint:disable-next-line:no-unused-expression
        expect(world.lessThan(hello)).to.be.false;

    });

});