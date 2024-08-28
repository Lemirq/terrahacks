'use client';
import React, { useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
} from '@nextui-org/react';
import countries from '@/data/countries.json';
import { columns } from './data';
import { Database, Tables } from '@/database.types';
import { useRouter } from 'next/navigation';
import { IoChevronDown, IoRefresh, IoSearch } from 'react-icons/io5';
import { createClient } from '@/utils/supabase/client';
import { User as Suser } from '@/node_modules/@supabase/auth-js/src/lib/types';
const statusColorMap = {
	accepted: 'success',
	rejected: 'danger',
	in_progress: 'warning',
	not_started: 'default',
};

const statusLabelMap = {
	accepted: 'Accepted',
	rejected: 'Rejected',
	in_progress: 'In Progress',
	not_started: 'Not Started',
};

export default function AllApps({ applications }: { applications: Tables<'applications'> }) {
	const router = useRouter();
	const [filterValue, setFilterValue] = React.useState('');
	const [page, setPage] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [reviewByUser, setReviewByUser] = useState<Suser | null>(null);

	const supabase = createClient();
	const getUser = async (app: Database['public']['Tables']['applications']['Row']) => {
		if (!app) {
			return;
		}
		const { data: user, error } = await supabase.from('users').select('*').eq('uid', app.reviewedBy).single();
		if (error) {
			return error;
		}
		return user as Database['public']['Tables']['users']['Row'];
	};

	const renderCell = React.useCallback(
		async (app: Database['public']['Tables']['applications']['Row'], columnKey: 'name' | 'level_of_study' | 'status' | 'country' | 'review' | 'created_at') => {
			let reviewByUser: Database['public']['Tables']['users']['Row'] = null;
			if (app.reviewedBy) {
				reviewByUser = await getUser(app);
			}
			switch (columnKey) {
				case 'name':
					return (
						// <User description={app.email} name={`${app.first_name} ${app.last_name}`}>
						// 	{app.email}
						// </User>
						<div className="fc items-start w-full gap-2">
							<p className="text-bold text-lg">{`${app.first_name} ${app.last_name}`}</p>
							<p className="text-sm text-neutral-300/50">{app.email}</p>
						</div>
					);
				case 'level_of_study':
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">{app.level_of_study}</p>
						</div>
					);
				case 'status':
					return (
						<Chip
							className="capitalize"
							color={statusColorMap[app.status] as 'success' | 'danger' | 'warning' | 'default' | 'primary' | 'secondary' | undefined}
							size="sm"
							variant="flat"
						>
							{statusLabelMap[app.status]}
						</Chip>
					);
				case 'review':
					return (
						<p>
							{app.reviewedBy ? (
								<User description={reviewByUser.email} name={reviewByUser.firstName + ' ' + reviewByUser.lastName} />
							) : (
								'Not reviewed yet'
							)}
						</p>
					);
				case 'country':
					return <p>{`${countries.find((c) => c.code === app.country)?.emoji} ${countries.find((c) => c.code === app.country)?.name}`}</p>;
				case 'created_at':
					// format so that August 1, 2021
					return <p>{new Date(app.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>;
				default:
					return null;
			}
		},
		[]
	);
	const onClear = React.useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);
	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);
	const [statusFilter, setStatusFilter] = React.useState('all');
	const statusOptions = [
		{ name: 'Accepted', uid: 'accepted' },
		{ name: 'Rejected', uid: 'rejected' },
		{ name: 'In Progress', uid: 'in_progress' },
		{ name: 'Not Started', uid: 'not_started' },
	];
	const hasSearchFilter = Boolean(filterValue);

	const filteredItems = React.useMemo(() => {
		let filteredApplications = [...applications];

		if (hasSearchFilter) {
			filteredApplications = filteredApplications.filter((user) => user.first_name.toLowerCase().includes(filterValue.toLowerCase()));
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredApplications = filteredApplications.filter((user) => Array.from(statusFilter).includes(user.status));
		}

		return filteredApplications;
	}, [applications, filterValue, statusFilter]);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	return (
		<div className="w-full fc gap-3">
			<div className="flex justify-between gap-3 items-end w-full">
				<Input
					isClearable
					className="w-full sm:max-w-[44%]"
					placeholder="Search by name..."
					startContent={<IoSearch />}
					value={filterValue}
					onClear={() => onClear()}
					onValueChange={onSearchChange}
				/>
				<div className="flex gap-3">
					<Dropdown>
						<DropdownTrigger className="hidden sm:flex">
							<Button endContent={<IoChevronDown className="text-sm" />} variant="flat">
								Status
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label="Table Columns"
							closeOnSelect={false}
							selectedKeys={statusFilter}
							selectionMode="multiple"
							onSelectionChange={setStatusFilter}
						>
							{statusOptions.map((status) => (
								<DropdownItem key={status.uid} className="capitalize">
									{status.name.toUpperCase()}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
			<Table onRowAction={(key) => router.push(`/admin/applications/${key}`)} aria-label="Applications table">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align={column.uid === 'review' ? 'center' : 'start'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={filteredItems}>
					{(item: Database['public']['Tables']['applications']['Row']) => (
						<TableRow className="hover:bg-neutral-700 cursor-pointer transition-colors" key={item.user_id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
