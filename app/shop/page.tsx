"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ShopSolarPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const categories = [
    { label: "All Items", key: "All", count: PRODUCTS.length },
    { label: "Complete Kits", key: "Complete Kits", count: PRODUCTS.filter((p) => p.category === "Complete Kits").length },
    { label: "Batteries", key: "Batteries", count: PRODUCTS.filter((p) => p.category === "Batteries").length },
    { label: "Inverters", key: "Inverters", count: PRODUCTS.filter((p) => p.category === "Inverters").length },
    { label: "Solar Panels", key: "Panels", count: PRODUCTS.filter((p) => p.category === "Panels").length },
    { label: "Accessories", key: "Accessories", count: PRODUCTS.filter((p) => p.category === "Accessories").length },
    { label: "Portable", key: "Portable", count: PRODUCTS.filter((p) => p.category === "Portable").length },
  ];

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const price = parsePrice(product.price);
    const isKit = product.category === "Complete Kits";

    addItem({
      id: product.slug,
      name: product.name,
      price: price,
      image: product.image,
      tag: product.category.toUpperCase(),
      stockStatus: "In Stock (Lusaka Warehouse)",
      description: product.description,
      slug: product.slug,
      installationPrice: isKit ? 4500 : undefined,
      installationIncluded: isKit,
      installationOption: isKit ? "professional" : "kit-only",
      qty: 1,
    });

    setAddedSlug(product.slug);
    setTimeout(() => {
      setAddedSlug((prev) => (prev === product.slug ? null : prev));
    }, 1800);
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === "All" ||
        p.category === selectedCategory ||
        (selectedCategory === "Panels" && p.category === "Panels");

      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStock = !inStockOnly || p.inStock !== false;

      return matchesCat && matchesSearch && matchesStock;
    });

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="bg-background text-on-background antialiased selection:bg-secondary selection:text-white flex flex-col min-h-screen">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-[80px] md:pt-[100px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-stack-lg">
        {/* Header & Filters Section */}
        <section className="mb-stack-lg flex flex-col gap-stack-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary">
                Solar Equipment &amp; Energy Systems
              </h1>
              <p className="text-on-surface-variant font-body-sm mt-1">
                Direct tier-1 solar kits, lithium batteries, hybrid inverters, and high-efficiency panels stocked in Lusaka.
              </p>
            </div>
            {/* Quick Search */}
            <div className="relative max-w-md w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, models, specs..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-border-light rounded-full text-body-sm focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base hover:text-primary cursor-pointer"
                >
                  close
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Pill Tabs */}
          <div className="flex overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 gap-3 no-scrollbar shrink-0 w-full">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    setVisibleCount(12);
                  }}
                  className={`whitespace-nowrap px-5 py-2 rounded-full font-label-cta text-label-cta transition-colors border cursor-pointer ${
                    active
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-surface-container-lowest text-on-surface hover:border-secondary border-border-light"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Utility Row */}
          <div className="flex flex-wrap justify-between items-center gap-4 py-4 border-t border-border-light mt-2">
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Showing {filteredProducts.length} results</span>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant font-body-sm">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-border-medium text-primary focus:ring-secondary w-4 h-4 cursor-pointer"
                />
                In-Stock Items Only
              </label>

              <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-primary font-medium py-1 pr-6 pl-1 focus:ring-0 cursor-pointer text-body-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-low rounded-xl">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
              search_off
            </span>
            <p className="text-primary font-medium text-lg">No products match your criteria</p>
            <p className="text-on-surface-variant text-body-sm mt-1">Try resetting your filters or search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setInStockOnly(false);
              }}
              className="mt-4 bg-accent-yellow text-primary px-6 py-2 rounded-full font-label-cta text-label-cta cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.slice(0, visibleCount).map((product) => {
              const detailUrl =
                product.slug === "6kw-standard-home-comfort-kit" ||
                product.slug === "5kw-standard-home-comfort-kit"
                  ? "/products/5kw-standard-home-comfort-kit"
                  : `/products/${product.slug}`;

              const isJustAdded = addedSlug === product.slug;

              return (
                <article
                  key={product.slug}
                  className="product-card bg-surface-container-lowest border border-border-light rounded-xl p-4 flex flex-col h-full relative hover-lift group"
                >
                  {/* Top Badges */}
                  <div className="flex justify-between items-start mb-4 z-10 relative">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success/10 text-status-success font-technical-data text-[11px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                      In Stock
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-technical-data">
                      {product.category}
                    </span>
                  </div>

                  {/* Image */}
                  <Link
                    href={detailUrl}
                    className="aspect-square w-full mb-6 relative bg-surface-bright rounded-lg overflow-hidden flex items-center justify-center p-6 cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-display-hero text-headline-md text-primary mb-2 line-clamp-2">
                      <Link href={detailUrl} className="hover:text-secondary transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="font-body-sm text-body-sm text-neutral-grey-dark mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>

                    {/* Micro-specs / features pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="bg-surface-container-low px-2 py-1 rounded text-[11px] font-technical-data text-on-surface-variant truncate max-w-full"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & Quick Add CTA */}
                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-border-light gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block font-technical-data">
                          Retail Price
                        </span>
                        <span className="font-display-hero text-headline-md text-primary font-bold">
                          {product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={detailUrl}
                          className="px-3 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-technical-data text-xs font-semibold transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`h-10 px-4 rounded-full font-label-cta text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                            isJustAdded
                              ? "bg-status-success text-white scale-105"
                              : "bg-accent-yellow hover:bg-accent-yellow/90 text-primary hover:scale-105 active:scale-95"
                          }`}
                          aria-label={`Add ${product.name} to cart`}
                          title="Add to cart"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isJustAdded ? "check" : "add_shopping_cart"}
                          </span>
                          <span>{isJustAdded ? "Added" : "Add"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Pagination / Load More */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-stack-lg flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="bg-surface-container-lowest text-primary border border-primary font-label-cta text-label-cta px-8 py-3 rounded-full hover:bg-surface-bright transition-colors cursor-pointer"
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
