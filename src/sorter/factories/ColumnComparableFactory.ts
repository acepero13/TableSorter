import { Attributable } from "../attributes/Attributable";
import { Comparable } from "../comparables/Comparable";
import { DateComparable } from "../comparables/Date";
import { MoneyComparable } from "../comparables/Money";
import { NumberComparable } from "../comparables/Number";
import { StringComparable } from "../comparables/String";
import { Cell } from "../table/structure/Cell";

export class ColumnComparableFactory {

    public parse(value: string, cell: Cell, attributeRetriever: Attributable): Comparable<any> {
        const dataType = attributeRetriever.getAttributeFrom(cell, "type");
        let comparable;
        switch (dataType) {
            case "number":
                comparable = NumberComparable.parse(value);
                break;
            case "date":
                const format = attributeRetriever.getAttributeFrom(cell, "format");
                comparable = DateComparable.parse(value, format);
                break;
            case "money":
                comparable = MoneyComparable.parse(value);
                break;
            default:
                comparable = new StringComparable(value);
        }
        return comparable;
    }
}