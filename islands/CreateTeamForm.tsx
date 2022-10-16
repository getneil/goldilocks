import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import type { Team } from "../types.ts";
import { getTeam, createTeam } from "../libs/firestore.ts";
// import { JSXInternal } from "https://esm.sh/v96/preact@10.11.0/src/jsx.d.ts";


export default function CreateTeamForm() {
	const [name, setName] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const onSubmit = async (e: any) => {
		e.preventDefault();
		if (isLoading) return;

		try {
			setIsLoading(true);
			const uniqueSlug = getSlug(name);
			if (uniqueSlug) {
				const teamExists = await getTeam(uniqueSlug);
				if (teamExists) {
					throw new Error(`A team named "${name}" already exists. Create a different one.`)
				} else {
					await createTeam(name, uniqueSlug);
					window.location.href = `/teams/${uniqueSlug}`;
				}
			}
		} catch (error) {
			setMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

  return (
		<form onSubmit={onSubmit}>
			<div class="flex flex-col gap-2 w-96">
				<h3>Create Team</h3>
				<input
					name="name"
					type="text"
					value={name}
					class="px-4 w-full border-black bg-white border(gray-100 2) h-12 rounded"
					maxLength={30}
					onInput={(e) => {
						setName(e?.currentTarget?.value! || '');
					}}
				/>
				<p>{message}</p>
				<Button type="submit" loading={isLoading}>CREATE TEAM</Button>
			</div>
		</form>
  );
}

const getSlug = (name: string) : string => {
	const slug = name.trim().replaceAll(/[^a-zA-Z0-9/n]/g, "_");
	return slug;
}