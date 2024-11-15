import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { azeret_mono, nunito } from "@/app/ui/fonts";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import capitalizeFirstLetter from "@/app/lib/utils/capitalizeFirstLetter";

interface GamesHistory {
  oponentAvatar: any;
  opponentNickname: string;
  eloBefore: number;
  mode: string;
  gameDate: string;
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
  const [games, setGames] = useState<GamesHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `http://[::1]:8000/api/v1/game-history?userId=${session?.data.userId}`;
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
        setGames(response.data.data); // Ajusta la estructura según tu API &mode=${}&result=${}&side=${}
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (session) {
      fetchGames();
    }
  }, [session, options.GameMode, options.ResultType, options.PlayedAs]);

  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(games.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-[334px] space-y-lg">
      {currentGames && currentGames.length > 0 ? (
        currentGames.map((game, index) => (
          <div key={index} className="flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${game.oponentAvatar}`}
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
              <StyledButton extraClasses="py-xs px-sm">
                Watch Again
              </StyledButton>
            </ul>
          </div>
        ))
      ) : (
        <p>No games found</p>
      )}
      <div className="flex justify-between">
        <StyledButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </StyledButton>
        <StyledButton
          extraClasses="pl-lg pr-lg "
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(games.length / itemsPerPage)}
        >
          Next
        </StyledButton>
      </div>
    </div>
  );
}
