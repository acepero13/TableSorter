import { Attributable } from "../attributes/Attributable";
import { Comparable } from "../comparables/Comparable";
import { DateComparable } from "../comparables/Date";
import { NumberComparable } from "../comparables/Number";
import { StringComparable } from "../comparables/String";
import { SortingOptions } from "../options/SortingOptions";

export class ColumnComparableFactory {

    public parse(value: string,
        colIndex: number,
        rowIndex: number,
        attributeRetriever: Attributable): Comparable<any> {
        const dataType = attributeRetriever.getAttributeFrom(colIndex, rowIndex, "type");

        if (dataType === "number") {
            return NumberComparable.parse(value);
        } else if (dataType === "date") {
            const format = attributeRetriever.getAttributeFrom(colIndex, rowIndex, "format");
            return DateComparable.parse(value, format);
        }
        return new StringComparable(value);
    }

}