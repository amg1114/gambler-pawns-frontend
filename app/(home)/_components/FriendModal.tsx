import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "@/app/ui/components/typography/StyledParagraph";
import "flag-icons/css/flag-icons.min.css";

interface FriendProps {
  avatar: string;
  name: string;
  desc: string;
  classic: number;
  flag: string;
}

export default function FriendModal({
  avatar,
  name,
  desc,
  classic,
  flag,
}: FriendProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{
    left: string;
    top: string;
  }>({
    left: "50%",
    top: "50%",
  });

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleHover = () => {
    if (!isTouchDevice) setIsOpen(true); // Solo abre en hover si no es táctil
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsOpen(false); // Solo cierra en hover si no es táctil
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

  useEffect(() => {
    const handleResize = () => {
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const modalWidth = rect.width;
        const modalHeight = rect.height;
        const left = `${Math.max(0, (windowWidth - modalWidth) / 2)}px`;
        const top = `${(windowHeight - modalHeight) / 2}px`;
        setModalPosition({ left, top });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Detecta si el dispositivo es táctil
    const handleTouchDetection = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    };
    handleTouchDetection();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={isTouchDevice ? toggleModal : undefined}
        className="p-2 rounded-full bg-dark-2 text-white"
      >
        <Image
          src={avatar}
          alt="Profile Icon"
          className="h-16 w-16 rounded-full"
          width={64}
          height={64}
        />
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="rounded-lg absolute z-50 min-w-[200px] bg-dark-1 p-md text-white shadow-sm shadow-primary"
          style={{
            left: modalPosition.left,
            top: modalPosition.top,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="grid grid-cols-[auto] items-center">
            <div className="mx-auto">
              <Image
                src={avatar}
                alt="Profile Avatar"
                className="h-24 w-24 rounded-full"
                width={96}
                height={96}
              />
            </div>
            <div className="grid-rows-3">
              <div className="m-sm">
                <div className="flex items-center">
                  <StyledTitle
                    variant="h4"
                    extraClasses="!my-xs w-auto !mb-none md:text-base lg:text-lg break-words overflow-hidden"
                  >
                    {name}
                  </StyledTitle>
                  <span
                    className={`fi fi-${flag.toLowerCase()} ml-sm items-center text-xl`}
                    style={{
                      width: "28px",
                      height: "28px",
                    }}
                  ></span>
                </div>
                <StyledParagraph>Classic {classic}</StyledParagraph>
              </div>
            </div>
          </div>
          <StyledParagraph extraClasses="ml-sm">{desc}</StyledParagraph>
          <div className="mt-none text-center">
            <StyledButton extraClasses="!w-full">Play</StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
