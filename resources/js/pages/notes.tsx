import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
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
}

interface Props {
	notes: NoteInterface[];
}

function Notes({ notes }: Props) {
	const { auth } = usePage().props;
	const user = auth.user;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Notes" />
			<h1>Notities van {user.name}</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"></div>
			</div>
			{notes.map((note) => (
				<li key={note.id}>{note.title}</li>
			))}
		</AppLayout>
	);
}

export default Notes;
