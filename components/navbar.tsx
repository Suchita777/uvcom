import Link from "next/link";
import { useState } from "react";

export default function NavBar({ font }: any) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full justify-between items-center p-2.5 bg-black text-white uppercase fixed text-md">
      <ul className="hidden lg:flex">
        <Link href={"/"}>
          <li className="m-3 ml-5">Home</li>
        </Link>
        <Link href={"/collection"}>
          <li className="m-3 ml-5">Shop</li>
        </Link>
        <Link href={""}>
          <li className="m-3 ml-5">Contact</li>
        </Link>
      </ul>
      <div className="block lg:hidden" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </div>

      <div
        id="Sidebar"
        className={`${
          open ? "block" : "hidden"
        } w-[64%] h-screen bg-white z-10 fixed inset-0 flex flex-col p-3`}
      >
        <div className="mt-3 text-black flex items-center">
          <h1 className={`${font.className} m-3 text-3xl`}>Youverse</h1>
          <div className="ml-auto mr-3" onClick={() => setOpen(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <ul className="flex-col text-black text-center">
          <Link href={"/"}>
            <li className="m-3 mt-5 ml-5">Home</li>
          </Link>
          <Link href={"/collection"}>
            <li className="m-3 mt-5 ml-5">Shop</li>
          </Link>
          <Link href={""}>
            <li className="m-3 mt-5 ml-5">Contact</li>
          </Link>
          <Link href={""}>
            <li className="m-3 mt-5 ml-5">Login</li>
          </Link>
        </ul>
      </div>

      <h1 className={`${font.className} m-3 text-3xl`}>Youverse</h1>
      <ul className="flex">
        <li className="m-3 mr-5 hidden lg:block">Login</li>
        <Link href={"/cart"}>
          <li className="m-3 mr-0 lg:mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </li>
        </Link>
      </ul>
    </div>
  );
}
