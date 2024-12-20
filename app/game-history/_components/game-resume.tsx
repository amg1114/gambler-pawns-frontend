import Image from "next/image";
import axios from "@/app/lib/_axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { azeret_mono, nunito } from "@/app/ui/fonts";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import capitalizeFirstLetter from "@/app/lib/utils/capitalizeFirstLetter";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledLink from "@/app/ui/components/typography/StyledLink";

interface Games {
  total: number;
  data: GamesHistory[];
}
interface GamesHistory {
  total: number;
  data: any;
  opponentAvatar: any;
  opponentNickname: string;
  eloBefore: number;
  mode: string;
  gameDate: string;
  gameIdEncrypted: string;
}

type Options = {
  GameMode: string;
  ResultType: string;
  PlayedAs: string;
};

interface GameResumeProps {
  options: Options;
}

export default function GameResume({ options }: GameResumeProps) {
  const { data: session } = useSession();
  const [games, setGames] = useState<Games>({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `/game-history?userId=${session?.data.userId}&page=${currentPage}&limit=${itemsPerPage}`;
        if (options.GameMode !== "All") {
          url += `&mode=${options.GameMode}`;
        }
        if (options.ResultType !== "All") {
          url += `&result=${options.ResultType}`;
        }
        if (options.PlayedAs !== "All") {
          url += `&side=${options.PlayedAs}`;
        }
        const response = await axios.get(url);
        setGames(response.data.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (session) {
      fetchGames();
    }
  }, [
    session,
    options.GameMode,
    options.ResultType,
    options.PlayedAs,
    currentPage,
  ]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(games.total / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full space-y-lg">
      {games.data && games.data.length > 0 ? (
        <div className="space-y-lg">
          {games.data.map((game, index) => (
            <div key={index} className="flex">
              <Image
                src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${game.opponentAvatar}`}
                alt="Profile Icon"
                width={52}
                height={52}
                className="h-14 w-14"
              />
              <ul className="pl-md">
                <li className={`${azeret_mono.className} pb-xs font-bold`}>
                  {game.opponentNickname} ({game.eloBefore})
                </li>
                <li className={`${nunito.className} pb-md font-light`}>
                  {capitalizeFirstLetter(game.mode)} -{" "}
                  {game.gameDate.split("T")[0]}
                </li>
                <StyledLink
                  href={`/game-history/${game.gameIdEncrypted}`}
                  extraClasses="py-xs px-sm"
                >
                  Watch Again
                </StyledLink>
              </ul>
            </div>
          ))}
          <div className="flex justify-between">
            <StyledButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </StyledButton>
            <StyledButton
              extraClasses="pl-lg pr-lg "
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(games.total / itemsPerPage)}
            >
              Next
            </StyledButton>
          </div>
        </div>
      ) : (
        <StyledTitle variant="h1" extraClasses="text-center">
          No matches found.
        </StyledTitle>
      )}
    </div>
  );
}
