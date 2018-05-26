import { JSDOM } from "jsdom";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
const $ = require("jquery")(window) as JQueryStatic;
export function createTable(container = "<table>", rowSelector = "<tr>", colSelector = "<td>"): JQuery<Element> {
    let table = new TableBuilder(container);
    for (let i = 5; i > 0; i--) {
        table = createTableContent(i, table,  rowSelector, colSelector);
    }
    return table.build();
}



export function createTableAsc(container = "<table>", rowSelector = "<tr>", colSelector = "<td>"): JQuery<Element> {
    let table = new TableBuilder(container);
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


class TableBuilder {
    private row!: JQuery<HTMLElement>;
    private table!: JQuery<HTMLElement>;

    public constructor(htmlContainer = "table") {
        this.createContainer();
    }

    private createContainer(htmlElement = "table"): void {
        this.table = $(`<${htmlElement} id = "table">`);
    }

    public createRow(rowSelector = "<tr>"): TableBuilder {
        this.row = $(rowSelector);
        return this;
    }

    public addColumn(content: string, columnSelector = "<td>", extraData = []): TableBuilder {
        const column = $(columnSelector, { html: content });
        column.text(content);
        this.row.append(column);
        this.table.append(this.row);
        return this;
    }

    public appendRow(): TableBuilder {
        this.table.append(this.row);
        return this;
    }

    public build(): JQuery<Element> {
        return this.table;
    }


}