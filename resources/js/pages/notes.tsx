import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Notes',
		href: '/notes',
	},
];

interface NoteInterface {
	id: number;
	user_id: number;
	title: string;
	body: string;
	created_at: string;
}

interface Props {
	notes: NoteInterface[];
}

function Notes({ notes }: Props) {
	const { auth } = usePage().props;
	const user = auth.user;

	const [title, setTitle] = useState('title');
	const [body, setBody] = useState('body');

	const addNote = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			router.post('/notes/make', {
				user_id: user.id,
				title: title,
				body: body,
			});
		} catch (error) {
			console.error(error);
		}

		setTitle('title');
		setBody('body');
	};

	const deleteNote:(id: number) => void = (id: number) => {
		const result:boolean = confirm("Weet u zeker dat u deze note wil verwijderen?");

		if(!result) {
			return;
		}

		try {
			router.delete(`/notes/delete/${id}`);
		} catch (err) {
			console.error(err);
		}
	}

	if (!notes || notes.length < 1) {
		console.log('Geen notes');
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Notes" />
			<div className="grid grid-cols-3">
				<div>
					<h1>Notities van {user.name}</h1>
				</div>
				<div>{/*Deze is hier puur als filler*/}</div>
				<div className="mr-2 flex justify-end">
					{/*TODO: laat dit werken, een ker*/}
					{/*<DropdownMenu>*/}
					{/*	<DropdownMenuTrigger asChild>*/}
					{/*		<button>Sorteren op:</button>*/}
					{/*	</DropdownMenuTrigger>*/}

					{/*	<DropdownMenuContent>*/}
					{/*		<DropdownMenuItem>*/}
					{/*			Nieuwste eerst*/}
					{/*		</DropdownMenuItem>*/}

					{/*		<DropdownMenuItem>*/}
					{/*			Oudste eerst*/}
					{/*		</DropdownMenuItem>*/}
					{/*	</DropdownMenuContent>*/}
					{/*</DropdownMenu>*/}
				</div>
			</div>

			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="NoteBlockDivClass">
					<h1 className="mb-2 rounded-2xl bg-indigo-500">
						Nieuwe notitie
					</h1>
					<div className="flex flex-col gap-4 text-black">
						<input
							type="text"
							className="bg-indigo-500"
							maxLength={255}
							required={true}
							value={title}
							onChange={(e): void => {
								setTitle(e.currentTarget.value);
							}}
						/>
						<textarea
							className="resize-none bg-indigo-500"
							maxLength={512}
							required={true}
							value={body}
							onChange={(e): void => {
								setBody(e.currentTarget.value);
							}}
						/>

						<button className="btn btn-primary" onClick={addNote}>
							Voeg notitie toe
						</button>
					</div>
				</div>
				<div className="NoteBlockDivClass">
					<h1 className="text-xl font-bold">Preview</h1>
					<h1 className="m-2 font-semibold">Titel: {title}</h1>
					<p className="m-2">Body: {body}</p>
				</div>
				{notes.map((note) => (
					<div className="NoteBlockDivClass" key={note.id}>
						<h1 className="m-2 font-bold">Titel: {note.title}</h1>
						<p className="m-2">Body: {note.body}</p>
						<p>Gemaakt om: {moment(note.created_at).fromNow()}</p>
						<div className="flex gap-2">
							<button
								className="btn btn-error"
								onClick={() => {
									deleteNote(note.id);
								}}
							>
								Verwijder
							</button>
						</div>
					</div>
				))}
			</div>
		</AppLayout>
	);
}

export default Notes;
