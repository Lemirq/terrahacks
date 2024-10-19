import React from 'react';

const JudgingRubric = () => {
	return (
		<section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5 overflow-hidden">
			<h3 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium ">Judging Rubric</h3>
			<p className="mb-5">
				Judges will evaluate projects based on the following criteria. Each category will be scored out of 25 points, for a total of 100
				points.
			</p>
			{/* make a simple table */}
			<div className="overflow-x-auto w-full">
				<table border={1} cellPadding={10} className="max-w-full w-full">
					<thead>
						<tr>
							<th>Category</th>
							<th>21-25 points</th>
							<th>16-20 points</th>
							<th>11-15 points</th>
							<th>6-10 points</th>
							<th>0-5 points</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="font-bold">Impact and Relevance</td>
							<td>Addresses a significant global issue with a clear, feasible, and impactful solution.</td>
							<td>
								Addresses an important issue but needs further development for full impact. Solution shows potential but may need
								adaptation.
							</td>
							<td>Addresses a minor or poorly defined issue. Solution might not make a significant impact.</td>
							<td>Project is impractical or lacks a clear path to real-world implementation.</td>
							<td>Solution is largely: derivative, with little to no innovation or original thought.</td>
						</tr>
						<tr>
							<td className="font-bold">Technical Execution</td>
							<td>Demonstrates advanced technical skills, fully functional with excellent performance.</td>
							<td>
								Uses a solid technical foundation, mostly functional with minor issues, solid implementation but could be improved.
							</td>
							<td>Technically simple, basic functionality, lacks clarity or efficiency in implementation.</td>
							<td>Has significant functional issues, incomplete features, poor implementation.</td>
							<td>Does not function or is poorly executed.</td>
						</tr>
						<tr>
							<td className="font-bold">Design and Usability</td>
							<td>Outstanding user experience, highly intuitive interface, visually appealing with professional aesthetics.</td>
							<td>Good user experience, functional design but could be more intuitive, some polish needed.</td>
							<td>Poor user experience, confusing interface, visually unappealing design.</td>
							<td>Poor design that detracts from effectiveness.</td>
							<td>Unappealing project with little consideration for user needs.</td>
						</tr>
						<tr>
							<td className="font-bold">Presentation and Communication</td>
							<td>Exceptionally clear, well-organized, and highly engaging presentation.</td>
							<td>Generally clear presentation, somewhat engaging but not particularly memorable.</td>
							<td>Unclear or disorganized presentation, making it difficult to understand.</td>
							<td>Fails to engage, disorganized presentation.</td>
							<td>Unclear, unengaging, and disorganized presentation.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default JudgingRubric;
