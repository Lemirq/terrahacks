import { Tables } from '@/database.types';
import React from 'react';
import Chart, { Props } from 'react-apexcharts';

const SignupsChart = ({ users }: { users: Tables<'users'>[] }) => {
	// transfrom data
	// console.log(users);

	// users is an array of objects
	//EXAMPLE: {
	//   id: 209,
	//   name: 'Muhammad Rayan',
	//   email: 'rayankhanyt@gmail.com',
	//   created_at: '2024-07-30T21:03:20.3116+00:00'
	// },
	// Group by day and count

	let newUsers = users.reduce((acc: any, user: any) => {
		const date = new Date(user.created_at).toDateString();
		if (acc[date]) {
			acc[date] += 1;
		} else {
			acc[date] = 1;
		}
		return acc;
	}, {});
	newUsers = Object.keys(newUsers)
		.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
		.reduce((acc: any, key: string) => {
			acc[key] = newUsers[key];
			return acc;
		}, {});

	// console.log(newUsers);
	const series: Props['series'] = [
		{
			name: 'New Users',
			data: Object.values(newUsers).map((value) => value.toString()),
		},
	];
	const options: Props['options'] = {
		chart: {
			fontFamily: 'inherit',
			zoom: {
				enabled: true,
			},
			foreColor: '#fff',
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},

		dataLabels: {
			enabled: false,
		},
		title: {
			text: 'Totals Signups by Day',
			align: 'left',
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: Object.keys(newUsers),
		},
		yaxis: {
			title: {
				text: 'Users',
			},
		},
		grid: {
			borderColor: '#535A6C',
			xaxis: {
				lines: {
					show: true,
				},
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			enabled: true,
			theme: 'dark',
		},
	};

	return (
		<>
			<div className="w-full z-10 bg-neutral-800 rounded-md p-3">
				<div id="chart">
					<Chart options={options} series={series} type="bar" height={425} />
				</div>
			</div>
		</>
	);
};

export default SignupsChart;
