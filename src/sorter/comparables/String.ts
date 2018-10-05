import { AbstractBasicComparator } from "./AbstractBasicComparator";

export class StringComparable extends AbstractBasicComparator<string> {

    public getValue(): string {
        return this.element.toLocaleLowerCase();
    }
}