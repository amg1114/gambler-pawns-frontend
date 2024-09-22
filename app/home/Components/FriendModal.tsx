import React, { useState, useRef, useEffect } from 'react';
import aguacate from '../../ui/icons/aguacate.png';
import Image from 'next/image';
import StyledButton from '@/app/ui/components/typography/StyledButton';
import StyledTitle from '@/app/ui/components/typography/StyledTitle';
import StyledParagraph from '@/app/ui/components/typography/StyledParagraph';
import { profile } from 'console';

interface FriendProps {
    avatar: any;
    profileAvatar: any;
    name: string;
    desc : string;
    classic: number;
    arcade: number;
    flag: any;
}

export default function FriendModal({ avatar,profileAvatar,name, desc, classic, arcade,flag }: FriendProps) {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={toggleModal} className="p-2 bg-blue-500 text-white rounded-full">
        <Image
          src={(avatar)}
          alt="Profile Icon"
          className="w-16 h-16 rounded-full"
        />
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute min-w-64 w-auto p-4 bg-dark-1 text-white rounded-lg shadow-lg "
          style={{ bottom: '120%', left: '50%', transform: 'translateX(-0%)' }}
        >
          <div className="flex items-center m-sm">
            <Image
              src={profileAvatar}
              alt="Profile Avatar"
              className="w-12 h-12 rounded-full mr-2"
            />
            <div className='m-sm'>
              <StyledTitle variant='h3'>{name}</StyledTitle>
              <StyledParagraph>{classic} | {arcade}xp</StyledParagraph>
            </div>
            <Image
              src={flag}
              alt="Flag"
              className="w-6 h-4 ml-2 m-sm"
            />
          </div>
          <StyledParagraph>{desc}</StyledParagraph>
          <div className="flex space-x-2 m-sm">
            <StyledButton >
              Play
            </StyledButton>
            <StyledButton variant='secondary' style='outlined' extraClasses='!text-light'>
              View Profile
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
};

