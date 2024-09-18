'use client';
import React, { useEffect, useMemo, useState } from 'react';
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
	Pagination,
	Checkbox,
} from '@nextui-org/react';
import countries from '@/data/countries.json';
import { columns } from './data';
import { Database, Tables } from '@/database.types';
import { useRouter } from 'next/navigation';
import { IoChevronDown, IoRefresh, IoSearch } from 'react-icons/io5';
import { createClient } from '@/utils/supabase/client';
import { User as sUser } from '@supabase/supabase-js';

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

export default function AllApps({ applications }: { applications: Tables<'applications'>[] }) {
	const router = useRouter();
	const [filterValue, setFilterValue] = React.useState('');
	const [page, setPage] = React.useState(1);
	const [reversed, setReversed] = React.useState(false);
	const rowsPerPage = 10;

	const pages = Math.ceil(applications.length / rowsPerPage);

	const supabase = createClient();
	const getUser = async (app: Database['public']['Tables']['applications']['Row']) => {
		if (!app.reviewedBy) {
			return null;
		}
		const { data: user, error } = await supabase.from('users').select('*').eq('uid', app.reviewedBy).single();
		if (error) {
			console.error(error);
			return null;
		}
		return user;
	};

	const renderCell = React.useCallback(
		async (
			app: Database['public']['Tables']['applications']['Row'],
			columnKey: 'name' | 'level_of_study' | 'status' | 'country' | 'review' | 'created_at'
		) => {
			let reviewByUser: Database['public']['Tables']['users']['Row'] | null = null;
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
							{reviewByUser ? (
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
					return (
						<p>
							{new Date(app.created_at).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</p>
					);
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
	const onSearchChange = React.useCallback((value: string) => {
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
		let filteredApplications: Tables<'applications'>[] = [...applications];

		if (hasSearchFilter) {
			filteredApplications = filteredApplications.filter(
				(user) => user.first_name && user.first_name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredApplications = filteredApplications.filter((user) => Array.from(statusFilter).includes(user.status));
		}
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		if (reversed) return filteredApplications.reverse().slice(start, end);
		return filteredApplications.slice(start, end);
	}, [applications, filterValue, statusFilter, page, reversed]);

	return (
		<div className="w-full fc gap-3">
			<div className="flex gap-3 items-end w-full">
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
					<Checkbox isSelected={reversed} onValueChange={setReversed}>
						Oldest first
					</Checkbox>
					<Button isIconOnly onClick={() => router.refresh()}>
						<IoRefresh />
					</Button>
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
								<DropdownItem key={status.uid}>{status.name}</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
			<Table
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => setPage(page)} />
					</div>
				}
				onRowAction={(key) => router.push(`/admin/applications/${key}`)}
				aria-label="Applications table"
			>
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
							{(columnKey) => <TableCell>{renderCell(item, columnKey as keyof typeof columns)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
