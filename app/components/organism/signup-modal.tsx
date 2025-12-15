import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInput from "../ui/floating-input";
import { useState } from "react";

interface SignupModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SignupModal({ open, onOpenChange }: SignupModalProps) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
				<DialogHeader className="px-6 pt-6 pb-4">
					<DialogTitle className="text-2xl font-bold text-center">Sign up</DialogTitle>
				</DialogHeader>
				<div className="px-6 space-y-4">
					<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<FloatingInput
									id="first-name"
									label="First name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="mt-1"
								/>
							</div>
							<div>
								<FloatingInput
									id="last-name"
									label="Last name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="mt-1"
								/>
							</div>
						</div>
						<div>
							<FloatingInput
								id="email"
								type="email"
								label="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1"
							/>
						</div>
						<div>
							<FloatingInput
								id="password"
								type="password"
								label="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1"
							/>
						</div>
						<div>
							<FloatingInput
								id="birthday"
								type="date"
								label="Birthday"
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
								className="mt-1"
							/>
						</div>
						<p className="text-xs text-muted-foreground">
							To sign up, you need to be at least 18. Your birthday won’t be shared
							with other people who use QC Sports.
						</p>
						<Button type="submit" className="w-full">
							Continue
						</Button>
					</form>
				</div>
				<DialogFooter className="px-6 py-4 bg-muted/50">
					<p className="text-sm text-muted-foreground text-center w-full">
						Already have an account?{" "}
						<span className="text-primary cursor-pointer">Log in</span>
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
