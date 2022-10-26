import { JSX } from "https://esm.sh/v95/preact@10.11.0/jsx-runtime/src/index.d.ts";
import { Days } from "../types.ts";
import Selecto from "https://unpkg.com/preact-selecto@1.17.2/dist/selecto.esm.js";

import type PreactSelecto from "https://unpkg.com/preact-selecto@1.17.2/declaration/index.d.ts";
import { useState, useEffect, useCallback } from "preact/hooks";
// import { useDebounce } from 'npm:use-debounce-preact';
import { debounce } from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';

const SelectComponent = Selecto as PreactSelecto;

interface WeekProps {
    onChange?: (timeBlocks: string[]) => void
}

export default function Week({ onChange }: WeekProps) {
    const [timeBlocks, setTimeBlocks] = useState<string[]>([]);

    const timeBlocksChanged = useCallback(debounce((timeBlocks: string[]) => {
        onChange && onChange(timeBlocks);
    }, 3000), [timeBlocks]);

    useEffect(() => {
        timeBlocksChanged(timeBlocks);
    }, [timeBlocks]);


    return <div className="days flex p-8">
        <Day
            label="time"
            timeElement={(t: number) => {
                return (<div class="w-32 bg-yellow-700 text-center">{getHumanTime(t)}</div>)
            }}
        />
        <SelectComponent
            dragContainer={".days"}
            selectableTargets={[".days .time-block"]}
            hitRate={100}
            selectByClick={true}
            selectFromInside={true}
            continueSelect={true}
            ratio={0}
            onSelect={(e: any) => {
                const selectedIds = e.added.map((el: HTMLElement) => el.id);
                const unselectedIds = e.removed.map((el: HTMLElement) => el.id);
                e.added.forEach((el: HTMLElement) => {
                    el?.parentElement?.classList.add("bg-yellow-700");
                });
                e.removed.forEach((el: HTMLElement) => {
                    el?.parentElement?.classList.remove("bg-yellow-700");
                });
                setTimeBlocks((timeBlockIds: string[]) => {
                    const filteredIds = timeBlockIds.filter((id) => !unselectedIds.includes(id));
                    return [...filteredIds, ...selectedIds];
                });
            }}
        ></SelectComponent>
        <section className="flex">
            {
                Object.values(Days).map((day: string) => {
                    return (
                        <Day
                            width="12"
                            label={day}
                            key={day}
                            timeElement={getTimeElement}
                        />
                    )
                })
            }
        </section>
    </div>
}

interface DayProps {
    timeElement: (t: number, d?: string) => JSX.Element;
    label: string;
    width?: string;
}
const Day = ({ timeElement, label, width }: DayProps) => {
    const limit = 24;
    const times = [];
    for(let i = 0; i < limit; i += 0.5) {
        times.push(i);
    }
    return (
        <div class={`w-${width}`}>
            <h3 class="text-center">{label}</h3>
            <ul class="flex flex-col text-xs">
                {
                    times.map((t) => timeElement(t, label))
                }
            </ul>
        </div>
    );
}

const getHumanTime = (t:number):string => {
    const minutes = t%1 === 0 ? '00':'30';
    const hourRaw = Math.floor(t);
    const hour = hourRaw === 0 ? 12 :
        hourRaw > 12 ? hourRaw - 12 : hourRaw;
    const time = String(hour).padStart(2, '0');
    const a = t >= 12 ? 'PM':'AM';
    
    return `${time}:${minutes} ${a}`;
}

const getTimeElement = (t:number, d?:string): JSX.Element =>  {
    const selectedId = `${d}_${t}`;
    return (
        <div style={{ height: 16 }} class="w-100 border grid content-center justify-center">
            <div class="w-1 h-1 time-block" id={selectedId}></div>
        </div>
    );
}