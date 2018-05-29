import { AbstractBasicComparator } from "./AbstractBasicComparator";
import { Comparable } from "./Comparable";

export class StringComparable extends AbstractBasicComparator<string> {

    public getValue(): string {
        return this.element.toLocaleLowerCase();
    }
}