import { useParams } from "react-router-dom";
import FacilityTemplate from "~/components/templates/facility-template";
import EventTemplate from "~/components/templates/event-template";
import { games } from "@/lib/data";

export default function FacilityPage() {
	const { id } = useParams();
	const isGame = games.some((g) => g.id === id);

	if (isGame) {
		return <EventTemplate />;
	}

	return <FacilityTemplate />;
}
