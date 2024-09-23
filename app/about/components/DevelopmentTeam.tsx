import React from 'react';
import githubIcon from '../../ui/icons/githubIcon.svg';
import Image from 'next/image';
import aguacate from '../../ui/icons/aguacate.png';
import StyledTitle from '@/app/ui/components/typography/StyledTitle';
import StyledParagraph from '@/app/ui/components/typography/StyledParagraph';

interface Developer {
  username: string;
  avatar: any;
}

interface DeveloperCardProps {
  username: string;
  avatar: any;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ username, avatar }) => (
  <div className="flex flex-col items-center">
    <Image src={avatar} alt={username} className="w-xl h-xl md:w-2xl md:h-2xl lg:w-3xl lg:h-3xl rounded-full mb-2 " />
    <div className="flex items-center">
        <a href={`https://github.com/${username}`}>
      <Image src={githubIcon} alt='githubIcon' className="mr-xs size-md md:size-lg" />
        </a>
        <a href={`https://github.com/${username}`}>
      <StyledTitle variant="h2" extraClasses="text-sm !mb-none !text-dark-2">{username}</StyledTitle>
      </a>
    </div>
  </div>
);

const DevelopmentTeam: React.FC = () => {
const developers: Developer[] = [
    { username: "jfmonsa", avatar: aguacate },
    { username: "Ramsterb", avatar: aguacate },
    { username: "NicolasPL", avatar: aguacate },
    { username: "AMG1114", avatar: aguacate },
    { username: "JuanPl", avatar: aguacate },
    { username: "Joker222", avatar: aguacate },
];

  return (
    <div className="w-full bg-primary p-6 rounded-lg rounded-t-full mt-3xl ">
      <StyledTitle variant="h1" extraClasses="w-96 md:w-full lg:w-full xl:w-full text-center pt-xl !text-dark-2 "> EQUIPO DE DESARROLLO</StyledTitle>
      <div className="grid grid-cols-3 gap-md">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} username={dev.username} avatar={dev.avatar} />
        ))}
      </div >
      <div className='bg-dark-2 mt-lg'>
      <StyledParagraph  extraClasses="text-center !text-light !p-lg !text-md">
        ¡Estamos emocionados de compartir nuestro juego y redefinir juntos la manera de jugar al ajedrez!
      </StyledParagraph>
      </div>
    </div>
  );
};

export default DevelopmentTeam;