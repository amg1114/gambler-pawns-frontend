//icons
import githubIcon from '../../ui/icons/githubIcon.svg';
import aguacate from '../../ui/icons/aguacate.png';

//components
import StyledTitle from '@/app/ui/components/typography/StyledTitle';
import StyledParagraph from '@/app/ui/components/typography/StyledParagraph';


import Image from 'next/image';

interface Developer {
  username: string;
  avatar: any;
}

interface DeveloperCardProps {
  username: string;
  avatar: any;
}

const DeveloperCard = ({ username, avatar }:DeveloperCardProps) => (
  <div className="flex flex-col items-center pr-md">
    <Image src={avatar} alt={username} className="w-2xl h-2xl  lg:w-3xl lg:h-3xl rounded-full mb-2 " />
    <div className="flex items-center">
        <a href={`https://github.com/${username}`}>
      <Image src={githubIcon} alt='githubIcon' className="mr-sm size-md md:size-lg lg:size-lg" />
        </a>
        <a href={`https://github.com/${username}`}>
      <StyledTitle variant="h2" extraClasses="text-sm md:text-md lg:text-lg !mb-none !text-dark-2">{username}</StyledTitle>
      </a>
    </div>
  </div>
);

const DevelopmentTeam = () => {
const developers: Developer[] = [
    { username: "jfmonsa", avatar: aguacate },
    { username: "Ramsterb", avatar: aguacate },
    { username: "NicolasPL64", avatar: aguacate },
    { username: "JuanPidarraga", avatar: aguacate },
    { username: "AMG1114", avatar: aguacate },
    { username: "JSebastianMarin", avatar: aguacate },
];

  return (
    <div className="w-full bg-primary p-6 rounded-lg rounded-t-full mt-3xl ">
      <StyledTitle variant="h1" extraClasses="w-80 items-center md:w-full lg:w-full xl:w-full  pt-2xl !text-dark-2 mx-auto"> development team</StyledTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-md">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} username={dev.username} avatar={dev.avatar} />
        ))}
      </div >
      <div className='bg-dark-2 mt-lg mb-none'>
      <StyledParagraph  extraClasses="text-center !text-light !p-lg !text-md !mb-none">
      ¡We are excited to share our game and redefine the way we play chess together!
      </StyledParagraph>
      </div>
    </div>
  );
};

export default DevelopmentTeam;