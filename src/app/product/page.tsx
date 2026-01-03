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
      <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
        Product not found.
      </div>
    );
  }

  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-red-500/5 via-transparent to-orange-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 2xl:w-lg 2xl:h-[512px] bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 2xl:w-lg 2xl:h-[512px] bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1800px] px-4 sm:px-6 md:px-8 2xl:px-12 py-8 sm:py-12 md:py-16 2xl:py-20 space-y-12 sm:space-y-16 md:space-y-20 2xl:space-y-28">
        {/* HERO SECTION */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 2xl:gap-16">
          <ProductImage image={product.image} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* RELATED PRODUCTS */}
        <RelatedProducts
          products={products}
          currentProductId={product.id}
        />
      </div>
    </section>
  );
}