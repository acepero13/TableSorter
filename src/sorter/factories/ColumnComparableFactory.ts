import { Comparable } from "../comparables/Comparable";
import { NumberComparable } from "../comparables/Number";
import { StringComparable } from "../comparables/String";
import { SortingOptions } from "../options/SortingOptions";

export class ColumnComparableFactory {

    public parse(value: string, dataType?: string): Comparable<any> {
        if (dataType === "number") {
            return NumberComparable.parse(value);
        }
        return new StringComparable(value);
    }
}