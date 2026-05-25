import { useParams } from "react-router";
import EventTemplate from "~/components/templates/event-template";

export default function event() {
	const { id } = useParams();

	return <EventTemplate />;
}
