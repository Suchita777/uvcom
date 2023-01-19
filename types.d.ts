export type product = {
  title: string;
  slug: string;
  featured: boolean;
  newArrivals: boolean;
  bestSeller: boolean;
  price: number;
  sizes: string[];
  description: {
    json: any;
  };
  productImagesCollection: {
    items: [
      {
        url: string;
        description: {
          json: any;
        };
      }
    ];
  };
};

export type HomePageProps = {
  products: product[];
  featuredProducts: product[];
  newArrivalsProducts: product[];
  bestSellerProducts: product[];
};

export type ProductPageProps = {
  product: product;
};

export type CardProps = {
  link: string;
  imageUrl: string;
  title: string;
  price: number;
};
