type PropInterface = {
	value: string;
	className: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
};

const Dropdown = (props: PropInterface) => {
	const { value, onChange, className } = props;

	return (
		<>
			<select
				value={value}
				title="gender"
				name="gender"
				onChange={onChange}
				className={className}>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="transgender">Transgender</option>
				<option value="rather not say">
					Rather Not Say
				</option>
				<option value="others">Others</option>
			</select>
		</>
	);
};

export default Dropdown;
