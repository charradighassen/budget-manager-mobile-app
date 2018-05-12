import { DateTime } from "ionic-angular/components/datetime/datetime";

export interface GoalItem{
    key?: string,
    name:string;
    description:string,
    date:DateTime,
    color?:string
    userId: string;
}