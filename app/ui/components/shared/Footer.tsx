import StyledLink from "../typography/StyledLink";
import Image from "next/image";
import StyledParagraph from "../typography/StyledParagraph";

export default function Footer(): JSX.Element {
  return (
    <footer className="mx-auto mt-2xl w-full text-light">
      <div className="mt-md border-t pt-md text-center text-sm text-secondary">
        <div className="mb-none flex w-full flex-col items-center">
          <StyledLink
            href="/about"
            extraClasses="!p-xs hover:text-primary transition-colors"
          >
            About Us
          </StyledLink>
        </div>
        <div className="text-center text-sm text-light">
          © {new Date().getFullYear()} Gambler Pawns. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
