import { Attributable } from "../attributes/Attributable";
import { Comparable } from "../comparables/Comparable";
import { DateComparable } from "../comparables/Date";
import { MoneyComparable } from "../comparables/Money";
import { NumberComparable } from "../comparables/Number";
import { StringComparable } from "../comparables/String";
import { SortingOptions } from "../options/SortingOptions";
import { Cell } from "../table/Cell";

export class ColumnComparableFactory {

    public parse(value: string, cell: Cell, attributeRetriever: Attributable): Comparable<any> {
        const dataType = attributeRetriever.getAttributeFrom(cell, "type");

        if (dataType === "number") {
            return NumberComparable.parse(value);
        } else if (dataType === "date") {
            const format = attributeRetriever.getAttributeFrom(cell, "format");
            return DateComparable.parse(value, format);
        } else if (dataType === "money") {
            return MoneyComparable.parse(value);
        }
        return new StringComparable(value);
    }

}