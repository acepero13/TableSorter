export interface Collection<T> {
    get(index: number): T;
    size(): number;
    swap(src: number, dst: number): void;
    getRaw(): any;
    getFirstRowIndex(): number;
}