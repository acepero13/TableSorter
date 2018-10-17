import { Comparable } from "../Comparable";

export interface Comparator<T> {
    compare(src: Comparable<T>, dst: Comparable<T>): boolean;
}