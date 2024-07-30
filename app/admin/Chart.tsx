'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
	views: {
		label: 'Sign ups',
	},
	users: {
		label: 'Users',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function Chart({
	chartData,
}: {
	chartData: {
		date: string;
		users: number;
	}[];
}) {
	const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('users');
	console.log(chartData);
	if (!chartData) {
		return null;
	}

	return (
		<Card className="w-full">
			<CardContent className="px-2 sm:p-6 w-full">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="views"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										});
									}}
								/>
							}
						/>
						<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
