import { Cell } from "../table/structure/Cell";

export interface Attributable {
    getAttributeFrom(cell: Cell, attribute: string): string;
}