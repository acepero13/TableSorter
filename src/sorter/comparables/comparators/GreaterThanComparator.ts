import { Comparable } from "../Comparable";
import { Comparator } from "./Comparator";

export class GreaterThanComparator implements Comparator<any> {
    public compare(src: Comparable<any>, dst: Comparable<any>): boolean {
        return src.greaterThan(dst);
    }
}