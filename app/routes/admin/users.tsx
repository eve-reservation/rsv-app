import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	MoreHorizontal,
	Eye,
	UserX,
	UserCheck,
	Shield,
	Mail,
	Phone,
	Download,
	Plus,
	Users,
	UserPlus,
	Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { DataTable, type DataTableColumn } from "@/components/molecule/data-table";
import { Input } from "~/components/ui/input";
import { StatCard } from "~/components/molecule/stat-card";

// Mock Data
const users = [
	{
		id: "USR001",
		name: "Juan Dela Cruz",
		email: "juan@email.com",
		role: "Member",
		status: "Active",
		joinDate: "Jan 15, 2024",
		lastActive: "2 mins ago",
		avatar: "JD",
		phone: "+63 917 123 4567",
	},
	{
		id: "USR002",
		name: "Maria Santos",
		email: "maria@email.com",
		role: "Admin",
		status: "Active",
		joinDate: "Dec 01, 2023",
		lastActive: "1 hour ago",
		avatar: "MS",
		phone: "+63 918 987 6543",
	},
	{
		id: "USR003",
		name: "Carlos Reyes",
		email: "carlos@email.com",
		role: "Member",
		status: "Inactive",
		joinDate: "Feb 20, 2024",
		lastActive: "5 days ago",
		avatar: "CR",
		phone: "+63 920 111 2222",
	},
	{
		id: "USR004",
		name: "Ana Garcia",
		email: "ana@email.com",
		role: "Guest",
		status: "Active",
		joinDate: "Mar 10, 2024",
		lastActive: "Just now",
		avatar: "AG",
		phone: "+63 922 333 4444",
	},
	{
		id: "USR005",
		name: "Pedro Lim",
		email: "pedro@email.com",
		role: "Member",
		status: "Active",
		joinDate: "Jan 05, 2024",
		lastActive: "3 hours ago",
		avatar: "PL",
		phone: "+63 917 555 6666",
	},
	{
		id: "USR006",
		name: "Sofia Diaz",
		email: "sofia@email.com",
		role: "Member",
		status: "Pending",
		joinDate: "Dec 15, 2025",
		lastActive: "1 day ago",
		avatar: "SD",
		phone: "+63 918 777 8888",
	},
	{
		id: "USR007",
		name: "Miguel Torres",
		email: "miguel@email.com",
		role: "Guest",
		status: "Active",
		joinDate: "Feb 14, 2024",
		lastActive: "10 mins ago",
		avatar: "MT",
		phone: "+63 919 999 0000",
	},
];

const statusStyles = {
	Active: "bg-green-100 text-green-800",
	Inactive: "bg-gray-100 text-gray-800",
	Pending: "bg-yellow-100 text-yellow-800",
	Banned: "bg-red-100 text-red-800",
};

const roleStyles = {
	Admin: "bg-purple-100 text-purple-800",
	Member: "bg-blue-100 text-blue-800",
	Guest: "bg-slate-100 text-slate-800",
};

export default function UsersPage() {
	const navigate = useNavigate();
	const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null);

	const columns: DataTableColumn<(typeof users)[0]>[] = [
		{
			key: "id",
			label: "User ID",
			sortable: true,
			searchable: true,
			render: (val) => (
				<span className="font-medium text-sm text-muted-foreground">{val}</span>
			),
		},
		{
			key: "name",
			label: "User",
			sortable: true,
			searchable: true,
			render: (_, row) => (
				<div className="flex items-center gap-3">
					<Avatar className="h-9 w-9">
						<AvatarImage src={`/.jpg?height=36&width=36&query=${row.name}`} />
						<AvatarFallback>{row.avatar}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="text-sm font-medium">{row.name}</span>
						<span className="text-xs text-muted-foreground">{row.email}</span>
					</div>
				</div>
			),
		},
		{
			key: "role",
			label: "Role",
			filterable: true,
			filterOptions: [
				{ label: "Admin", value: "Admin" },
				{ label: "Member", value: "Member" },
				{ label: "Guest", value: "Guest" },
			],
			render: (val) => (
				<Badge variant="secondary" className={roleStyles[val as keyof typeof roleStyles]}>
					{val}
				</Badge>
			),
		},
		{
			key: "status",
			label: "Status",
			filterable: true,
			filterOptions: [
				{ label: "Active", value: "Active" },
				{ label: "Inactive", value: "Inactive" },
				{ label: "Pending", value: "Pending" },
			],
			render: (val) => (
				<Badge
					variant="secondary"
					className={statusStyles[val as keyof typeof statusStyles]}>
					{val}
				</Badge>
			),
		},
		{
			key: "joinDate",
			label: "Joined",
			sortable: true,
			render: (val) => <span className="text-sm text-muted-foreground">{val}</span>,
		},
		{
			key: "lastActive",
			label: "Last Active",
			sortable: true,
			render: (val) => <span className="text-sm">{val}</span>,
		},
		{
			key: "id", // Reused for actions
			label: "Actions",
			render: (_, user) => (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setSelectedUser(user)}>
								<Eye className="mr-2 h-4 w-4" />
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Mail className="mr-2 h-4 w-4" />
								Email User
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							{user.status === "Active" ? (
								<DropdownMenuItem className="text-red-600">
									<UserX className="mr-2 h-4 w-4" />
									Deactivate
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem className="text-green-600">
									<UserCheck className="mr-2 h-4 w-4" />
									Activate
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-foreground">User Management</h1>
					<p className="text-muted-foreground">Manage users, roles, and permissions</p>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total Users"
					value="2,834"
					change="+12%"
					changeType="positive"
					icon={Users}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="Active Members"
					value="1,240"
					change="+5%"
					changeType="positive"
					icon={UserCheck}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="New This Month"
					value="156"
					change="+18%"
					changeType="positive"
					icon={UserPlus}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
				<StatCard
					title="Pending Verifications"
					value="23"
					change="-2"
					changeType="positive"
					icon={Clock}
					className="bg-gradient-to-br from-primary/30 via-white to-white"
				/>
			</div>

			<Card>
				<CardHeader className="!py-0">
					<div className="flex items-center justify-between">
						<div>
							<Input type="text" placeholder="Search users..." />
						</div>
						<div className="flex gap-2">
							<Button variant="outline">
								<Download className="mr-2 h-4 w-4" />
								Export
							</Button>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add User
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={users} />
				</CardContent>
			</Card>

			<Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>User Details</DialogTitle>
						<DialogDescription>Information for {selectedUser?.name}</DialogDescription>
					</DialogHeader>
					{selectedUser && (
						<div className="space-y-6">
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16">
									<AvatarImage
										src={`/.jpg?height=64&width=64&query=${selectedUser.name}`}
									/>
									<AvatarFallback>{selectedUser.avatar}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-lg font-semibold">{selectedUser.name}</h3>
									<p className="text-sm text-muted-foreground">
										{selectedUser.email}
									</p>
									<div className="flex gap-2 mt-1">
										<Badge
											variant="secondary"
											className={
												roleStyles[
													selectedUser.role as keyof typeof roleStyles
												]
											}>
											{selectedUser.role}
										</Badge>
										<Badge
											variant="secondary"
											className={
												statusStyles[
													selectedUser.status as keyof typeof statusStyles
												]
											}>
											{selectedUser.status}
										</Badge>
									</div>
								</div>
							</div>

							<div className="grid gap-4 border p-4 rounded-lg">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<p className="text-muted-foreground">User ID</p>
										<p className="font-medium">{selectedUser.id}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Phone</p>
										<p className="font-medium">{selectedUser.phone}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Joined Date</p>
										<p className="font-medium">{selectedUser.joinDate}</p>
									</div>
									<div>
										<p className="text-muted-foreground">Last Active</p>
										<p className="font-medium">{selectedUser.lastActive}</p>
									</div>
								</div>
							</div>

							<div className="flex justify-end gap-2">
								<Button variant="outline" onClick={() => setSelectedUser(null)}>
									Close
								</Button>
								<Button variant="default">Edit Profile</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
