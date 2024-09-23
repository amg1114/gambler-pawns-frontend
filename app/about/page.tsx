"use client";
import DevelopmentTeam from "@/app/about/components/DevelopmentTeam";
import aguacate from "../ui/icons/aguacate.png";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledTitle from "../ui/components/typography/StyledTitle";
import gear from "../ui/icons/gear.svg";
import Image from "next/image";
import { nunito } from "@/app/ui/fonts";

export default function AboutPage() {
    return (
        <div className="flex w-full justify-center space-x-8 space-y-8">
            <div className=" grid-cols-1 p-md text-center w-auto">
                <div className="m-xl max-w-2xl">
                    <StyledTitle variant="h1" extraClasses="text-center">
                    WHO WE ARE
                    </StyledTitle>
                    <StyledParagraph extraClasses="text-center ">
                        We are six students passionate about software
                        development, developing an arcade chess project. Our
                        goal is to transform traditional chess into a faster and
                        more exciting experience, combining classic mechanics
                        with a modern twist.
                    </StyledParagraph>
                </div>
                <div className="my-xl flex justify-center">
                    <Image src={gear} alt="" className="w-7" />
                    <StyledTitle variant="h1" extraClasses="!m-md">
                        Versions
                    </StyledTitle>
                </div>
                <div className="grid-flow-row text-start">
                        <div>
                            <StyledTitle variant="h1" extraClasses="!m-sm">
                                1.0
                            </StyledTitle>
                            <ul className={`list-disc list-inside ${nunito.className}`}>
                                <li>Creating the repository</li>
                                <li>Creating the database</li>
                                <li>Creating the API</li>
                            </ul>
                        </div>
                        <div>
                            <StyledTitle variant="h1" extraClasses="!m-sm">
                                1.1
                            </StyledTitle>
                            <ul className={`list-disc list-inside ${nunito.className}`}>
                                <li>Creating the repository</li>
                                <li>Creating the database</li>
                                <li>Creating the API</li>
                            </ul>
                        </div>
                        <div>
                            <StyledTitle variant="h1" extraClasses="!m-sm">
                                1.2
                            </StyledTitle>
                            <ul className={`list-disc list-inside ${nunito.className}`}>
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
