export interface Comparable<T> {
    lessThan(toCompare: Comparable<T>): boolean;
    greaterThan(toCompare: Comparable<T>): boolean;
    equals(toCompare: Comparable<T>): boolean;
    getValue(): T;
}