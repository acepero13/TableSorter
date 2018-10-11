import { Comparable } from "../comparables/Comparable";
import { NumberComparable } from "../comparables/Number";
import { Collection } from "./Collection";

export class Numbers implements Collection<Comparable<number>> {

    private readonly array: Comparable<number>[] = [];
    public constructor(array: number[]) {
        array.forEach(element => {
            this.array.push(new NumberComparable(element));
        });

    }
    public get(index: number): Comparable<number> {
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

    public getRaw(): Comparable<number>[] {
        return this.array;
    }

    public getFirstRowIndex(): number {
        return 0;
    }
}