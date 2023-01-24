import { createContext, useState } from "react";
import { CartContextType, CartProps, product } from "types";

export const cartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [cart, setCart] = useState<CartProps[]>([]);

  const addToCart = (product: product, size: string) => {
    const newCart: CartProps = {
      imageUrl: product.productImagesCollection.items[0].url,
      title: product.title,
      price: product.price,
      size: size,
      count: 1,
    };
    setCart([...cart, newCart]);
  };
  return (
    <cartContext.Provider value={{ cart, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}
