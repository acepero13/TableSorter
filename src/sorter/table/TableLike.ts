import { Comparable } from "../comparables/Comparable";
import { Cell } from "./Cell";

export interface TableLike {
    getTotalRows(): number;

    getCell(cell: Cell): JQuery<Element>;

    getRow(rowIndex: number): JQuery<Element>;

    getFirstRowIndex(): number;

    getCellValue(cell: Cell): Comparable<any>;

    getCellAttribute(cell: Cell, attribute: string): string;

    html(): string;

    clone(): TableLike;
}