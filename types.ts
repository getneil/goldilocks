import type {
    FieldValue,
  } from "https://cdn.skypack.dev/@firebase/firestore";

// collection: /teams/:slug
export interface Team {
    name: string;
    slug: string;
    created_at?: Date | FieldValue;
}

export interface Tz {
    label: string;
    offset: number;
}

export enum Days {
    SUNDAY = 'SUN',
    MONDAY = 'MON',
    TUESDAY = 'TUE',
    WEDNESDAY = 'WED',
    THURSDAY = 'THU',
    FRIDAY = 'FRI',
    SATURDAY = 'SAT'
}

// collection: /teams/:team_id/users/:user_id
export interface User {
    email: string;
    tz: string;
    tz_offset: number; // offset from UTC+0 +8, -3
}

// collection: /teams/:team_id/availability/:availability_id
export interface Availability {
    user_email: string;
    day: Days;
    start_at: number; // 0-23.5 ie: 12:30AM:0.5,  12NN:12 12MN:0
    end_at: number; // 0.5-24 ie: 12MN:24 NOTE: diff of 12MN between start vs end
    tz_offset: number;
    tz: string;
}