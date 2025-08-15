import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { OptionType } from 'src/constants/articleProps';

const meta: Meta<typeof Select> = {
	title: 'UI/Select',
	component: Select,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: OptionType[] = [
	{ title: 'Option 1', value: 'option1', className: 'option1' },
	{ title: 'Option 2', value: 'option2', className: 'option2' },
	{ title: 'Option 3', value: 'option3', className: 'option3' },
];

const SelectWithState = () => {
	const [selected, setSelected] = useState(options[0]);
	return (
		<Select
			selected={selected}
			options={options}
			onChange={setSelected}
			onClose={() => console.log('Select closed')}
			title='Sample Select'
		/>
	);
};

export const InteractiveExample: Story = {
	render: () => <SelectWithState />,
};

export const Default: Story = {
	args: {
		selected: options[0],
		options: options,
		onChange: (option) => console.log('Selected:', option),
		onClose: () => console.log('Closed'),
	},
};

export const WithTitle: Story = {
	args: {
		...Default.args,
		title: 'Font Family',
	},
};
