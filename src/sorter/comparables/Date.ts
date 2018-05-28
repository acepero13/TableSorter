import moment from "moment";
import { Comparable } from "./Comparable";
export class DateComparable implements Comparable<moment.Moment> {

    private date: moment.Moment;
    public constructor(date: moment.Moment) {
        this.date = date;
    }
    public static parse(dateAsStr: string, format?: string): any {
        return new DateComparable(moment(dateAsStr, format));
    }
    public lessThan(toCompare: Comparable<moment.Moment>): boolean {
        return this.getTimestamp() <= toCompare.getValue().valueOf();
    }
    public greaterThan(toCompare: Comparable<moment.Moment>): boolean {
        return this.getTimestamp() >= toCompare.getValue().valueOf();
    }
    public equals(toCompare: Comparable<moment.Moment>): boolean {
        return this.getTimestamp() === toCompare.getValue().valueOf();
    }
    public getValue(): moment.Moment {
        return this.date;
    }

    private getTimestamp(): number {
        return this.getValue().valueOf();
    }
}