import ProfileTemplate from "~/components/templates/profile-template";
import { useAuth } from "~/hooks/use-auth";

export default function Profile() {
	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
	};
	return <ProfileTemplate handleLogout={handleLogout} />;
}
