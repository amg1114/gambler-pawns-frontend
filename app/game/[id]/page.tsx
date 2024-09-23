import GamePage from "app/game/page";

export default function DynamicGamePage({
    params,
}: {
    params: { id: string };
}) {
    return <GamePage id={params.id} />;
}
