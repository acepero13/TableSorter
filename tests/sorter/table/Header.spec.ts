import { expect } from "chai";
import { JSDOM } from "jsdom";
import { SortingOptions } from "../../../src/sorter/options/SortingOptions";
import { Header } from "../../../src/sorter/table/structure/Header";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
// tslint:disable-next-line:no-require-imports
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-require-imports
const $ = require("jquery")(window) as JQueryStatic;

describe("Table header", () => {
    it("should return first row with thead and body specified", () => {
        const table = "<table> <thead><tr><th data-type=\"number\">Key</th></tr></thead>  <tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const header = new Header(parsedTable, new SortingOptions(true, undefined, undefined, "th"));
        expect(header.getAttribute(0, "type")).to.be.eqls("number");

    });

    it("should return empty when no attribute defined", () => {
        const table = "<table> <thead><tr><th>Key</th></tr> <tr class=\"header\"><th>Head</th></tr></thead>" +
            "<tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const header = new Header(parsedTable, new SortingOptions(true, undefined, undefined, "th"));
        expect(header.getAttribute(0, "type")).to.be.eqls("");

    });

    it("should return empty when no attribute defined", () => {
        const table = "<table> <thead><tr><th  data-type=\"money\">Key</th></tr>"
            + " <tr class=\"header\"><th data-type=\"number\">Head</th></tr></thead>"
            + "<tbody><tr><td>Value<td></tr></tbody></table>";
        const parsedTable = $((<JQuery<Element>><any>$.parseHTML(table))[0]);
        const header = new Header(parsedTable, new SortingOptions(true, undefined, undefined, "th", "tr.header"));
        expect(header.getAttribute(0, "type")).to.be.eqls("number");

    });
});