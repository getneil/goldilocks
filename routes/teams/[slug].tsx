import { PageProps } from "$fresh/server.ts";

import TeamEditor from "../../islands/TeamEditor.tsx";

export default function Team(props: PageProps) {
    return (
        <div class="flex flex-col">
            <TeamEditor/>
        </div>
    );
}
