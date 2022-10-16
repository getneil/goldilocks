import { useState } from "preact/hooks";


import type { Tz } from "../types.ts";

interface SelectTimezoneProps {
    onSelect: (tz: Tz) => void;
}
const SelectTimezone = ({ onSelect }: SelectTimezoneProps) => {
    const options = timezoneOffsets.map((offset) => {
        return {
            offset,
            label: getOffsetLabel(offset),
        } as Tz
    })
    const handleChange = (e: any) => {
        const label = e?.currentTarget?.value!;
        const tz = options.find((o) => o.label === label);
        onSelect(tz!);
    };

    return (
        <select onChange={handleChange}>
          {
            options.map((o) => <option value={o.label}>{o.label}</option>)
          }
        </select>
    );
};

const timezoneOffsets = [
    14,
    13,
    12,
    11,
    10,
    9,
    8.75,
    8,
    7,
    6,
    5.5,
    5,
    4.5,
    4,
    3.5,
    3,
    2,
    1,
    0,
    -1,
    -2,
    -2.5,
    -3,
    -4,
    -5,
    -6,
    -7,
    -8,
    -9,
    -9.5,
    -10,
    -11,
    -12,
];

const getOffsetLabel = (offset:number): string => {
    let label = 'UTC';
    const hour = Math.abs(offset);
    const remainder = offset % 1;
    const isWhole = remainder === 0;
    const isMinus = offset < 0;

    label += isMinus ? '-':'+';
    
    const offsetMinutes = remainder === 0.5 ? '30':'45';
    label += isWhole ? hour : Math.floor(hour)+':'+offsetMinutes;

    return label;
}

export default SelectTimezone;

