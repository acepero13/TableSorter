import { JSDOM } from "jsdom";
import { Table } from "../../src/sorter/table/Table";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
const $ = require("jquery")(window) as JQueryStatic;
export function createTable(container = "<table>", rowSelector = "<tr>", colSelector = "<td>", header = false): JQuery<Element> {
    let table = new TableBuilder(container);
    createHeaderIfNecessary(table, header, rowSelector, colSelector);
    for (let i = 5; i > 0; i--) {
        table = createTableContent(i, table, rowSelector, colSelector);
    }
    return table.build();
}

function createHeaderIfNecessary(table: TableBuilder, header: boolean, rowSelector: string, colSelector: string) {
    if (header) {
        table
            .createRow(rowSelector)
            .addColumn("header 1", colSelector)
            .addColumn("header 2", colSelector);
    }
}



export function createTableAsc(container = "<table>", rowSelector = "<tr>", colSelector = "<td>", header = false): JQuery<Element> {
    let table = new TableBuilder(container);
    createHeaderIfNecessary(table, header, rowSelector, colSelector)
    for (let i = 1; i <= 5; i++) {
        table = createTableContent(i, table, rowSelector, colSelector);
    }
    return table.build();
}

export function createTableAscWithDivs(): JQuery<Element> {
    return createTableAsc("<div>", '<div class="row">', '<div class="col">');
}

export function createTableDescWithDivs(): JQuery<Element> {
    return createTable("<div>", '<div class="row">', '<div class="col">');
}

function createTableContent(index: number, table: TableBuilder, rowSelector = "<tr>", colSelector = "<td>"): TableBuilder {
    return table
        .createRow(rowSelector)
        .addColumn("cell" + index, colSelector)
        .addColumn(index + "", colSelector)
        .appendRow();
}


export class TableBuilder {
    private row!: JQuery<HTMLElement>;
    private table!: JQuery<HTMLElement>;

    public constructor(htmlContainer = "table") {
        this.createContainer();
    }

    private createContainer(htmlElement = "table"): void {
        this.table = $(`<${htmlElement} id = "table">`);
    }

    public createRow(rowSelector = "<tr>"): TableBuilder {
        // TODO: Make verification that only one is added at a time
        this.row = $(rowSelector);
        return this;
    }

    public addColumn(content: string, columnSelector = "<td>", extraData: { [key: string]: string; } = {}): TableBuilder {
        const column = $(columnSelector, { html: content });
        this.addData(extraData, column);
        column.text(content);
        this.row.append(column);
        this.table.append(this.row);
        return this;
    }

    private addData(extraData: { [key: string]: string; }, column: JQuery<HTMLElement>) {
        for (const key in extraData) {
            const value = extraData[key];
            column.data(key, value);
        }
    }

    public appendRow(): TableBuilder {
        this.table.append(this.row);
        return this;
    }

    public build(): JQuery<Element> {
        return this.table;
    }


}