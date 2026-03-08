import { formatPrice } from "@/lib/utils";
import { ProductTypes } from "@/types/OldTypes";
import { useTranslation } from "react-i18next";

function ProductCard({ product }: { product: ProductTypes }) {
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language as "uz" | "ru";
  const title =
    product.translations?.[currentLang]?.title ||
    product.translations?.uz?.title ||
    "No title";
  const categoryName =
    product.category?.[currentLang === "ru" ? "name_ru" : "name_uz"] ||
    "Kategoriya";

  return (
    <div className={`cursor-pointer rounded-2xl overflow-hidden`} tabIndex={0}>
      <div className="h-[200px] md:h-[350px]">
        {product.images?.[0] ? (
          <img
            className="w-full h-full object-cover"
            src={product.images[0]}
            alt={title}
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200" />
        )}
      </div>
      <div className="space-y-1 py-2">
        <h3 className="text-xs sm:text-md md:text-xl font-bold">{title}</h3>
        <p className="text-xs sm:text-md text-gray-600">{categoryName}</p>
        <p className="text-gray-500 font-normal text-sm md:text-base leading-relaxed">
          {formatPrice(product.price)} {t("currency")}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
