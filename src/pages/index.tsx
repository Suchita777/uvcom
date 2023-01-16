import { El_Messiri } from "@next/font/google";

const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { HomePageProps, product } from "types";

export async function getServerSideProps() {
  const query = `{
  productCollection{
    items{
      slug
      title
      price
      productImagesCollection{
        items{
          url
          description
        }
      }
    }
  }
}`;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((res) => res.json());

  return {
    props: {
      products: response.data.productCollection.items,
    },
  };
}

export default function Home({ products }: HomePageProps) {
  return (
    <>
      <div>
        <div className="flex w-full justify-between items-center p-3 bg-black text-white uppercase text-md">
          <ul className="flex">
            <li className="m-3 ml-5">Home</li>
            <li className="m-3 ml-5">Shop</li>
            <li className="m-3 ml-5">Contact</li>
          </ul>
          <h1 className={`${elMessiri.className} m-3 text-3xl`}>Youverse</h1>
          <ul className="flex ">
            <li className="m-3 mr-5">Login</li>
            <li className="m-3 mr-5">
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
          </ul>
        </div>
        <div className="bg-[url('/bg1.jpg')] bg-cover h-96 w-full flex flex-col justify-center items-center text-white ">
          <p className="text-md tracking-widest m-3">Express Yourself</p>
          <h1 className="text-7xl font-serif font-semibold capitalize m-4">
            Loved for style
          </h1>
          <p className="text-xl m-3 italic">
            It's hard to be nice if you dont feel comfortable!
          </p>

          <Link
            href=""
            className="border bg-white text-black m-5 rounded hover:bg-transparent hover:text-white"
          >
            <p className="font-semibold p-3 capitalize">shop collection</p>
          </Link>
        </div>

        <div className="flex flex-col p-3 m-4">
          <h1 className="text-4xl font-semibold">New Arrivals</h1>
          <p className="mt-2">Discover the latest ready-to-deliver items.</p>

          <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
            {products.map((product: product) => (
              <div
                key={product.slug}
                className="mr-4 w-80 h-96 shrink-0 border"
              >
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <img
                      src={product.productImagesCollection.items[0].url}
                      className="w-64 h-72 p-3 pt-0"
                    />
                  </div>
                  <h1 className="p-4 pt-1 pb-1 text-lg font-semibold mr-auto">
                    {product.title}
                  </h1>
                  <h2 className="p-4 pt-1 mr-auto">{product.price} INR</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
