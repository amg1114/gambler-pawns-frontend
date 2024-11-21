"use client";

import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import { useState } from "react";

// Importing components
import StyledButton from "@/app/ui/components/typography/StyledButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchUsers() {
  const [searchUser, setSearchUser] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };
  console.log(searchUser);
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-md">
      <div className="h-auto w-11/12 rounded-base bg-white p-sm">
        <section className="flex h-lg w-full items-center">
          <SearchRoundedIcon color="disabled"></SearchRoundedIcon>
          <input
            className={`${nunito.className} md:pl-2 h-full w-full text-lg font-semibold text-dark-1 focus:outline-none`}
            placeholder="find a friend"
            type="text"
            value={searchUser}
            onChange={handleSearch}
          ></input>
        </section>
      </div>

      <div className="flex w-full items-center justify-between bg-secondary p-sm pr-md">
        <div className="flex items-center space-x-sm pl-sm">
          <Image
            src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/7.png`}
            alt="Profile Icon"
            width={52}
            height={52}
            className="h-14 w-14"
          />
          <span className={`${nunito.className} text-lg font-light`}>
            Nombre
          </span>
        </div>

        <StyledButton style="outlined" extraClasses="py-xs justify-end px-sm">
          Añadir amigo
        </StyledButton>
      </div>
    </div>
  );
}
