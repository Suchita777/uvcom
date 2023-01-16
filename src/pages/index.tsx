import { El_Messiri } from "@next/font/google";
import Link from "next/link";
import { HomePageProps, product } from "types";

const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

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

  const featuredQuery = `query{
  productCollection(where:{featured:true}){
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

  const featuredResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: featuredQuery }),
    }
  ).then((res) => res.json());

  console.log(featuredResponse.data.productCollection.items);

  return {
    props: {
      products: response.data.productCollection.items,
      featuredProducts: featuredResponse.data.productCollection.items,
    },
  };
}

export default function Home({ featuredProducts }: HomePageProps) {
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
            It&apos;s hard to be nice if you dont feel comfortable!
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
            {featuredProducts.map((product: product) => (
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

        <div className="border-t w-full h-32 flex justify-between items-center text-slate-700 text-sm p-14">
          <div className="flex items-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </p>
            <div className="m-5">
              <h3 className="font-semibold">Customer Support</h3>
              <p className="mt-2">Mon - Sat, 10am - 9pm</p>
            </div>
          </div>
          <div className="flex items-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </p>
            <div className="m-5">
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="mt-2">Returns extended to 60 days</p>
            </div>
          </div>
          <div className="flex items-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </p>
            <div className="m-5">
              <h3 className="font-semibold ">Gift Package</h3>
              <p className="mt-2">Free packaging over 1000INR</p>
            </div>
          </div>
          <div className="flex items-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </p>
            <div className="m-5">
              <h3 className="font-semibold">One-year Warranty</h3>
              <p className="mt-2">No questions asked</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-black text-white w-full p-8 pb-6">
          <div className="flex w-full justify-between">
            <div className="flex flex-col m-3">
              <h1 className={`${elMessiri.className} text-4xl uppercase`}>
                Youverse
              </h1>
              <ul className="flex mt-4">
                <li className="mr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 invert"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </li>
                <li className="mr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 invert"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </li>
                <li className="mr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 invert"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </li>
                <li className="mr-5">
                  <svg
                    viewBox="0 0 79 59"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 invert"
                  >
                    <path d="M71.0193 0H7.34682C3.28923 0 0 3.28923 0 7.34682V51.4278C0 55.4853 3.28923 58.7746 7.34682 58.7746H71.0193C75.0769 58.7746 78.3661 55.4853 78.3661 51.4278V7.34682C78.3661 3.28923 75.0769 0 71.0193 0ZM71.0193 7.34682V13.5924C67.5874 16.3871 62.1162 20.7327 50.4196 29.8916C47.8419 31.9192 42.7359 36.7903 39.1831 36.7335C35.6309 36.7909 30.5231 31.9184 27.9466 29.8916C16.2518 20.7341 10.7792 16.3875 7.34682 13.5924V7.34682H71.0193ZM7.34682 51.4278V23.0197C10.854 25.8132 15.8277 29.7332 23.4085 35.6694C26.7539 38.3028 32.6125 44.1161 39.1831 44.0808C45.7213 44.1161 51.5057 38.3872 54.9562 35.6707C62.5369 29.7346 67.5119 25.8135 71.0193 23.0199V51.4278H7.34682Z" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="flex">
              <ul className="ml-8">
                <li className="font-bold text-lg mb-3">Products</li>
                <li className="mb-1 text-sm">New Arrivals</li>
                <li className="mb-1 text-sm">Featured</li>
                <li className="mb-1 text-sm">Best Sellers</li>
              </ul>
              <ul className="ml-14">
                <li className="font-bold text-lg mb-3">Support</li>
                <li className="mb-1 text-sm">Contact</li>
                <li className="mb-1 text-sm">Delivery</li>
                <li className="mb-1 text-sm">Shipping & Return</li>
                <li className="mb-1 text-sm">My Account</li>
              </ul>
            </div>
          </div>
          <p className="text-sm mt-12 ">
            @ 2023 Youverse, All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
