type PropInterface = {
	type: string;
	disabled: boolean;
	value: string;
	placeholder: string;
	className: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
};

const Input = (props: PropInterface) => {
	const {
		type,
		disabled,
		placeholder,
		value,
		onChange,
		className,
	} = props;
	return (
		<>
			<input
				className={className}
				type={type}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
};

export default Input;
