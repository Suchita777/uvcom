// import { El_Messiri } from "@next/font/google";
import Card from "components/Card";
import Layout from "components/layout";
import Link from "next/link";
import { HomePageProps, product } from "types";
import { fetchBestSeller } from "utils/fetchBestSeller";
import { fetchFeatured } from "utils/fetchFeatured";
import { fetchNewArivals } from "utils/fetchNewArival";

// const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

export async function getServerSideProps() {
  const newArrivals = await fetchNewArivals();
  const bestSeller = await fetchBestSeller();
  const featured = await fetchFeatured();

  return {
    props: {
      featuredProducts: featured,
      newArrivalsProducts: newArrivals,
      bestSellerProducts: bestSeller,
    },
  };
}

export default function Home({
  featuredProducts,
  newArrivalsProducts,
  bestSellerProducts,
}: HomePageProps) {
  return (
    <Layout>
      <div className="bg-[url('/bg3.jpg')] lg:bg-[url('/bg2.jpg')] bg-cover pt-24 lg:pt-20 lg:h-[35rem] flex flex-col justify-center items-center text-white">
        <p className="text-lg tracking-widest m-3 lg:m-5">Express Yourself</p>
        <h1 className="flex flex-col lg:flex-row text-6xl lg:text-[5rem] text-center font-serif font-semibold capitalize m-2 lg:m-5">
          <span className="lg:mr-6">Loved</span>
          <span className="mt-2 lg:mt-0">for style</span>
        </h1>
        <p className="text-md lg:text-xl m-3 lg:m-5 italic">
          It&apos;s hard to be nice if you dont feel comfortable!
        </p>
        <Link
          href="/collection"
          className="border bg-white text-black m-5 mb-7 lg:mb-0 rounded hover:bg-transparent hover:text-white"
        >
          <p className="font-semibold p-3 capitalize">shop collection</p>
        </Link>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">New Arrivals</h1>
        <p className="mt-2">Discover the latest ready-to-deliver items.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {newArrivalsProducts.map((product: product) => (
            <Card
              key={product.slug}
              link={product.slug}
              imageUrl={product.productImagesCollection.items[0].url}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">Best Sellers</h1>
        <p className="mt-2">Dresses loved by most of the customers.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {bestSellerProducts.map((product: product) => (
            <Card
              key={product.slug}
              link={product.slug}
              imageUrl={product.productImagesCollection.items[0].url}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col p-3 m-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">Featured</h1>
        <p className="mt-2">Best dresses in our store&apos;s closet.</p>
        <div className="flex overflow-x-scroll overflow-y-hidden mt-6 mb-6">
          {featuredProducts.map((product: product) => (
            <Card
              key={product.slug}
              link={product.slug}
              imageUrl={product.productImagesCollection.items[0].url}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div className="border-t w-full h-20 lg:h-32 flex justify-between items-center text-slate-700 text-[10px] lg:text-base px-3 lg:px-10 p-14 overflow-x-scroll overflow-y-hidden lg:overflow-hidden">
        <div className="flex items-center mr-4 lg:mr-0">
          <p className="w-16 lg:w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 lg:w-7 lg:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </p>
          <div className="lg:m-5">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="mt-2">Mon - Sat, 10am - 9pm</p>
          </div>
        </div>

        <div className="flex items-center mr-4 lg:mr-0">
          <p className="w-16 lg:w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 lg:w-7 lg:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </p>
          <div className="lg:m-5">
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="mt-2">Returns extended to 60 days</p>
          </div>
        </div>

        <div className="flex items-center mr-4 ml-3 lg:ml-0 lg:mr-0">
          <p className="w-16 lg:w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 lg:w-7 lg:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </p>
          <div className="lg:m-5">
            <h3 className="font-semibold ">Gift Package</h3>
            <p className="mt-2">Free packaging over 1000/- INR</p>
          </div>
        </div>

        <div className="flex items-center mr-4 ml-3 lg:ml-0 lg:mr-0">
          <p className="w-14 lg:w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 lg:w-7 lg:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </p>
          <div className="lg:m-5">
            <h3 className="font-semibold">One-year Warranty</h3>
            <p className="mt-2">No questions asked</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
