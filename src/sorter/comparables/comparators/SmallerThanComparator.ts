import { Comparable } from "../Comparable";
import { Comparator } from "./Comparator";

export class SmallerThanComparator implements Comparator<any> {
    public compare(src: Comparable<any>, dst: Comparable<any>): boolean {
        return src.lessThan(dst);
    }
}