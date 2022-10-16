import { Head } from "$fresh/runtime.ts";
import CreateTeamForm from "../islands/CreateTeamForm.tsx";
import { Team } from "../types.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <CreateTeamForm/>
      </div>
    </>
  );
}
