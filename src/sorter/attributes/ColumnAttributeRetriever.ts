import { Cell } from "../table/Cell";
import { Table } from "../table/Table";
import { Attributable } from "./Attributable";

export class ColumnAttributeRetriever implements Attributable {
    private readonly table: Table;
    private readonly hasHeader: boolean;
    public constructor(table: Table, hasHeader: boolean) {
        this.table = table;
        this.hasHeader = hasHeader;
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
        const headerColumn = this.table.getCell({ columnIndex: columnIndex, rowIndex: 0 });
        return headerColumn.data(attribute);
    }

    private valueDoesNotExistsAndHasHeaderToGetValueFrom(value: string): boolean {
        return !value && this.hasHeader;
    }
}