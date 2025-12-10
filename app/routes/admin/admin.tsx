import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function admin() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/admin/dashboard");
	});
	return <div>admin</div>;
}
