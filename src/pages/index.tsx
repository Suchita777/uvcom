import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
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
        {products.map((product: product) => (
          <div key={product.slug}>
            <h1>{product.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
