import { useParams } from "react-router-dom";
import FacilityTemplate from "~/components/templates/facility-template";
import EventTemplate from "~/components/templates/event-template";
import { games } from "@/lib/data";

export default function FacilityPage() {
	return <FacilityTemplate />;
}
