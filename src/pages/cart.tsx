import { cartContext } from "components/cartProvider";
import Layout from "components/layout";
import { useContext } from "react";
import { CartContextType } from "types";

export default function TempPage() {
  const { cart } = useContext(cartContext) as CartContextType;

  console.log(cart);
  return (
    <Layout>
      <p className=" pt-[7rem] pl-[3rem] lg:pl-[4rem] lg:text-lg font-semibold">
        Items in your Cart :
      </p>
      <div className="w-full min-h-[30rem] flex flex-wrap justify-center p-9 pt-5">
        {cart.map((product) => (
          <div
            key={product.title}
            className="w-[25rem] h-[10rem] lg:h-[14rem] m-3 flex border border-slate-700 mt-3 p-3 rounded"
          >
            <img
              src={product.imageUrl}
              className="lg:w-[35%] w-[30%] shrink-0"
            />
            <div className="ml-7">
              <h1 className="text-md lg:text-xl font-bold">{product.title}</h1>
              <p className="mt-2 lg:mt-3 italic text-sm lg:text-lg">
                Size : {product.size}
              </p>
              <p className="mt-2 lg:mt-3 text-sm lg:text-lg font-semibold">
                {product.price} /- INR
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
