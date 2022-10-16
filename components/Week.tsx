import { JSX } from "https://esm.sh/v95/preact@10.11.0/jsx-runtime/src/index.d.ts";
import { Days } from "../types.ts";
import Selecto from "https://unpkg.com/preact-selecto@1.17.2/dist/selecto.esm.js";
import type PreactSelecto from "https://unpkg.com/preact-selecto@1.17.2/declaration/index.d.ts";

const SelectComponent = Selecto as PreactSelecto;

export default function Week() {


    return <div className="flex">
        <Day
            label="time"
            timeElement={(t: number) => {
                return (<div class="w-32 bg-yellow-700 text-center">{getHumanTime(t)}</div>)
            }}
        />
        <Selecto
            dragContainer={".days"}
            selectableTargets={[".days .time-block"]}
            hitRate={100}
            selectByClick={true}
            selectFromInside={true}
            continueSelect={true}
            ratio={0}
            onSelect={(e: any) => {
                console.log(e);
                e.added.forEach(el => {
                    el.classList.add("bg-yellow-700");
                    console.log("ADD")
                });
                e.removed.forEach(el => {
                    el.classList.remove("bg-yellow-700");
                });
            }}
        ></Selecto>
        <section className="days flex">
            {
                Object.keys(Days).map((day) => {
                    return (
                        <Day
                            width="24"
                            label={day}
                            key={day}
                            timeElement={(t: number) => {
                                return (<div style={{ height: 16 }} class="time-block w-16"></div>)
                            }}
                        />
                    )
                })
            }
        </section>
    </div>
}

interface DayProps {
    timeElement: (t: number) => JSX.Element;
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
            <h3>{label}</h3>
            <ul class="flex flex-col text-xs">
                {
                    times.map((t) => timeElement(t))
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
    let time = String(hour).padStart(2, '0');
    let a = t >= 12 ? 'PM':'AM';
    
    return `${time}:${minutes} ${a}`;
}