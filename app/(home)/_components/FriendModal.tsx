import React, { useState, useRef, useEffect } from "react";
import aguacate from "../../ui/icons/aguacate.png";
import Image from "next/image";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import { profile } from "console";

interface FriendProps {
  avatar: any;
  profileAvatar: any;
  name: string;
  desc: string;
  classic: number;
  arcade: number;
  flag: any;
}

export default function FriendModal({
  avatar,
  profileAvatar,
  name,
  desc,
  classic,
  arcade,
  flag,
}: FriendProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleModal}
        className="p-2 bg-blue-500 rounded-full text-white"
      >
        <Image
          src={avatar}
          alt="Profile Icon"
          className="h-16 w-16 rounded-full"
        />
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="p-4 rounded-lg absolute w-auto min-w-64 bg-dark-1 text-white shadow-lg"
          style={{ bottom: "120%", left: "50%", transform: "translateX(-0%)" }}
        >
          <div className="m-sm flex items-center">
            <Image
              src={profileAvatar}
              alt="Profile Avatar"
              className="ms-sm h-12 w-12 rounded-full"
            />
            <div className="m-sm">
              <StyledTitle variant="h4" extraClasses="!my-xs">
                {name}
              </StyledTitle>
              <StyledParagraph>
                {classic} | {arcade}xp
              </StyledParagraph>
            </div>
            <Image src={flag} alt="Flag" className="ml-2 m-sm h-4 w-6" />
          </div>
          <StyledParagraph extraClasses="m-sm">{desc}</StyledParagraph>
          <div className="m-sm flex space-x-2">
            <StyledButton>Play</StyledButton>
            <StyledButton
              variant="secondary"
              style="outlined"
              extraClasses="!text-light"
            >
              View Profile
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
