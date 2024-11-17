import StyledTitle from "../ui/components/typography/StyledTitle";

export default function FriendsPage() {
  return (
    <section className="mt-lg">
      <StyledTitle variant="h1" extraClasses="text-center">
        My Friends
      </StyledTitle>
      <div className="grid w-[715px] grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex justify-center">Pepe busca Amigos</div>
        <div className="flex justify-center">Pepe Amigos</div>
      </div>
    </section>
  );
}
