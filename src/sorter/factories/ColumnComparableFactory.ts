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
                comparable = DateComparable.parse(
                    value,
                    attributeRetriever.getAttributeFrom(cell, "format")
                );
                break;
            case "money":
                comparable = MoneyComparable.parse(
                    value,
                    attributeRetriever.getAttributeFrom(cell, "decimal")
                );
                break;
            default:
                comparable = new StringComparable(value);
        }
        return comparable;
    }
}