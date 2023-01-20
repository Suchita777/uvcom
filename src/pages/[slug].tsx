import Layout from "components/layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ProductPageProps } from "types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function getServerSideProps(context: any) {
  const query = `query getProduct($slug:String!) {
  productCollection(where:{slug:$slug}){
    items{
      title
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

  console.log(response.data.productCollection.items[0].productImagesCollection);

  return {
    props: {
      product: response.data.productCollection.items[0],
    },
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <Layout>
      <div className="flex w-full h-max pt-24 p-10 pb-5 justify-center">
        <div className="flex justify-center w-[85%]">
          <div className="p-4 w-[40%] h-[36rem] flex justify-center items-center">
            <img
              src={product.productImagesCollection.items[0].url}
              className="w-[85%] h-[32rem] "
            ></img>
          </div>
          <div className="p-7 pl-9 w-[60%]">
            <h1 className="text-5xl font-semibold mb-3">{product.title}</h1>
            <p className="text-2xl mb-5">{product.price} INR /- </p>
            <p className="mb-5">
              <p className="font-bold ">Available Sizes :</p>
              <p className="flex mt-2">
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className="w-12 mr-2 p-1 border border-slate-600 rounded text-center"
                  >
                    <p>{size}</p>
                  </div>
                ))}
              </p>
            </p>
            <p className="document mb-8 text-gray-700 tracking-widest ">
              <p className="font-bold text-black mb-2 mt-7 tracking-normal">
                Description :{" "}
              </p>
              {documentToReactComponents(product.description.json)}
            </p>
            <div className="flex">
              <button className="mr-6 border border-black font-semibold w-[10rem] h-[3.5rem] flex items-center justify-center">
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
              <Link href={"#"}>
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
