//icons
import gear from "../ui/icons/gear.svg";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ExtensionIcon from "@mui/icons-material/Extension";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import ConstructionIcon from "@mui/icons-material/Construction";

//components
import DevelopmentTeam from "@/app/about/_components/DevelopmentTeam";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledTitle from "../ui/components/typography/StyledTitle";

import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import { Metadata } from "next";
import SvgIcon from "@mui/icons-material/LockPerson";

export const metadata: Metadata = {
  title: "About",
  description: "The team behind Gambler Pawns",
};

export default function AboutPage() {
  return (
    <div className="w-auto space-x-8 space-y-8 text-center">
      <div className="grid-col-1 grid w-auto justify-center p-md text-center">
        <div className="m-xl mx-auto max-w-2xl">
          <StyledTitle variant="h1" extraClasses="text-center">
            WHO WE ARE
          </StyledTitle>
          <StyledParagraph extraClasses="text-center !text-2xl">
            We are six students passionate about software development,
            developing an arcade chess project. Our goal is to transform
            traditional chess into a faster and more exciting experience,
            combining classic mechanics with a modern twist.
          </StyledParagraph>
        </div>
        <div className="my-xl flex justify-center">
          <Image src={gear} alt="" className="w-7" />
          <StyledTitle variant="h1" extraClasses="!m-md">
            Versions
          </StyledTitle>
        </div>
        <div className="grid-flow-row space-x-md text-start">
          <div>
            <StyledTitle
              variant="h1"
              extraClasses="!m-sm !mb-xl !text-[20px] !space-x-md"
            >
              Release Notes
            </StyledTitle>
          </div>
          <div>
            <StyledTitle
              variant="h1"
              extraClasses="!m-sm mx-0 !text-[20px] !space-x-md"
            >
              Release 1.0
            </StyledTitle>

            <div className="mb-lg">
              <StyledTitle
                variant="h2"
                extraClasses="!m-sm !text-[20px] !space-x-md"
              >
                <SvgIcon component={LockPersonIcon} className="mr-sm" />
                User Authentication
              </StyledTitle>
              <ul className={`list-inside list-disc ${nunito.className}`}>
                <li>Registration, login, and password recovery.</li>
                <li>Full implementation of the authentication system.</li>
              </ul>
            </div>

            <div className="mb-lg">
              <StyledTitle
                variant="h2"
                extraClasses="!m-sm !text-[20px] !space-x-md"
              >
                <SvgIcon component={DashboardIcon} className="mr-sm" />
                Core Application Components
              </StyledTitle>
              <ul className={`list-inside list-disc ${nunito.className}`}>
                <li>Creation of Header, Footer, and Sidebar components.</li>
                <li>
                  Development of main pages such as Home, About, and Profile
                  (including user details editing).
                </li>
              </ul>
            </div>

            <div className="mb-lg">
              <StyledTitle
                variant="h2"
                extraClasses="!m-sm !text-[20px] !space-x-md"
              >
                <SvgIcon component={ExtensionIcon} className="mr-sm" />
                Game Modes
              </StyledTitle>
              <ul className={`list-inside list-disc ${nunito.className}`}>
                <li>Initial development of game options.</li>
                <li>Random player matchmaking and chess game logic.</li>
                <li>Move validation and real-time rendering of game moves.</li>
              </ul>
            </div>

            <div className="mb-lg">
              <StyledTitle
                variant="h2"
                extraClasses="!m-sm !text-[20px] !space-x-md"
              >
                <SvgIcon component={ArticleIcon} className="mr-sm" />
                Pages and Additional Features
              </StyledTitle>
              <ul className={`list-inside list-disc ${nunito.className}`}>
                <li>
                  Design and logic for the game page against random players.
                </li>
                <li>
                  Allowing unregistered users to connect and play without an
                  account.
                </li>
                <li>
                  Styling and functionality for puzzles and game rewatch
                  features.
                </li>
              </ul>
            </div>

            <div className="mb-lg">
              <StyledTitle
                variant="h2"
                extraClasses="!m-sm !text-[20px] !space-x-md"
              >
                <SvgIcon component={ConstructionIcon} className="mr-sm" />
                Optimization and Bug Fixes
              </StyledTitle>
              <ul className={`list-inside list-disc ${nunito.className}`}>
                <li>Resolution of critical frontend bugs.</li>
                <li>Completion of essential pages for the launch.</li>
              </ul>
            </div>
          </div>
        </div>
        <DevelopmentTeam />
      </div>
    </div>
  );
}
