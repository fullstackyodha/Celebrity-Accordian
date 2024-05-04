import { ReactNode } from "react";

type PropInterface = {
	text: ReactNode;
	disabled: boolean;
	className: string;
	type: "button" | "submit" | "reset";
	onClick: () => void;
};

const Button = (props: PropInterface) => {
	const { text, disabled, type, className, onClick } =
		props;
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				disabled={disabled}
				className={className}>
				{text}
			</button>
		</>
	);
};

export default Button;
