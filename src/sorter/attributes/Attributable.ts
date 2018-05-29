export interface Attributable {
     getAttributeFrom(columnIndex: number, rowIndex: number, attribute: string): string;
}