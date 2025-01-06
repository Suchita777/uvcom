import Layout from "components/layout";
import Link from "next/link";
import { useState } from "react";
import { HomePageProps, product } from "types";
import { fetchProducts } from "utils/fetchProducts";

// const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

export async function getServerSideProps() {
  const products: product[] = await fetchProducts();

  return {
    props: {
      products: products,
    },
  };
}

export default function Collection({ products }: HomePageProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [initProducts, setInitProducts] = useState(products);

  const filteredProducts = initProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div>
        <div className="pt-28 flex justify-center">
          <div className="flex justify-between items-center border border-black rounded w-[19rem] lg:w-[24rem]">
            <input
              placeholder="Help us find you something!"
              className=" p-2 pl-3 lg:w-[22rem] rounded focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 lg:w-7 lg:h-7 ml-2 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap justify-center overflow-y-hidden p-2 lg:p-6">
          { filteredProducts.length > 0 ? (filteredProducts.map((product: product) => (
            <div
              key={product.slug}
              className="m-2 lg:m-4 w-[9.7rem] h-[16rem] lg:w-[16rem] lg:h-[21.5rem] shrink-0 border"
            >
              <Link href={`/${product.slug}`}>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <img
                      src={product.productImagesCollection.items[0].url}
                      className="w-[7.8rem] h-[10rem] lg:w-[12rem] lg:h-[15rem] p-3 pt-0"
                    />
                  </div>
                  <h1 className="p-3 pt-0 pb-1 text-sm lg:text-base font-semibold mr-auto">
                    {product.title}
                  </h1>
                  <h2 className="p-3 pt-1 text-sm lg:text-base mr-auto">
                    {product.price} /- INR
                  </h2>
                </div>
              </Link>
            </div>
          ))) : (
            <div className="text-center text-red-600 font-semibold p-5">
              No products found to display.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
