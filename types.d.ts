export type product = {
  title: string;
  slug: string;
  price: number;
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
};
