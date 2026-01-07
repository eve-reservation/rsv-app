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
import { useAuth } from "~/hooks/use-auth";

interface SignupModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode?: "signup" | "login";
	onModeChange?: (mode: "signup" | "login") => void;
}

export function SignupModal({
	open,
	onOpenChange,
	mode: externalMode = "signup",
	onModeChange,
}: SignupModalProps) {
	// If onModeChange is provided, we assume controlled mode.
	// If not, we could fall back to local state, but for this refactor
	// we want to rely on the parent (Header) handling the logic via URL.
	// However, for safety/hybrid use, we can use the prop directly if passed.

	const mode = externalMode;

	const handleModeSwitch = () => {
		const newMode = mode === "signup" ? "login" : "signup";
		if (onModeChange) {
			onModeChange(newMode);
		}
	};

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");

	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			if (mode === "login") {
				await login(email, password);
				onOpenChange(false);
			} else {
				// Handle signup logic here later
			}
		} catch (err: any) {
			setError(err.message || "Authentication failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
				<DialogHeader className="px-6 py-2 border-b">
					<DialogTitle className="text-lg font-semibold text-center">
						{mode === "signup" ? "Sign up" : "Log in"}
					</DialogTitle>
				</DialogHeader>
				<div className="px-6 space-y-4">
					<form className="space-y-4" onSubmit={handleSubmit}>
						{mode === "signup" && (
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
						)}
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
						{mode === "signup" && (
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
						)}
						{mode === "signup" && (
							<p className="text-xs text-muted-foreground">
								To sign up, you need to be at least 18. Your birthday won’t be
								shared with other people who use QC Sports.
							</p>
						)}
						{error && (
							<div className="text-sm text-destructive text-center">{error}</div>
						)}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Loading..." : mode === "signup" ? "Continue" : "Log in"}
						</Button>
					</form>
				</div>
				<DialogFooter className="px-6 py-4">
					<p className="text-xs text-muted-foreground text-center w-full">
						{mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
						<span className="text-primary cursor-pointer" onClick={handleModeSwitch}>
							{mode === "signup" ? "Log in" : "Sign up"}
						</span>
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
