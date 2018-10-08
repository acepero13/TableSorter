import accounting from "accounting";
import { AbstractBasicComparator } from "./AbstractBasicComparator";
import { Comparable } from "./Comparable";

export class MoneyComparable extends AbstractBasicComparator<number> {
    public getValue(): number {
        return this.element;
    }

    public static parse(value: string, format?: string): Comparable<number> {
        return new MoneyComparable(accounting.unformat(value, format));
    }
}