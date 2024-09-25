import ActualGamePage from "../_components/ActualGamePage";

export default function DynamicGamePage({
  params,
}: {
  params: { id: string };
}) {
  return <ActualGamePage id={params.id} />;
}
