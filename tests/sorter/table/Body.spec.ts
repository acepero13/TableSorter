import { expect } from "chai";
// tslint:disable-next-line:no-implicit-dependencies
import { JSDOM } from "jsdom";
import { SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { Body } from "../../../src/sorter/table/structure/Body";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
// tslint:disable-next-line:no-require-imports
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-require-imports
const $ = require("jquery")(window) as JQueryStatic;

describe("Table body", () => {
    it("should return first row with thead and body specified", () => {
        const table = "<table> <thead><tr><th>Key</th></tr></thead>  <tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const body = new Body(parsedTable, new SortingOptions(true, undefined, undefined, "th"));
        expect(body.getFirstItemIndex()).to.be.eqls(1);

    });

    it("should return first row with thead and body specified but two rows in header", () => {
        const table = "<table> <thead><tr><th>Key</th></tr> <tr class=\"header\"><th>Head</th></tr></thead>" +
            "<tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const body = new Body(parsedTable, new SortingOptions(true, undefined, undefined, "th"));
        expect(body.getFirstItemIndex()).to.be.eqls(2);

    });

    it("should return first row with using divs", () => {
        const table = "<div class=\"table\"><div class=\header\"> <div class=\"row\">"
            + "</div></div>   <div class=\body\"> <div class=\"row\"> </div></div></div>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const body = new Body(parsedTable, new SortingOptions(true, ".row", ".col", ".header", ".row", ".body"));
        expect(body.getFirstItemIndex()).to.be.eqls(1);

    });

    it("should return first row with thead and body specified", () => {
        const table = "<table> <thead><tr><th>Key</th></tr></thead>  <tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const body = new Body(parsedTable, new SortingOptions(true, undefined, undefined, "th"));
        body.replace(" hello");
        expect(parsedTable[0].outerHTML).to.be.eqls("<table> <thead><tr><th>Key</th></tr></thead>  <tbody> hello</tbody></table>");

    });
});