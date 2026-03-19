import React, { Suspense } from "react";
import ProductFilter from "@/entities/product/ui/ProductFilter";
import ProductsList from "@/entities/product/ui/ProductList";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-8 h-8 border-4 border-[#173F5F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductFilter />
      <ProductsList />
    </Suspense>
  );
}
