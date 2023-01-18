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
      size
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
        <div className="p-4 w-[40%] h-[36rem] flex justify-center items-center">
          <img
            src={product.productImagesCollection.items[0].url}
            className="w-[80%] h-[32rem] "
          ></img>
        </div>
        <div className="p-7 pl-0 w-[60%]">
          <h1 className="text-5xl font-semibold mb-3">{product.title}</h1>
          <p className="text-2xl mb-5">{product.price} INR /- </p>
          <p className="mb-4">Available Sizes : S, M, XL, XXL</p>
          <p className="document mb-8 text-gray-700 tracking-widest ">
            {documentToReactComponents(product.description.json)}
          </p>
          <div className="flex">
            <div className="mr-6 border border-black font-semibold w-[10rem] h-[3.5rem] flex items-center justify-center">
              <Link href={"#"}>
                <p>Add to Cart</p>
              </Link>
            </div>
            <div className="border border-black font-semibold w-[10rem] h-[3.5rem] flex items-center justify-center">
              <Link href={"#"}>
                <p>Buy Now</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
