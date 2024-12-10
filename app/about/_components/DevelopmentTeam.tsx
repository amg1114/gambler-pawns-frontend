"use client";
//icons
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Avatar,
  AvatarRes,
} from "@/app/lib/interfaces/responses/avatars-res.interface";
import SvgIcon from "@mui/material/SvgIcon";

//components
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "@/app/lib/_axios";

interface Developer {
  username: string;
  avatar: any;
}

interface DeveloperCardProps {
  username: string;
  avatar: string;
}

const DeveloperCard = ({ username, avatar }: DeveloperCardProps) => (
  <div className="flex flex-col items-center">
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center transition-all duration-300"
    >
      <div className="relative flex items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_20px_5px_rgba(135,206,235,0.8)]">
        <Image
          src={avatar}
          alt={username}
          className="h-2xl w-2xl rounded-full lg:h-3xl lg:w-3xl"
          width={100}
          height={100}
        />
      </div>
      <StyledTitle
        variant="h2"
        extraClasses="text-sm md:text-md lg:text-lg !mb-none !text-primary mt-2 transition-all duration-300 group-hover:text-secondary"
      >
        {username}
      </StyledTitle>
    </a>
  </div>
);

const DevelopmentTeam = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const developers: Developer[] = [
    { username: "jfmonsa", avatar: "6.png" },
    { username: "Ramsterb", avatar: "7.png" },
    { username: "NicolasPL64", avatar: "3.png" },
    { username: "JuanPidarraga", avatar: "1.png" },
    { username: "AMG1114", avatar: "5.png" },
    { username: "JSebastianMarin", avatar: "2.png" },
  ];
  const repositories = [
    {
      name: "Frontend",
      url: "https://github.com/amg1114/gambler-pawns-frontend",
    },
    {
      name: "Backend",
      url: "https://github.com/amg1114/gambler-pawns-backend",
    },
  ];

  useEffect(() => {
    axios
      .get<AvatarRes>("/assets/avatars")
      .then((res) => {
        if (res.data.status) {
          setAvatars(res.data.data);
        } else {
          throw new Error("Error fetching avatars");
        }
      })
      .catch((error) => console.error("Error fetching avatars:", error));
  }, []);

  const getAvatarUrl = (icon: string) => {
    const avatar = avatars.find((a) => a.fileName === icon);
    return avatar
      ? `${process.env.NEXT_PUBLIC_AVATAR_URL}/${avatar.fileName}`
      : `${process.env.NEXT_PUBLIC_AVATAR_URL}/1.png`;
  };

  return (
    <div className="rounded-lg relative mt-3xl h-full w-full rounded-base bg-gradient-to-r from-transparent via-dark-2 to-transparent p-md">
      <StyledTitle
        variant="h1"
        extraClasses="w-80 items-center md:w-full lg:w-full xl:w-full  pt-2xl !text-primary mx-auto"
      >
        Development team
      </StyledTitle>
      <div className="grid grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-3">
        {developers.map((dev, index) => (
          <DeveloperCard
            key={index}
            username={dev.username}
            avatar={getAvatarUrl(dev.avatar)}
          />
        ))}
        <SvgIcon
          component={GitHubIcon}
          className="mb-0 col-start-2 mx-auto mt-xl size-xl"
        />
      </div>

      <div className="mt-sm flex justify-center gap-md">
        {repositories.map((repo, index) => (
          <a
            key={index}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-sm"
          >
            <span className="text-primary transition-colors duration-300 group-hover:text-secondary">
              {repo.name}
            </span>
          </a>
        ))}
      </div>
      <div className="mb-none mt-lg">
        <StyledParagraph extraClasses="text-center !text-light !p-lg !text-md !mb-none">
          We are excited to share our game and redefine the way we play chess
          together!
        </StyledParagraph>
      </div>
    </div>
  );
};

export default DevelopmentTeam;
