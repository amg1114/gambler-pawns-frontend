"use client";

import Image from "next/image";
import Board from "../ui/icons/board.svg";

export default function HomePage() {
    return (
        <div className="grid grid-cols-2 gap-md">
            <div>
                <Image src={Board} alt="" />
            </div>
            <article>El pepe</article>
        </div>
    );
}
