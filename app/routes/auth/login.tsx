import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "~/hooks/use-auth";
import { useNavigate } from "react-router";
import { PAGE_TITLES } from "~/config/page-titles";
import type { Route } from "./+types/login";
import qcLogo from "@/assets/images/logo/qcSportsLogo.png";

export function meta({}: Route.MetaArgs) {
	return [{ title: PAGE_TITLES.login }];
}

export default function LoginPage() {
	const { login, error } = useAuth();

	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const user = await login(identifier, password);
			if (user) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				navigate("/");
			}
		} catch (err) {
			// Error is handled by the hook, but you can add additional handling here if needed
			console.error("Login failed:", err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
			<div className="w-full max-w-[400px]">
				<Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
					<CardContent className="px-8 py-6">
						{/* Header */}
						<div className="flex flex-col items-center mb-8 space-y-2">
							<div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-2">
								<img
									src={qcLogo}
									alt="QC Sports"
									className="h-8 w-8 object-contain"
								/>
							</div>
							<div className="text-center">
								<h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
									Admin Portal
								</h1>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									Authenticate to access controls
								</p>
							</div>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="identifier"
									className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
									Identity
								</Label>
								<Input
									id="identifier"
									type="text"
									value={identifier}
									onChange={(e) => setIdentifier(e.target.value)}
									className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
									disabled={isLoading}
									placeholder="Username or Email"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
									Credentials
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 pr-10"
										disabled={isLoading}
										placeholder="••••••••"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors disabled:opacity-50"
										disabled={isLoading}>
										{isLoading ? (
											<div className="h-4 w-4" /> // Placeholder or mini loader if needed, but main button has text
										) : showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							{error && (
								<div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-md text-sm text-red-600 dark:text-red-400 font-medium text-center">
									{error}
								</div>
							)}

							<Button
								type="submit"
								className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 h-10 font-medium"
								disabled={isLoading}>
								{isLoading ? "Verifying..." : "Access System"}
							</Button>
						</form>
					</CardContent>
				</Card>
				<div className="mt-6 text-center">
					<p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
						SECURE SYSTEM • QC SPORTS
					</p>
				</div>
			</div>
		</div>
	);
}
