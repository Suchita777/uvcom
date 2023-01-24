import Link from "next/link";
import { CardProps } from "types";

export default function Card({ link, imageUrl, title, price }: CardProps) {
  return (
    <div className="mr-4 w-[16rem] h-[23rem] lg:w-[21rem] lg:h-[29rem] shrink-0 border">
      <Link href={`/${link}`}>
        <div className="flex flex-col justify-center items-center">
          <div>
            <img
              src={imageUrl}
              className="w-[13rem] h-[17rem] lg:w-[18rem] lg:h-[23rem] p-3 pt-0"
            />
          </div>
          <h1 className="p-4 pt-1 pb-1 text-md lg:text-lg font-semibold mr-auto">
            {title}
          </h1>
          <h2 className="p-4 pt-1 mr-auto">{price} INR /- </h2>
        </div>
      </Link>
    </div>
  );
}
