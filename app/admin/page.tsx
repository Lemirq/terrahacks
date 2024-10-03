import Dashboard from './Dashboard';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import countriesa from '@/data/countries.json';
const Home = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error || !data) {
		redirect('/login');
	}

	// fetch insights for the dashboard
	const insights = [];

	// fetch total users
	const users = await supabase.from('users').select('*');

	// fetch all applications
	const applications = await supabase.from('applications').select('*');

	if (applications.error || users.error) {
		console.error(applications.error || users.error);
		return <div>Something went wrong</div>;
	}

	const acceptedApplications = applications.data.filter((application) => application.status === 'accepted');
	const rejectedApplications = applications.data.filter((application) => application.status === 'rejected');

	const incompleteApplications = applications.data.filter((application) => !application.complete);
	const pendingApplications = applications.data.filter(
		(application) => (application.complete && application.status === 'not_started') || application.status === 'in_progress'
	);

	if (users && applications) {
		insights.push({
			title: 'Total Users',
			value: users.data.length,
		});

		insights.push({
			title: 'Total Applications',
			value: applications.data.length,
		});
		insights.push({
			title: 'Signups vs Applications',
			value: `${((applications.data.length / users.data.length) * 100).toFixed(2)}%`,
		});
		const countries = applications.data.map((app) => app.country);
		const uniqueCountries = [...new Set(countries)];
		insights.push({
			title: 'Countries',
			value: uniqueCountries.length,
		});

		insights.push({
			title: 'Incomplete Applications',
			value: `${incompleteApplications.length} | ${((incompleteApplications.length / applications.data.length) * 100).toFixed(0)}%`,
		});

		insights.push({
			title: 'Complete Applications',
			value: `${applications.data.length - incompleteApplications.length} | ${(
				((applications.data.length - incompleteApplications.length) / applications.data.length) *
				100
			).toFixed(0)}%`,
		});

		// percentage of signups vs applications

		insights.push({
			title: 'Accepted Applications',
			value: acceptedApplications.length,
		});

		insights.push({
			title: 'Remaining Applications',
			value: pendingApplications.length,
		});

		//   insight about how many countries are on apps
	}

	const { data: referrals, error: referralError } = await supabase.from('referrals').select('*');
	// referrals contains uid
	if (referralError || !referrals) {
		console.error(referralError);
		return <div>Something went wrong</div>;
	}

	const uids = referrals.map((referral) => referral.user_id);
	console.log(uids);
	const { data: referredUsers, error: referredUsersError } = await supabase.from('users').select('*');
	console.log(referredUsers);
	// console.log(referredUsersError);

	if (referredUsersError || !referredUsers) {
		console.error(referredUsersError);
		return <div>Something went wrong</div>;
	}

	// create user ranking for used referrals
	// const userRanking = referredUsers
	// 	.map((user) => {
	// 		const ref = referrals.filter((referral) => referral.user_id === user.uid);
	// 		return {
	// 			name: user.firstName,
	// 			referrals: ref[0].used,
	// 		};
	// 	})
	// 	.sort((a, b) => b.referrals - a.referrals);

	// do similar for applications from countries
	const countries = applications.data.filter((app) => app.complete).map((app) => app.country);
	const uniqueCountries = [...new Set(countries)];

	const countryRanking = uniqueCountries.map((country) => {
		const apps = applications.data.filter((app) => app.country === country);
		// console.log(country);

		return {
			name: country,
			applications: apps.length,
		};
	});

	const sortedCountryRanking = countryRanking.sort((a, b) => b.applications - a.applications);
	// match and replace names with original country names. countries.json is an array of objects [
	// {
	// 	"name": "Afghanistan",
	// 	"dial_code": "+93",
	// 	"emoji": "🇦🇫",
	// 	"code": "AF"
	// },]

	sortedCountryRanking.forEach((country) => {
		const countryName = countriesa.find((c) => c.code === country.name);
		if (countryName) {
			country.name = countryName.name;
		}
	});

	return (
		<Dashboard
			insights={insights}
			users={users.data}
			applications={applications.data}
			// referralRanking={userRanking}
			countryRanking={sortedCountryRanking}
		/>
	);
};
export default Home;
