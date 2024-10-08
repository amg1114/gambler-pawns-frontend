//icons
import gear from "../ui/icons/gear.svg";
import aguacate from "../ui/icons/aguacate.png";

//components
import DevelopmentTeam from "@/app/about/components/DevelopmentTeam";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledTitle from "../ui/components/typography/StyledTitle";

import Image from "next/image";
import { nunito } from "@/app/ui/fonts";
import { Metadata } from "next";
import DrawModal from "../ui/components/modals/DrawModal";
import EndGameModal from "../ui/components/modals/EndGameModal";

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
            <StyledTitle variant="h2" extraClasses="!m-sm !space-x-md">
              Release Notes
            </StyledTitle>
          </div>
          <div>
            <StyledTitle variant="h2" extraClasses="!m-sm !space-x-md">
              1.0
            </StyledTitle>
            <ul className={`list-inside list-disc ${nunito.className}`}>
              <li>Creating the repository</li>
              <li>Creating the database</li>
              <li>Creating the API</li>
            </ul>
          </div>
          <div>
            <StyledTitle variant="h2" extraClasses="!m-sm">
              1.1
            </StyledTitle>
            <ul className={`list-inside list-disc ${nunito.className}`}>
              <li>Creating the repository</li>
              <li>Creating the database</li>
              <li>Creating the API</li>
            </ul>
          </div>
          <div>
            <StyledTitle variant="h2" extraClasses="!m-sm">
              1.2
            </StyledTitle>
            <ul className={`list-inside list-disc ${nunito.className}`}>
              <li>Creating the repository</li>
              <li>Creating the database</li>
              <li>Creating the API</li>
            </ul>
          </div>
        </div>
        <DevelopmentTeam />
      </div>
    </div>
  );
}
