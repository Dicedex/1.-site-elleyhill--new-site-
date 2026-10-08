import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import type { Metadata } from "next";
import ProductPurchaseActions from "@/components/ProductPurchaseActions";
import ProductImageGallery from "@/components/ProductImageGallery";
import { SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

function resolveProductAndVariant(slug: string): { product?: Product; initialVariantId?: string } {
  let product = PRODUCTS.find((p) => p.slug === slug);
  let initialVariantId: string | undefined = undefined;

  if (!product) {
    if (slug === "545w-solar-panels" || slug === "605w-solar-panels") {
      product = PRODUCTS.find((p) => p.slug === "605w-ja-solar-bifacial-panels");
    } else if (slug === "5kw-standard-home-comfort-kit" || slug === "6kw-standard-home-comfort-kit") {
      product =
        PRODUCTS.find((p) => p.slug === "6kw-standard-home-comfort-kit") ||
        PRODUCTS.find((p) => p.slug === "5kw-standard-home-comfort-kit");
    } else if (slug === "pv-combiner-box-5kw" || slug === "pv-combiner-box") {
      product = PRODUCTS.find((p) => p.slug === "dc-combiner-box");
      initialVariantId = "5kw";
    } else if (slug === "pv-combiner-box-6kw") {
      product = PRODUCTS.find((p) => p.slug === "dc-combiner-box");
      initialVariantId = "6kw";
    } else if (slug === "pv-combiner-box-8kw") {
      product = PRODUCTS.find((p) => p.slug === "dc-combiner-box");
      initialVariantId = "8kw";
    } else if (slug === "db-combiner-box-5kw" || slug === "db-combiner-box") {
      product = PRODUCTS.find((p) => p.slug === "ac-combiner-box");
      initialVariantId = "5kw";
    } else if (slug === "db-combiner-box-6kw") {
      product = PRODUCTS.find((p) => p.slug === "ac-combiner-box");
      initialVariantId = "6kw";
    } else if (slug === "db-combiner-box-8kw") {
      product = PRODUCTS.find((p) => p.slug === "ac-combiner-box");
      initialVariantId = "8kw";
    }
  }

  return { product, initialVariantId };
}

export async function generateStaticParams() {
  const params = PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
  params.push({ slug: "545w-solar-panels" });
  params.push({ slug: "5kw-standard-home-comfort-kit" });
  params.push({ slug: "pv-combiner-box-5kw" });
  params.push({ slug: "pv-combiner-box-6kw" });
  params.push({ slug: "pv-combiner-box-8kw" });
  params.push({ slug: "db-combiner-box-5kw" });
  params.push({ slug: "db-combiner-box-6kw" });
  params.push({ slug: "db-combiner-box-8kw" });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { product } = resolveProductAndVariant(slug);

  if (!product) {
    return {
      title: "Product Not Found | Elleyhill Power Zambia",
    };
  }

  const cleanPrice = product.price.replace(/[^0-9.]/g, "");
  const pageTitle = `${product.name} | Best Price in Lusaka, Zambia`;
  const pageDescription = `Buy genuine ${product.name} (${product.category}) in Lusaka, Zambia at ${product.price}. Official warranty, fast local delivery across Lusaka & nationwide. ${product.description}`;
  const canonicalUrl = `${SITE_URL}/products/${product.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      product.name,
      `${product.name} Zambia`,
      `${product.name} Lusaka`,
      `${product.category} Lusaka Zambia`,
      "Solar price Zambia",
      "Elleyhill Power Zambia",
      "Load shedding backup Lusaka",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: product.image.startsWith("http")
            ? product.image
            : `${SITE_URL}${product.image}`,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [
        product.image.startsWith("http")
          ? product.image
          : `${SITE_URL}${product.image}`,
      ],
    },
    other: {
      "product:price:amount": cleanPrice,
      "product:price:currency": "ZMW",
      "product:availability": product.inStock !== false ? "in stock" : "out of stock",
    },
  };
}

export default async function DynamicProductPage({ params }: Props) {
  const { slug } = await params;
  const { product, initialVariantId } = resolveProductAndVariant(slug);

  if (!product) {
    notFound();
  }

  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
  const brandName = product.name.includes("JA Solar")
    ? "JA Solar"
    : product.name.includes("Greenrich")
    ? "Greenrich"
    : product.name.includes("Growatt")
    ? "Growatt"
    : product.name.includes("Haitai")
    ? "Haitai"
    : product.name.includes("Deye")
    ? "Deye"
    : "Elleyhill Power";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`,
    description: product.longDescription || product.description,
    sku: product.slug,
    mpn: product.slug,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "ZMW",
      price: numericPrice,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Elleyhill Power Zambia",
      },
      areaServed: {
        "@type": "Place",
        name: "Lusaka, Zambia",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${SITE_URL}/shop?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${SITE_URL}/products/${product.slug}`,
      },
    ],
  };


  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-lg antialiased pb-24 md:pb-16 min-h-screen flex flex-col">
      {/* Product JSON-LD Structured Data for Google Rich Snippets & Bing Shopping */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="mt-header-height-mobile md:mt-header-height-desktop max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex-grow w-full">
        {/* Breadcrumbs */}
        <div className="mb-stack-lg flex items-center gap-2 text-body-sm text-on-surface-variant flex-wrap">
          <Link className="hover:text-primary hover:underline" href="/shop">
            Shop
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary hover:underline" href={`/shop?category=${product.category}`}>
            {product.category}
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-16 items-start">
          {/* Left: Product Image Gallery with Fullscreen Lightbox */}
          <ProductImageGallery
            images={[product.image]}
            productName={product.name}
            category={product.category}
            inStock={product.inStock ?? true}
          />

          {/* Right: Info & Pricing */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block bg-primary-green/10 text-primary font-label-cta text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {product.category} &bull; In Stock Lusaka
              </span>
              <h1 className="font-display-hero text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
                {product.name}
              </h1>
              <p className="font-body-lg text-neutral-grey-dark leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Price Card */}
            <div className="p-6 bg-surface-container-low border border-border-light rounded-2xl flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-technical-data">
                Retail Cash Price (Inclusive of VAT)
              </span>
              <span className="font-display-hero text-display-hero-mobile md:text-headline-lg text-primary font-bold">
                {product.price}
              </span>
              <span className="text-xs text-status-success font-medium flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                100% Genuine Tier-1 Hardware with Manufacturer Warranty
              </span>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-headline-md text-primary mb-3">Key Features &amp; Specifications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-sm text-neutral-grey-dark">
                    <span className="material-symbols-outlined text-primary-green text-lg shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's In The Box */}
            {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
              <div className="p-4 bg-surface-container-lowest border border-border-light rounded-xl">
                <h4 className="font-label-cta text-sm text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">inventory_2</span>
                  What&apos;s Included:
                </h4>
                <ul className="text-body-sm text-on-surface-variant list-disc list-inside space-y-1">
                  {product.whatsInTheBox.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warranty Info */}
            {product.warranty && (
              <div className="flex items-center gap-3 p-3 bg-surface-bright border border-border-light rounded-xl text-body-sm text-on-surface">
                <span className="material-symbols-outlined text-primary-green text-xl">
                  shield_with_heart
                </span>
                <div>
                  <span className="font-bold">Official Warranty:</span> {product.warranty}
                </div>
              </div>
            )}

            {/* Actions (with Variant / Size Toggle) */}
            <ProductPurchaseActions product={product} initialVariantId={initialVariantId} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border-light">
            <h2 className="font-display-hero text-headline-md text-primary mb-6">
              Related {product.category} Equipment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/products/${rel.slug}`}
                  className="bg-surface-container-lowest border border-border-light rounded-xl p-4 flex flex-col hover-lift group"
                >
                  <div className="aspect-square bg-surface-bright rounded-lg p-4 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant font-technical-data uppercase mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-display-hero text-base text-primary font-bold group-hover:text-secondary transition-colors line-clamp-1 mb-2">
                    {rel.name}
                  </h4>
                  <div className="mt-auto pt-2 flex justify-between items-center">
                    <span className="font-display-hero text-base font-bold text-primary">
                      {rel.price}
                    </span>
                    <span className="text-xs text-primary font-label-cta underline group-hover:text-secondary">
                      View &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
