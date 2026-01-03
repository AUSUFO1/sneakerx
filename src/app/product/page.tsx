import ProductImage from "@/component/product/ProductImage";
import ProductInfo from "@/component/product/ProductInfo";
import RelatedProducts from "@/component/product/RelatedProducts";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/data/sneakers.json`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
}

export default async function ProductPage() {
  const products = await getProducts();
  const product = products[0];

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 space-y-16">
      {/* HERO */}
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImage image={product.image} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* RELATED */}
      <RelatedProducts
        products={products}
        currentProductId={product.id}
      />
    </section>
  );
}
