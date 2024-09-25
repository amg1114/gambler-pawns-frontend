"use client";

import Image from "next/image";

export default function UserAvatar({
  filename,
}: {
  filename: string | null | undefined;
}) {
  return (
    <>
      {filename ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_AVATAR_URL}/${filename}`}
          alt="Avatar"
          className="aspect-square w-full rounded-full"
          width="112"
          height="112"
        />
      ) : (
        <span className="block aspect-square w-full rounded-full bg-dark-1"></span>
      )}
    </>
  );
}
