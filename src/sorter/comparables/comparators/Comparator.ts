import { Comparable } from "../Comparable";

export interface Comparator<T> {
    compare(src: Comparable<any>, dst: Comparable<any>): boolean;
}