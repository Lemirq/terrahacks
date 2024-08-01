export const AttendedHackathons = [
	{
		label: '0',
		value: '0',
	},
	{
		label: '1',
		value: '1',
	},
	{
		label: '2',
		value: '2',
	},
	{
		label: '3',
		value: '3',
	},
	{
		label: '4',
		value: '4',
	},
	{
		label: '5',
		value: '5',
	},
	{
		label: '6',
		value: '6',
	},
	{
		label: '7',
		value: '7',
	},
	{
		label: '8',
		value: '8',
	},
	{
		label: '9',
		value: '9',
	},
	{
		label: '10+',
		value: '10+',
	},
];

export const confidence: confidenceType[] = [
	{
		label: 'Front-end Development',
		value: 'confidence_front_end_dev',
	},
	{
		label: 'Back-end Development',
		value: 'confidence_back_end_dev',
	},
	{
		label: 'Full-stack Development',
		value: 'confidence_fullstack_dev',
	},
	{
		label: 'Product Management',
		value: 'confidence_product_management',
	},
	{
		label: 'UI/UX Design',
		value: 'confidence_ui_ux_design',
	},
	{
		label: 'Web3/Crypto/Blockchain',
		value: 'confidence_web3_crypto_blockchain',
	},
	{
		label: 'Cybersecurity',
		value: 'confidence_cybersecurity',
	},
	{
		label: 'AI/Machine Learning',
		value: 'confidence_ai_machine_learning',
	},
];

export interface confidenceType {
	label:
		| 'Front-end Development'
		| 'Back-end Development'
		| 'Full-stack Development'
		| 'Product Management'
		| 'UI/UX Design'
		| 'Web3/Crypto/Blockchain'
		| 'Cybersecurity'
		| 'AI/Machine Learning';
	value:
		| 'confidence_front_end_dev'
		| 'confidence_back_end_dev'
		| 'confidence_fullstack_dev'
		| 'confidence_product_management'
		| 'confidence_ui_ux_design'
		| 'confidence_web3_crypto_blockchain'
		| 'confidence_cybersecurity'
		| 'confidence_ai_machine_learning';
}

// Front-end Development, Back-end Development, Full-stack Development, AI, Data Science, UI/UX Design, Cybersecurity, Web3/Crypto/Blockchain, Product Management, Mobile App Development, DevOps, Game Development, Virtual Reality/Augmented Reality, Internet of Things (IoT), Robotics, Cloud Computing, Software Engineering, Quantum Computing, Bioinformatics, FinTech, EdTech, HealthTech
export const interests = [
	{
		label: 'Front-end Development',
		value: 'front_end_development',
	},
	{
		label: 'Back-end Development',
		value: 'back_end_development',
	},
	{
		label: 'Full-stack Development',
		value: 'full_stack_development',
	},
	{
		label: 'AI',
		value: 'ai',
	},
	{
		label: 'Data Science',
		value: 'data_science',
	},
	{
		label: 'UI/UX Design',
		value: 'ui_ux_design',
	},
	{
		label: 'Cybersecurity',
		value: 'cybersecurity',
	},
	{
		label: 'Web3/Crypto/Blockchain',
		value: 'web3_crypto_blockchain',
	},
	{
		label: 'Product Management',
		value: 'product_management',
	},
	{
		label: 'Mobile App Development',
		value: 'mobile_app_development',
	},
	{
		label: 'DevOps',
		value: 'devops',
	},
	{
		label: 'Game Development',
		value: 'game_development',
	},
	{
		label: 'Virtual Reality/Augmented Reality',
		value: 'virtual_reality_augmented_reality',
	},
	{
		label: 'Internet of Things (IoT)',
		value: 'internet_of_things',
	},
	{
		label: 'Robotics',
		value: 'robotics',
	},
	{
		label: 'Cloud Computing',
		value: 'cloud_computing',
	},
	{
		label: 'Software Engineering',
		value: 'software_engineering',
	},
	{
		label: 'Quantum Computing',
		value: 'quantum_computing',
	},
	{
		label: 'Bioinformatics',
		value: 'bioinformatics',
	},
	{
		label: 'FinTech',
		value: 'fintech',
	},
	{
		label: 'EdTech',
		value: 'edtech',
	},
	{
		label: 'HealthTech',
		value: 'healthtech',
	},
];
// genders
// Male, Female, Non-binary, Prefer not to say, Other
export const genders = [
	{
		label: 'Male',
		value: 'Male',
	},
	{
		label: 'Female',
		value: 'Female',
	},
	{
		label: 'Non-binary',
		value: 'Non-binary',
	},
	{
		label: 'Prefer not to say',
		value: 'Prefer not to say',
	},
	{
		label: 'Other',
		value: 'Other',
	},
];
