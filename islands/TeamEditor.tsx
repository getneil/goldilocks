import SelectTimezone from "./SelectTimezone.tsx";
import Week from "../components/Week.tsx";

export default function TeamEditor() {
    return (
        <div class="flex flex-col">
            <div>
                <SelectTimezone onSelect={(tz) => {
                    console.log(tz)
                }}/>
            </div>
            <Week onChange={(timeBlocks: string[]) => {
                console.log(timeBlocks)
            }}/>
        </div>
    );
}