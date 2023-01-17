import Layout from "components/layout";
import { HomePageProps, product } from "types";

// const elMessiri = El_Messiri({ weight: "700", subsets: ["latin"] });

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

export default function Collection({ products }: HomePageProps) {
  return (
    <Layout>
      <div>
        <div className="pt-28 flex justify-center">
          <div className="flex justify-between items-center border border-black rounded w-[24rem]">
            <input
              placeholder="Help us find you something!"
              className=" p-2 pl-3 w-[22rem] rounded focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 ml-2 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap justify-center overflow-y-hidden p-6">
          {products.map((product: product) => (
            <div
              key={product.slug}
              className="m-4 w-[16rem] h-[22rem] shrink-0 border"
            >
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img
                    src={product.productImagesCollection.items[0].url}
                    className="w-[12rem] h-[16rem] p-3 pt-0"
                  />
                </div>
                <h1 className="p-4 pt-1 pb-1 text-sm font-semibold mr-auto">
                  {product.title}
                </h1>
                <h2 className="p-4 pt-1 text-sm mr-auto">
                  {product.price} INR
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
