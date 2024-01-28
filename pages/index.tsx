import { BsTwitterX } from "react-icons/bs";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { RiNotificationLine } from "react-icons/ri";
import { RxEnvelopeClosed } from "react-icons/rx";
import { IoBookmarkSharp } from "react-icons/io5";
import React, { useCallback } from "react";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyGoogleTokenQuery } from "@/graphql/qurey/user";
interface TwiiterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwiiterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <IoSearch />,
  },
  {
    title: "Notifications",
    icon: <RiNotificationLine />,
  },
  {
    title: "Messages",
    icon: <RxEnvelopeClosed />,
  },
  {
    title: "Bookmarks",
    icon: <IoBookmarkSharp />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "Premium",
    icon: <BsTwitterX />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google Token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success('Verified Sucess')

      if(verifyGoogleToken){
        window.localStorage.setItem('token',verifyGoogleToken)
      }

      console.log(verifyGoogleToken)
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-3xl h-fit w-fit hover:bg-gray-300 rounded-full p-2 cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="mt-1 text-xl pr-2">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-300 rounded-full px-2 py-2 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] font-semibold text-white text-lg px-4 py-2 rounded-full w-full">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[2px] border-l-[2px] border-[#EFF3F4]">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl text-white">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
