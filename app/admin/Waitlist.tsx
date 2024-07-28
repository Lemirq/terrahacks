'use client';
import { getWaitlist } from '@/utils/supabase/actions';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Chart } from './Chart';

const Waitlist = ({ waitlist }) => {
	console.log(waitlist);
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	};

	const formatDateLong = (dateString) => {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	};

	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		if (waitlist && waitlist.length > 0) {
			const formattedData = waitlist.reduce((acc, item) => {
				const date = new Date(item.created_at).toISOString().split('T')[0];
				if (!acc[date]) {
					acc[date] = 0;
				}
				acc[date]++;
				return acc;
			}, {});

			const chartData = Object.keys(formattedData).map((date) => ({
				date,
				users: formattedData[date],
			}));

			setChartData(chartData);
		}
	}, [waitlist]);

	return (
		<div className="w-full sm:px-10 px-5 fc gap-10">
			<h1 className="text-4xl text-center">Waitlist</h1>
			{waitlist.length > 0 && (
				<Table>
					<TableHeader>
						<TableColumn>ID</TableColumn>
						<TableColumn>NAME</TableColumn>
						<TableColumn>EMAIL</TableColumn>
						<TableColumn>CREATED_AT</TableColumn>
					</TableHeader>
					<TableBody>
						{waitlist.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{formatDate(item.created_at)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{/* turn waitlist data into */}
			<Chart chartData={chartData} />
		</div>
	);
};

export default Waitlist;
