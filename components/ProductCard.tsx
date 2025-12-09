import { formatPrice } from "@/lib/utils";
import { ProductTypes } from "@/types/RootTypes";

const ProductCard = function productCard({
  product,
}: {
  product: ProductTypes;
}) {
  return (
    <div
      className={`cursor-pointer rounded-2xl overflow-hidden border border-gray-400`}
      tabIndex={0}
    >
      <div className="h-[200px] md:h-[350px]">
        {product.image ? (
          <img
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.title}
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200" />
        )}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="text-xs sm:text-md md:text-xl font-bold">
          {product.title}
        </h3>
        <p className="text-xs sm:text-md text-gray-600">{product.category}</p>
        <p className="text-gray-500 font-normal text-sm md:text-base leading-relaxed">
          {formatPrice(product.price)} Сум
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
