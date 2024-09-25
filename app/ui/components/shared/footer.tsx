import StyledTitle from "../typography/StyledTitle";
import githubIcon from "../../icons/githubIcon.svg";
import StyledLink from "../typography/StyledLink";
import Image from "next/image";
import StyledParagraph from "../typography/StyledParagraph";

export default function Footer(): JSX.Element {
  return (
    <footer className="mx-auto mt-2xl w-full text-light">
      <div className="mb-none flex w-full flex-col items-center">
        <StyledLink
          href="/about"
          extraClasses="!p-xs hover:text-primary transition-colors mx-[50%] w-[120px]"
        >
          About Us
        </StyledLink>
        <a
          href="https://github.com/amg1114/gambler-pawns-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image src={githubIcon} alt="" className="mr-sm size-lg" />
          <StyledParagraph extraClasses="mb-none">
            GitHub Repository
          </StyledParagraph>
        </a>
      </div>
      <div className="mt-md border-t text-center text-sm text-dark-2">
        © {new Date().getFullYear()} Gambler Pawns. All rights reserved.
      </div>
    </footer>
  );
}
