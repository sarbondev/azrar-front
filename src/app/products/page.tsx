import React from "react";
import ProductFilter from "@/entities/product/ui/ProductFilter";
import ProductsList from "@/entities/product/ui/ProductList";

export default function ProductsPage() {
  return (
    <>
      <ProductFilter />
      <ProductsList />
    </>
  );
}
