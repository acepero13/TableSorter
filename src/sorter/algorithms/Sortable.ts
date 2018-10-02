import { Comparator } from "../comparables/comparators/Comparator";
import { Direction } from "../options/SortingOptions";

export interface Sortable {
    sort(direction: Direction): any;
    createComparator(direction: Direction): Comparator<any>;
}