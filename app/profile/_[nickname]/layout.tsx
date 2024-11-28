import { UserRes } from "@/app/lib/interfaces/responses/user-res.interface";
import axios from "@/app/lib/_axios";
import { Metadata } from "next";

// export async function generateMetadata(props: {
//   params: { nickname: string };
// }): Promise<Metadata> {
//   const { nickname } = props.params;
//   const data: Metadata = {
//     title: "User not found",
//     description: "The user you're looking for doesn't exist.",
//   };

//   const user = await axios
//     .get<UserRes>(`/user/${nickname}`)
//     .then((res) => {
//       return res.data.data;
//     })
//     .catch((err) => {
//       return null;
//     });

//   if (user) {
//     data.title = user.nickname + "'s Profile | Gambler Pawns";
//     data.description = user.aboutText;
//   }

//   return data;
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
