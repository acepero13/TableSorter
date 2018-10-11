import { Cell } from "../table/structure/Cell";
import { Header } from "../table/structure/Header";
import { TableLike } from "../table/TableLike";
import { Attributable } from "./Attributable";

export class ColumnAttributeRetriever implements Attributable {
    private readonly table: TableLike;
    private readonly hasHeader: boolean;
    private readonly header: Header;
    public constructor(table: TableLike, hasHeader: boolean, header: Header) {
        this.table = table;
        this.hasHeader = hasHeader;
        this.header = header;
    }

    public getAttributeFrom(cell: Cell, attribute: string): string {
        const column = this.table.getCell(cell);
        let value = column.data(attribute);
        if (this.valueDoesNotExistsAndHasHeaderToGetValueFrom(value)) {
            value = this.getAttributeFromHeader(cell.columnIndex, attribute);
        }
        return !value ? "" : value;
    }

    private getAttributeFromHeader(columnIndex: number, attribute: string): string {
        const attr = this.header.getAttribute(columnIndex, attribute);
        return attr !== undefined ? attr : "";
    }

    private valueDoesNotExistsAndHasHeaderToGetValueFrom(value: string): boolean {
        return !value && this.hasHeader;
    }
}