import { Cell } from "../table/Cell";

export interface Attributable {
    getAttributeFrom(cell: Cell, attribute: string): string;
}