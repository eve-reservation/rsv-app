import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FloatingInputProps {
	id: string;
	label: string;
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	readOnly?: boolean;
	defaultValue?: string;
	error?: boolean;
	disabled?: boolean;
}

export default function FloatingInput({
	id,
	label,
	type = "text",
	placeholder = "",
	value,
	onChange,
	className = "",
	readOnly = false,
	defaultValue,
	error = false,
	disabled,
}: FloatingInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(!!value || !!defaultValue);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		setIsFilled(!!e.target.value);
	};

	useEffect(() => {
		setIsFilled(!!value);
	}, [value]);

	const isActive = isFocused || isFilled;

	const borderClass = error
		? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200"
		: "border-gray-300 focus-visible:border-primary";

	return (
		<div className="relative">
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`h-11 peer ${className} border-1 ${borderClass} bg-gray-100 ${type === "date" && !isFilled ? "[&::-webkit-datetime-edit-fields-wrapper]:opacity-0 [&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-month-field]:opacity-0 [&::-webkit-datetime-edit-day-field]:opacity-0 [&::-webkit-datetime-edit-year-field]:opacity-0 focus:[&::-webkit-datetime-edit-fields-wrapper]:opacity-100 focus:[&::-webkit-datetime-edit-text]:opacity-100 focus:[&::-webkit-datetime-edit-month-field]:opacity-100 focus:[&::-webkit-datetime-edit-day-field]:opacity-100 focus:[&::-webkit-datetime-edit-year-field]:opacity-100" : ""}`}
				readOnly={readOnly}
				defaultValue={defaultValue}
				disabled={disabled}
			/>
			<Label
				htmlFor={id}
				className={`font-normal absolute left-3 px-1 text-sm transition-all text-gray-600 duration-200 bg-gray-100 ${
					isActive ? "-top-1.5 text-xs" : "top-1/2 -translate-y-1/2 "
				} ${error ? "text-red-500" : ""} ${isFocused ? "text-primary" : ""}`}>
				{label}
			</Label>
		</div>
	);
}
