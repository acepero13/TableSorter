import { AbstractBasicComparator } from "./AbstractBasicComparator";
import { Comparable } from "./Comparable";

export class NumberComparable extends AbstractBasicComparator<number> {

    public getValue(): number {
        return this.element;
    }
    public static parse(value: string): Comparable<number> {
        const parsedInt = Number(value);
        if (isNaN(parsedInt)) {
            throw new Error("Invalid number");
        }
        return new NumberComparable(parsedInt);
    }
}