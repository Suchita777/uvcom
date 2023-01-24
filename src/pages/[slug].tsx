import Layout from "components/layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { CartContextType, ProductPageProps } from "types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContext, useState } from "react";
import { cartContext } from "components/cartProvider";

export async function getServerSideProps(context: any) {
  const query = `query getProduct($slug:String!) {
  productCollection(where:{slug:$slug}){
    items{
      title
      slug
      price
      productImagesCollection{
        items{
          url
        	description
        }
      }
      sizes
      description{
        json
      }
    }
  }
}`;

  const variables = { slug: context.params.slug };

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((res) => res.json());

  return {
    props: {
      product: response.data.productCollection.items[0],
    },
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>();
  const { cart, addToCart } = useContext(cartContext) as CartContextType;

  return (
    <Layout>
      <div className="flex-col lg:flex lg:flex-row w-full h-max pt-24 lg:pt-24 lg:p-10 lg:pb-4 pb-5 justify-center">
        <div className="flex-col lg:flex lg:flex-row justify-center lg:items-center lg:w-[85%]">
          <div className="p-4 lg:w-[40%] lg:h-[36rem] flex justify-center items-center">
            <img
              src={product.productImagesCollection.items[0].url}
              className="w-[65%] lg:w-[85%] h-[25rem] lg:h-[32rem] "
            ></img>
          </div>
          <div className="p-7 pt-0 lg:pl-9 lg:w-[60%]">
            <h1 className="text-3xl lg:text-5xl font-semibold mb-3">
              {product.title}
            </h1>
            <p className="text-lg lg:text-2xl mb-5">{product.price} INR /- </p>
            <p className="mb-5">
              <p className="font-bold ">Available Sizes :</p>
              <p className="flex mt-2">
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className={`w-12 mr-2 p-1 border border-slate-600 rounded text-center ${
                      selectedSize == size ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <p className="cursor-pointer">{size}</p>
                  </div>
                ))}
              </p>
            </p>
            <p className="document mb-8 text-gray-700 tracking-widest ">
              <p className="font-bold text-black mb-2 mt-7 tracking-normal">
                Description :{" "}
              </p>
              <p className="text-sm lg:text-base">
                {documentToReactComponents(product.description.json)}
              </p>
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                className="mr-6 border border-black font-semibold w-[10rem] h-[3.5rem] flex items-center justify-center"
                onClick={() =>
                  //@ts-ignore
                  addToCart(product, selectedSize)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add to Cart
              </button>

              <Link href={`/checkout/${product.slug}`}>
                <div className="border border-black font-semibold w-[10rem] h-[3.5rem] flex items-center justify-center">
                  <p>Buy Now</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
