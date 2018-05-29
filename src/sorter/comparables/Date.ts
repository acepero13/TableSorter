import moment from "moment";
import { Comparable } from "./Comparable";

export class DateComparable implements Comparable<moment.Moment> {

    private readonly date: moment.Moment;

    public constructor(date: moment.Moment) {
        this.date = date;
    }

    public static parse(dateAsStr: string, format?: string): any {
        return new DateComparable(moment(dateAsStr, format));
    }

    public lessThan(toCompare: Comparable<moment.Moment>): boolean {
        return this.getValue().isBefore(toCompare.getValue());
    }

    public greaterThan(toCompare: Comparable<moment.Moment>): boolean {
        return this.getValue().isAfter(toCompare.getValue());
    }

    public equals(toCompare: Comparable<moment.Moment>): boolean {
        return this.getValue().isSame(toCompare.getValue());
    }

    public getValue(): moment.Moment {
        return this.date;
    }
}