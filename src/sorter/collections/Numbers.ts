import { Collection } from "./Collection";

export class Numbers implements Collection<number> {

    private array: number[];
    public constructor(array: number[]) {
        this.array = array;
    }
    public get(index: number): number {
        return this.array[index];
    }

    public size(): number {
        return this.array.length;
    }
    public swap(src: number, dst: number): void {
        const tmp = this.array[src];
        this.array[src] = this.array[dst];
        this.array[dst] = tmp;
    }

    public getRaw(): number[] {
        return this.array;
    }
}