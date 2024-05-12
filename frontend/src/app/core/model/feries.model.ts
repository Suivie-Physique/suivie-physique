import { EventColor } from "calendar-utils";

export interface JourFeries {
        id?: number;
        title: string,
        start: Date,
        end: Date,
        color: EventColor,
        draggable: boolean,
        resizable: {
          beforeStart: boolean,
          afterEnd: boolean,
        }
}