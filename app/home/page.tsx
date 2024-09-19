"use client";
import { azeret_mono, bungee } from "@/app/ui/fonts";
import Image from "next/image";
import Board from "../ui/icons/board.svg";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";
import StyledParagraph from "../ui/components/typography/StyledParagraph";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import Fire from "../ui/icons/fire.svg";
import Arcade from "../ui/icons/arcade.svg";
import Classic from "../ui/icons/classic.svg";
import { useSession } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import React, { use } from "react";

export default function HomePage() {
    let friends: String[]; /*arreglo de tipo user*/
    const {data:session} = useSession();
    if (session && session.user) {
        console.log(session)
    return (
        
        <div className=" lg:grid grid-cols-2 w-auto gap-14">
            <div className="space-y-5  my-3xl w-auto ">
                <div className="bg-dark-2 w-auto h-auto p-md  "> 
                    <StyledTitle variant="h2" extraClasses="text-left text-slate-500 ">{session?.data.nickname}</StyledTitle>
                    <StyledParagraph extraClasses="text-left text-slate-500">Enjoy chess with our new features, learn more in about</StyledParagraph>
                </div >
                <Image src={Board} alt=""  className="w-full"/>
            </div>
            <div className="space-y-5  my-3xl w-auto ">
                <StyledTitle variant="h1" extraClasses="text-left text-center">SELECT GAME MODE</StyledTitle>
                <StyledButton variant="primary" style="outlined" extraClasses="w-full ">Single Player</StyledButton>
                <StyledButton variant="primary" style="filled" extraClasses="w-full ">Arcade</StyledButton>
                <StyledButton variant="primary" style="outlined" extraClasses="w-full ">Against AI</StyledButton>
                <StyledButton variant="primary" style="outlined" extraClasses="w-full ">Puzzles</StyledButton>
                 {/*Stats section*/}
                <div className="bg-dark-2 w-auto h-auto p-md">
                    <StyledTitle variant="h2" extraClasses="text-left text-lg ">My stats</StyledTitle>
                    <div className="flex space-x-5">
                        <div className="bg-dark-1 rounded-lg p-4 w-32 h-40 flex flex-col items-center justify-center shadow-lg">
                        <StyledTitle variant="h3" >Streak</StyledTitle>
                        <Image src={Fire} alt="" className="w-9 h-12"/>
                        <p className="text-slate-300 text-lg">14 days</p>
                        </div>
                        <div className="bg-dark-1 rounded-lg p-4 w-32 h-40 flex flex-col items-center justify-center shadow-lg">
                        <StyledTitle variant="h3" >Classic</StyledTitle>
                        <Image src={Classic} alt="" className="w-9 h-12"/>
                        <p className="text-slate-300 text-lg">14 days</p>
                        </div>
                        <div className="bg-dark-1 rounded-lg p-4 w-32 h-40 flex flex-col items-center justify-center shadow-lg">
                        <StyledTitle variant="h3" >Arcade</StyledTitle>
                        <Image src={Arcade} alt="" className="w-9 h-12"/>
                        <p className="text-slate-300 text-lg">14 days</p>
                        </div>
                    </div>
                </div>
                {/*Friends section*/}
                <div className="bg-dark-2 w-auto h-auto p-md">
                    <StyledTitle variant="h2" extraClasses="text-left text-lg ">Friends</StyledTitle>
                </div>
            </div>
            
        </div>
    );}
    return ( <h1>Sesion no iniciada</h1>)
}
