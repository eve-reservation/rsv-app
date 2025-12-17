import { useParams } from "react-router-dom";
import FacilityTemplate from "~/components/templates/facility-template";
import GameTemplate from "~/components/templates/game-template";
import { games } from "@/lib/data";

export default function FacilityPage() {
	const { id } = useParams();
	const isGame = games.some((g) => g.id === id);

	if (isGame) {
		return <GameTemplate />;
	}

	return <FacilityTemplate />;
}
