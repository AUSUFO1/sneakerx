import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: {
  products: Product[];
  currentProductId: string;
}) {
  const related = products.filter(
    (product) => product.id !== currentProductId
  );

  if (!related.length) return null;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold lg:text-2xl">
          More Jordan Releases
        </h2>
        <span className="text-sm text-muted-foreground">
          Explore similar styles
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
